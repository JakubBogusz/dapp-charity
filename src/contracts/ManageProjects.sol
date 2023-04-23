// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./DataTypes.sol";
import "./ProjectUtils.sol";

contract ManageProjects is ProjectUtils {
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

        DataTypes.Project memory project;
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
            projects[id].status == DataTypes.Status.OPEN,
            "Project no longer opened!"
        );
        require(msg.sender == projects[id].owner, "Unauthorized Entity");
        require(projectExist[id], "Project not found");

        projects[id].status = DataTypes.Status.DELETED;
        performRefund(id);

        emit Action(id, "PROJECT_DELETED", msg.sender, block.timestamp);

        return true;
    }

    function getProject(
        uint id
    ) public view returns (DataTypes.Project memory) {
        require(projectExist[id], "Project not found");

        return projects[id];
    }

    function getProjectsOf(
        address projectOwner
    ) public view returns (DataTypes.Project[] memory) {
        return projectsOf[projectOwner];
    }

    function getProjects() public view returns (DataTypes.Project[] memory) {
        return projects;
    }

    function getProjectStatus(uint id) public view returns (uint) {
        require(projectExist[id], "Project not found");

        return uint(projects[id].status);
    }

    function changeTax(uint _taxPercentage) public onlyOwner {
        require(_taxPercentage <= 100, "Invalid tax value");
        projectTax = _taxPercentage;
    }

    function withdrawFunds(uint amount) public onlyOwner {
        require(amount <= balance, "Insufficient balance");

        balance -= amount;
        payTo(owner, amount);
    }
}
