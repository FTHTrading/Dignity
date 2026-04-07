// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/governance/TimelockController.sol";

/**
 * @title TimelockAdmin
 * @notice Wraps OpenZeppelin's TimelockController with a 2-day minimum delay
 *         for all privileged admin actions on the Dignity contract stack.
 *
 * Proposers: governance multisig
 * Executors: address(0) = anyone can execute after delay
 * Admin:     renounced after deployment
 */
contract TimelockAdmin is TimelockController {
    uint256 public constant MIN_DELAY = 2 days;

    constructor(
        address[] memory proposers,
        address[] memory executors
    )
        TimelockController(
            MIN_DELAY,
            proposers,
            executors,
            address(0) // self-administered after construction
        )
    {}
}
