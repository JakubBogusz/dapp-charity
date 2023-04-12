// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract DCharity {
    address public owner;
    uint public projectTax;
    uint public projectCount;
    uint public balance;
    Stats public stats;
    Project[] public projects;

    mapping(address => Project[]) private projectsOf;
    mapping(uint => Supporter[]) private supportersOf;
    mapping(uint => bool) public projectExist;

    enum Status {
        OPEN,
        APPROVED,
        REVERTED,
        DELETED,
        PAIDOUT
    }

    struct Stats {
        uint totalProjects;
        uint totalSupporters;
        uint totalDonations;
    }

    struct Supporter {
        address owner;
        uint contribution;
        uint timestamp;
        bool refunded;
    }

    struct Project {
        uint id;
        address owner;
        string title;
        string description;
        string imageURL;
        uint cost;
        uint raised;
        uint timestamp;
        uint expiresAt;
        uint supporters;
        Status status;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Owner reserved only");
        _;
    }

    event Action(
        uint256 id,
        string actionType,
        address indexed executor,
        uint256 timestamp
    );

    constructor(uint _projectTax) {
        owner = msg.sender;
        projectTax = _projectTax;
    }

    function createProject(
        string memory title,
        string memory description,
        string memory imageURL,
        uint cost,
        uint expiresAt
    ) public returns (bool) {
        require(bytes(title).length > 0, "Title cannot be empty!");
        require(bytes(description).length > 0, "Description cannot be empty!");
        require(bytes(imageURL).length > 0, "ImageURL cannot be empty!");
        require(cost > 0 ether, "Cost cannot be zero!");

        Project memory project;
        project.id = projectCount;
        project.owner = msg.sender;
        project.title = title;
        project.description = description;
        project.imageURL = imageURL;
        project.cost = cost;
        project.timestamp = block.timestamp;
        project.expiresAt = expiresAt;

        projects.push(project);
        projectExist[projectCount] = true;
        projectsOf[msg.sender].push(project);
        stats.totalProjects += 1;

        emit Action(
            projectCount++,
            "PROJECT_CREATED",
            msg.sender,
            block.timestamp
        );

        return true;
    }

    function updateProject(
        uint id,
        string memory title,
        string memory description,
        string memory imageURL,
        uint expiresAt
    ) public returns (bool) {
        require(projectExist[id], "Project not found");
        require(msg.sender == projects[id].owner, "Unauthorized Entity");
        require(bytes(title).length > 0, "Title cannot be empty!");
        require(bytes(description).length > 0, "Description cannot be empty!");
        require(bytes(imageURL).length > 0, "ImageURL cannot be empty!");

        projects[id].title = title;
        projects[id].description = description;
        projects[id].imageURL = imageURL;
        projects[id].expiresAt = expiresAt;

        emit Action(id, "PROJECT_UPDATED", msg.sender, block.timestamp);

        return true;
    }

    function deleteProject(uint id) public returns (bool) {
        require(
            projects[id].status == Status.OPEN,
            "Project no longer opened!"
        );
        require(msg.sender == projects[id].owner, "Unauthorized Entity");
        require(projectExist[id], "Project not found");

        projects[id].status = Status.DELETED;
        performRefund(id);

        emit Action(id, "PROJECT_DELETED", msg.sender, block.timestamp);

        return true;
    }

    function performRefund(uint id) internal {
        for (uint i = 0; i < supportersOf[id].length; i++) {
            address _owner = supportersOf[id][i].owner;
            uint _contribution = supportersOf[id][i].contribution;

            supportersOf[id][i].refunded = true;
            supportersOf[id][i].timestamp = block.timestamp;
            payTo(_owner, _contribution);

            stats.totalSupporters -= 1;
            stats.totalDonations -= _contribution;
        }
    }

    function supportProject(uint id) public payable returns (bool) {
        require(msg.value > 0 ether, "Ether amount must be greater than zero");
        require(projectExist[id], "Project not found");
        require(projects[id].status == Status.OPEN, "Project no longer opened");

        stats.totalSupporters += 1;
        stats.totalDonations += msg.value;
        projects[id].raised += msg.value;
        projects[id].supporters += 1;

        supportersOf[id].push(
            Supporter(msg.sender, msg.value, block.timestamp, false)
        );

        emit Action(id, "PROJECT_BACKED", msg.sender, block.timestamp);

        if (projects[id].raised >= projects[id].cost) {
            projects[id].status = Status.APPROVED;
            balance += projects[id].raised;
            performPayout(id);
            return true;
        }

        if (block.timestamp >= projects[id].expiresAt) {
            projects[id].status = Status.REVERTED;
            performRefund(id);
            return true;
        }

        return true;
    }

    function performPayout(uint id) internal {
        uint raised = projects[id].raised;
        uint tax = (raised * projectTax) / 100;

        projects[id].status = Status.PAIDOUT;

        // Pay raised funds minus tax to project owner
        payTo(projects[id].owner, (raised - tax));

        // Pay the tax to platform owner
        payTo(owner, tax);

        balance -= projects[id].raised;

        emit Action(id, "PROJECT_PAID_OUT", msg.sender, block.timestamp);
    }

    function requestRefund(uint id) public returns (bool) {
        require(projectExist[id], "Project not found");
        require(
            projects[id].status != Status.REVERTED ||
                projects[id].status != Status.DELETED,
            "Project not marked as reverted or deleted"
        );

        projects[id].status = Status.REVERTED;
        performRefund(id);

        return true;
    }

    function payOutProject(uint id) public returns (bool) {
        require(projectExist[id], "Project not found");
        require(
            projects[id].status == Status.APPROVED,
            "Project not Approved!"
        );
        require(
            msg.sender == projects[id].owner || msg.sender == owner,
            "Unauthorized Entity"
        );

        performPayout(id);
        return true;
    }

    function changeTax(uint _taxPercentage) public onlyOwner {
        projectTax = _taxPercentage;
    }

    function getProject(uint id) public view returns (Project memory) {
        require(projectExist[id], "Project not found");

        return projects[id];
    }

    function getProjectsOf(
        address projectOwner
    ) public view returns (Project[] memory) {
        return projectsOf[projectOwner];
    }

    function getSupporters(uint id) public view returns (Supporter[] memory) {
        return supportersOf[id];
    }

    function payTo(address to, uint256 amount) internal {
        (bool success, ) = payable(to).call{value: amount}("");
        require(success);
    }

    function getProjects() public view returns (Project[] memory) {
        return projects;
    }

    function getAllSupporters() public view returns (Supporter[] memory) {
        uint totalSupporters = stats.totalSupporters;
        Supporter[] memory allSupporters = new Supporter[](totalSupporters);
        uint counter = 0;

        for (uint i = 0; i < projects.length; i++) {
            Supporter[] memory projectSupporters = supportersOf[projects[i].id];

            for (uint j = 0; j < projectSupporters.length; j++) {
                allSupporters[counter] = projectSupporters[j];
                counter++;
            }
        }

        return allSupporters;
    }

    function getProjectSupporters(
        uint id
    ) public view returns (Supporter[] memory) {
        require(projectExist[id], "Project not found");
        return supportersOf[id];
    }

    function getOwnerProjects() public view returns (Project[] memory) {
        return getProjectsOf(msg.sender);
    }

    function getOwnerProjectsCount() public view returns (uint) {
        return projectsOf[msg.sender].length;
    }

    function getTotalProjectCount() public view returns (uint) {
        return projects.length;
    }

    function getTotalSupportersCount() public view returns (uint) {
        return stats.totalSupporters;
    }

    function getTotalDonationsCount() public view returns (uint) {
        return stats.totalDonations;
    }

    function withdrawFunds(uint amount) public onlyOwner {
        require(amount <= balance, "Insufficient balance");

        balance -= amount;
        payTo(owner, amount);
    }
}
