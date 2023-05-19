// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../../ProjectUtils.sol";

contract ProjectRefundEchidnaTest is ProjectUtils {
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

    function addSupporter(uint projectId, uint amount) external payable {
        require(msg.value == amount, "Amount does not match the sent value");
        supportersOf[projectId].push(
            DataTypes.Supporter({
                owner: msg.sender,
                contribution: amount,
                timestamp: block.timestamp,
                refunded: false
            })
        );
    }

    function echidna_test_refund() public returns (bool) {
        uint projectId = 0;
        uint initialBalance = address(this).balance;
        uint totalContributions = projects[projectId].amountRaised;

        performRefund(projectId);

        // Check if the total refunded amount is equal to the initial contributions
        uint totalRefunded = 0;
        for (uint i = 0; i < supportersOf[projectId].length; i++) {
            if (supportersOf[projectId][i].refunded) {
                totalRefunded += supportersOf[projectId][i].contribution;
            }
        }

        return totalContributions == totalRefunded &&
            initialBalance - totalRefunded == address(this).balance;
    }
}
