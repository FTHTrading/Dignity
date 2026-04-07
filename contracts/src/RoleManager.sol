// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title RoleManager
 * @notice Canonical role definitions and admin-controlled role assignment
 *         for the Dignity institutional token stack.
 *
 * Roles:
 *   DEFAULT_ADMIN_ROLE  — governance multisig; can grant/revoke all roles
 *   ISSUER_ROLE         — IssuerProgram controller (back-office API)
 *   COMPLIANCE_ROLE     — ComplianceRegistry: approve/deny identities
 *   TRANSFER_AGENT_ROLE — IssuanceController & RedemptionController
 *   AUDITOR_ROLE        — read-only attestation proofs
 *   TIMELOCK_ROLE       — reserved for TimelockAdmin contract
 */
contract RoleManager is AccessControl {
    bytes32 public constant ISSUER_ROLE         = keccak256("ISSUER_ROLE");
    bytes32 public constant COMPLIANCE_ROLE     = keccak256("COMPLIANCE_ROLE");
    bytes32 public constant TRANSFER_AGENT_ROLE = keccak256("TRANSFER_AGENT_ROLE");
    bytes32 public constant AUDITOR_ROLE        = keccak256("AUDITOR_ROLE");
    bytes32 public constant TIMELOCK_ROLE       = keccak256("TIMELOCK_ROLE");

    event RoleGrantedTo(bytes32 indexed role, address indexed account, address indexed grantor);

    constructor(address admin) {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
    }

    /// @notice Convenience — grants ISSUER_ROLE and emits structured event
    function grantIssuerRole(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(ISSUER_ROLE, account);
        emit RoleGrantedTo(ISSUER_ROLE, account, msg.sender);
    }

    /// @notice Convenience — grants COMPLIANCE_ROLE
    function grantComplianceRole(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(COMPLIANCE_ROLE, account);
        emit RoleGrantedTo(COMPLIANCE_ROLE, account, msg.sender);
    }

    /// @notice Convenience — grants TRANSFER_AGENT_ROLE
    function grantTransferAgentRole(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(TRANSFER_AGENT_ROLE, account);
        emit RoleGrantedTo(TRANSFER_AGENT_ROLE, account, msg.sender);
    }
}
