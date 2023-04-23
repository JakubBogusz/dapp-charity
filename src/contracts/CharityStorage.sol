// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./DataTypes.sol";

contract CharityStorage {
    address public owner;
    uint public projectTax;
    uint public projectCount;
    uint public balance;
    DataTypes.Stats public stats;
    DataTypes.Project[] public projects;

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
