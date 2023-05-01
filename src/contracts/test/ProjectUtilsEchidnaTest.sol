// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// import "../ProjectUtils.sol";

contract DataTypes {
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
        uint amountRaised;
        uint timestamp;
        uint expiresAt;
        uint supporters;
        Status status;
    }
}

contract CharityStorage {
    address public owner;
    uint public projectTax;
    uint public projectCount;
    uint public balance;
    DataTypes.Stats public stats;
    DataTypes.Project[] public projects;

    mapping(address => uint256) public withdrawals;
    mapping(address => DataTypes.Project[]) internal projectsOf;
    mapping(uint => DataTypes.Supporter[]) internal supportersOf;
    mapping(uint => bool) public projectExist;

    modifier onlyOwner() {
        require(msg.sender == owner, "Operation allowed only for the owner");
        _;
    }

    event Action(
        uint256 id,
        string actionType,
        address indexed executor,
        uint256 timestamp
    );
}

contract ProjectUtils is CharityStorage {
    function performRefund(uint id) internal {
        for (uint i = 0; i < supportersOf[id].length; i++) {
            if (!supportersOf[id][i].refunded) {
                address _owner = supportersOf[id][i].owner;
                uint _contribution = supportersOf[id][i].contribution;

                // Instead of sending funds directly, increase the recipient's balance
                withdrawals[_owner] += _contribution;

                supportersOf[id][i].refunded = true;
                supportersOf[id][i].timestamp = block.timestamp;
                stats.totalSupporters -= 1;
                stats.totalDonations -= _contribution;
            }
        }
    }

    function withdrawFunds() external {
        uint256 amount = withdrawals[msg.sender];
        require(amount > 0, "No funds available to withdraw");

        // Reset the balance before sending funds to avoid a reentrancy
        withdrawals[msg.sender] = 0;

        // We send the funds to the recipient
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Withdrawal failed");
    }

    function isProjectFunded(
        DataTypes.Project memory project
    ) internal pure returns (bool) {
        return project.amountRaised >= project.cost;
    }

    function isProjectExpired(
        DataTypes.Project memory project
    ) internal view returns (bool) {
        return block.timestamp >= project.expiresAt;
    }

    function performPayout(uint id) internal returns (bool) {
        uint amountRaised = projects[id].amountRaised;
        uint tax = (amountRaised * projectTax) / 100;

        projects[id].status = DataTypes.Status.PAIDOUT;

        // Pay raised funds minus tax to project owner
        if (!payTo(projects[id].owner, (amountRaised - tax))) {
            return false;
        }

        // Pay the tax to platform owner
        if (!payTo(owner, tax)) {
            return false;
        }

        balance -= projects[id].amountRaised;

        emit Action(id, "PROJECT_PAID_OUT", msg.sender, block.timestamp);

        return true;
    }

    function payTo(address to, uint256 amount) internal returns (bool) {
        (bool success, ) = payable(to).call{value: amount}("");
        return success;
    }
}

contract ProjectUtilsEchidnaTest is ProjectUtils {
    constructor() {
        owner = msg.sender;
        projectTax = 5;
    }

    function initialize() public {
        require(owner == msg.sender, "Only the owner can initialize");

        // Initialize a project
        projects.push(
            DataTypes.Project({
                id: 0,
                owner: address(this),
                title: "Test Project",
                description: "This is a test project",
                imageURL: "https://example.com/image.png",
                cost: 10 ether,
                amountRaised: 10 ether,
                timestamp: block.timestamp,
                expiresAt: block.timestamp + 30 days,
                supporters: 1,
                status: DataTypes.Status.OPEN
            })
        );

        // Set the balance
        balance = 10 ether;
    }

    function echidna_test_performPayout() public {
        // Initialize the contract if it hasn't been initialized yet
        if (projects.length == 0) {
            initialize();
        }

        uint256 initialBalance = balance;
        uint256 amountRaised = projects[0].amountRaised;
        uint256 tax = (amountRaised * projectTax) / 100;

        performPayout(0);
        uint256 finalBalance = balance;

        assert(finalBalance <= (initialBalance - amountRaised));
    }
}
