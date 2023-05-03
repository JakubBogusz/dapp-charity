//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "../../Vault.sol";

contract VaultPassingTest is Vault {
    constructor()
        Vault(
            0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef
        )
    {}

    function echidna_test_lock_unlock() public returns (bool) {
        bool initialLockedState = locked;

        if (!initialLockedState) {
            lock();
            return locked;
        } else {
            // Random password guess
            bytes32 guessedPassword = bytes32(
                abi.encodePacked(uint256(0xdeadbeef))
            );
            unlock(guessedPassword);
            return locked == initialLockedState;
        }
    }
}
