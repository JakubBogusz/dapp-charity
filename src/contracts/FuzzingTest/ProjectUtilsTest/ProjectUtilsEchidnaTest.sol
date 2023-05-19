// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../../ProjectUtils.sol";

contract ProjectUtilsEchidnaTest is ProjectUtils {
    constructor() {
        owner = msg.sender;
        projectTax = 5;
        initialize();
    }

    function initialize() private {
        projects.push(
            DataTypes.Project({
                id: 0,
                owner: address(this),
                title: "Test Project",
                description: "This is a test project",
                imageURL: "https://example.com/image.png",
                cost: 10 ether,
                amountRaised: 0,
                timestamp: block.timestamp,
                expiresAt: block.timestamp + 30 days,
                supporters: 0,
                status: DataTypes.Status.OPEN
            })
        );

        balance = 0;
    }

    function updateAmountRaised(uint256 amount) public payable {
        require(msg.value == amount, "Amount does not match the sent value");
        projects[0].amountRaised += amount;
        balance += amount;
    }

    function echidna_test_perform_payout() public returns (bool) {
        if (isProjectFunded(projects[0])) {
            performPayout(0);

            // Verify that the project status has been updated to PAIDOUT
            if (projects[0].status != DataTypes.Status.PAIDOUT) {
                return false;
            }

            // Check if the platform owner received the correct tax amount
            uint256 tax = (projects[0].amountRaised * projectTax) / 100;
            if (withdrawals[owner] != tax) {
                return false;
            }

            // Check if the project owner received the correct payout amount
            uint256 payout = projects[0].amountRaised - tax;
            if (withdrawals[projects[0].owner] != payout) {
                return false;
            }
        }

        return true;
    }
}
