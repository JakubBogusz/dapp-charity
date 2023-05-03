// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../../ProjectUtils.sol";

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
