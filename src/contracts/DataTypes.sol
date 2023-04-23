// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

library DataTypes {
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
}
