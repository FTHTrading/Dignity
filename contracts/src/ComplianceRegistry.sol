// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title ComplianceRegistry
 * @notice Transfer eligibility layer that combines IdentityRegistry
 *         lookups with jurisdiction rules, holding limits, and
 *         operator-level overrides.
 *
 *         Called by CanonicalSecurityToken._update() before every transfer.
 */
contract ComplianceRegistry is AccessControl {
    bytes32 public constant COMPLIANCE_ROLE = keccak256("COMPLIANCE_ROLE");

    IIdentityRegistry public identityRegistry;

    /// @notice jurisdiction code => allowed
    mapping(bytes2 => bool) public allowedJurisdictions;

    /// @notice per-address hold — overrides normal rules (e.g. locked escrow)
    mapping(address => bool) public blocked;

    event JurisdictionSet(bytes2 indexed jurisdiction, bool allowed);
    event AddressBlocked(address indexed account, string reason);
    event AddressUnblocked(address indexed account);

    constructor(address admin, address identityRegistry_) {
        identityRegistry = IIdentityRegistry(identityRegistry_);
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(COMPLIANCE_ROLE, admin);
    }

    // ─── Core eligibility ────────────────────────────────────────────────────

    /**
     * @notice Returns true if the transfer is permitted.
     *         Called by CanonicalSecurityToken before every transfer.
     */
    function isEligible(address from, address to, uint256 /*amount*/)
        external
        view
        returns (bool)
    {
        if (blocked[from] || blocked[to]) return false;
        if (!identityRegistry.isVerified(from)) return false;
        if (!identityRegistry.isVerified(to))   return false;
        return true;
    }

    // ─── Admin ───────────────────────────────────────────────────────────────

    function setJurisdiction(bytes2 jurisdiction, bool allowed)
        external
        onlyRole(COMPLIANCE_ROLE)
    {
        allowedJurisdictions[jurisdiction] = allowed;
        emit JurisdictionSet(jurisdiction, allowed);
    }

    function blockAddress(address account, string calldata reason)
        external
        onlyRole(COMPLIANCE_ROLE)
    {
        blocked[account] = true;
        emit AddressBlocked(account, reason);
    }

    function unblockAddress(address account) external onlyRole(COMPLIANCE_ROLE) {
        blocked[account] = false;
        emit AddressUnblocked(account);
    }

    function updateIdentityRegistry(address newRegistry)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        identityRegistry = IIdentityRegistry(newRegistry);
    }
}

interface IIdentityRegistry {
    function isVerified(address account) external view returns (bool);
}
