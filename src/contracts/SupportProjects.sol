// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./ProjectUtils.sol";

contract SupportProjects is ProjectUtils {
    function supportProject(uint id) public payable returns (bool) {
        require(msg.value > 0 ether, "Ether amount must be greater than zero");
        require(projectExist[id], "Project not found");
        require(projects[id].status == DataTypes.Status.OPEN, "Project no longer opened");

        stats.totalSupporters += 1;
        stats.totalDonations += msg.value;
        projects[id].raised += msg.value;
        projects[id].supporters += 1;

        supportersOf[id].push(
            DataTypes.Supporter(msg.sender, msg.value, block.timestamp, false)
        );

        emit Action(id, "PROJECT_BACKED", msg.sender, block.timestamp);

        if (isProjectFunded(projects[id])) {
            projects[id].status = DataTypes.Status.APPROVED;
            balance += projects[id].raised;
            performPayout(id);
        } else if (isProjectExpired(projects[id])) {
            projects[id].status = DataTypes.Status.REVERTED;
            performRefund(id);
        }

        return true;
    }

    function requestRefund(uint id) public returns (bool) {
        require(projectExist[id], "Project not found");
        require(
            projects[id].status != DataTypes.Status.REVERTED ||
                projects[id].status != DataTypes.Status.DELETED,
            "Project not marked as reverted or deleted"
        );

        projects[id].status = DataTypes.Status.REVERTED;
        performRefund(id);

        return true;
    }

    function payOutProject(uint id) public returns (bool) {
        require(projectExist[id], "Project not found");
        require(
            projects[id].status == DataTypes.Status.APPROVED,
            "Project not Approved!"
        );
        require(
            msg.sender == projects[id].owner || msg.sender == owner,
            "Unauthorized Entity"
        );

        performPayout(id);
        return true;
    }

    function getSupporters(uint id) public view returns (DataTypes.Supporter[] memory) {
        require(projectExist[id], "Project not found");
        return supportersOf[id];
    }

    function getAllSupporters() public view returns (DataTypes.Supporter[] memory) {
        uint totalSupporters = stats.totalSupporters;
        DataTypes.Supporter[] memory allSupporters = new DataTypes.Supporter[](totalSupporters);
        uint counter = 0;

        for (uint i = 0; i < projects.length; i++) {
            DataTypes.Supporter[] memory projectSupporters = supportersOf[projects[i].id];

            for (uint j = 0; j < projectSupporters.length; j++) {
                allSupporters[counter] = projectSupporters[j];
                counter++;
            }
        }

        return allSupporters;
    }

    function getTotalSupportersCount() public view returns (uint) {
        return stats.totalSupporters;
    }

    function getTotalDonationsCount() public view returns (uint) {
        return stats.totalDonations;
    }
}
