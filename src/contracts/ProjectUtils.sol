// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./DataTypes.sol";
import "./CharityStorage.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract ProjectUtils is CharityStorage, ReentrancyGuard {

    function performRefund(uint id) internal nonReentrant {
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
