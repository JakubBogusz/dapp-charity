// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./ManageProjects.sol";
import "./SupportProjects.sol";

contract DCharity is ManageProjects, SupportProjects {
     constructor(uint _projectTax) {
        owner = msg.sender;
        projectTax = _projectTax;
    }
}
