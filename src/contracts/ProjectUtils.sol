// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./DataTypes.sol";
import "./CharityStorage.sol";

contract ProjectUtils is CharityStorage {
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

    function isProjectFunded(
        DataTypes.Project memory project
    ) internal pure returns (bool) {
        return project.raised >= project.cost;
    }

    function isProjectExpired(
        DataTypes.Project memory project
    ) internal view returns (bool) {
        return block.timestamp >= project.expiresAt;
    }

    function performPayout(uint id) internal {
        uint raised = projects[id].raised;
        uint tax = (raised * projectTax) / 100;

        projects[id].status = DataTypes.Status.PAIDOUT;

        // Pay raised funds minus tax to project owner
        payTo(projects[id].owner, (raised - tax));

        // Pay the tax to platform owner
        payTo(owner, tax);

        balance -= projects[id].raised;

        emit Action(id, "PROJECT_PAID_OUT", msg.sender, block.timestamp);
    }

    function payTo(address to, uint256 amount) internal {
        (bool success, ) = payable(to).call{value: amount}("");
        require(success);
    }
}
