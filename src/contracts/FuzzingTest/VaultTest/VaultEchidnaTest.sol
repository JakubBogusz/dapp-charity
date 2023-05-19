// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "../../Vault.sol";

contract VaultEchidnaTest is Vault {
    constructor() Vault("easy123") {}

    function echidna_test_find_password() public returns (bool) {
        bytes32 guessedPassword = bytes32(
            abi.encodePacked(uint256(0xdeadbeef))
        );
        unlock(guessedPassword);
        return locked;
    }
}
