// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title IdentityRegistry
 * @notice On-chain identity enrollment and KYC status tracking.
 *         Each address maps to a KYC tier and expiry timestamp.
 *
 * Tiers:
 *   0 — Not enrolled
 *   1 — KYC Individual (accredited investor)
 *   2 — KYB Entity (institutional)
 *   3 — Exempt (fund vehicle, SPV)
 */
contract IdentityRegistry is AccessControl {
    bytes32 public constant COMPLIANCE_ROLE = keccak256("COMPLIANCE_ROLE");

    struct Identity {
        uint8 tier;
        uint40 expiresAt;   // unix timestamp; 0 = never expires
        bool active;
        bytes32 kycRef;     // off-chain KYC record hash (IPFS CID or DB UUID)
    }

    mapping(address => Identity) private _identities;

    event IdentityEnrolled(address indexed account, uint8 tier, uint40 expiresAt, bytes32 kycRef);
    event IdentityRevoked(address indexed account, string reason);
    event IdentityUpdated(address indexed account, uint8 newTier, uint40 newExpiry);

    constructor(address admin) {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(COMPLIANCE_ROLE, admin);
    }

    // ─── Write ───────────────────────────────────────────────────────────────

    function enroll(
        address account,
        uint8 tier,
        uint40 expiresAt,
        bytes32 kycRef
    ) external onlyRole(COMPLIANCE_ROLE) {
        require(tier >= 1 && tier <= 3, "IR: invalid tier");
        _identities[account] = Identity({ tier: tier, expiresAt: expiresAt, active: true, kycRef: kycRef });
        emit IdentityEnrolled(account, tier, expiresAt, kycRef);
    }

    function batchEnroll(
        address[] calldata accounts,
        uint8[] calldata tiers,
        uint40[] calldata expiries,
        bytes32[] calldata kycRefs
    ) external onlyRole(COMPLIANCE_ROLE) {
        uint256 len = accounts.length;
        require(tiers.length == len && expiries.length == len && kycRefs.length == len, "IR: length");
        for (uint256 i = 0; i < len; i++) {
            _identities[accounts[i]] = Identity({
                tier: tiers[i],
                expiresAt: expiries[i],
                active: true,
                kycRef: kycRefs[i]
            });
            emit IdentityEnrolled(accounts[i], tiers[i], expiries[i], kycRefs[i]);
        }
    }

    function revoke(address account, string calldata reason) external onlyRole(COMPLIANCE_ROLE) {
        _identities[account].active = false;
        emit IdentityRevoked(account, reason);
    }

    function update(address account, uint8 tier, uint40 expiresAt) external onlyRole(COMPLIANCE_ROLE) {
        Identity storage id = _identities[account];
        require(id.active, "IR: not enrolled");
        id.tier = tier;
        id.expiresAt = expiresAt;
        emit IdentityUpdated(account, tier, expiresAt);
    }

    // ─── Read ────────────────────────────────────────────────────────────────

    function isVerified(address account) external view returns (bool) {
        Identity storage id = _identities[account];
        if (!id.active || id.tier == 0) return false;
        if (id.expiresAt > 0 && id.expiresAt < block.timestamp) return false;
        return true;
    }

    function getIdentity(address account) external view returns (Identity memory) {
        return _identities[account];
    }
}
