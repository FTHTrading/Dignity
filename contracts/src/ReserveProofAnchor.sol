// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title ReserveProofAnchor
 * @notice Immutable on-chain proof store for off-chain reserve attestations.
 *         Each attestation produces a SHA-256 content hash that is recorded
 *         here with a block timestamp. Proofs are append-only.
 *
 * Anyone can verify a proof by calling verifyProof() with the expected hash.
 */
contract ReserveProofAnchor is AccessControl {
    bytes32 public constant ATTESTOR_ROLE = keccak256("ATTESTOR_ROLE");

    struct Proof {
        bytes32 proofHash;       // SHA-256 of the serialised attestation payload
        uint40  anchoredAt;      // block.timestamp at anchor time
        string  attestorName;    // legal name of external auditor
        string  coverageRatioBps; // e.g. "10400" = 104.00%
        string  ipfsUri;         // optional IPFS CID for full evidence package
    }

    Proof[] private _proofs;

    event ProofAnchored(
        uint256 indexed index,
        bytes32 indexed proofHash,
        string  attestorName,
        uint40  anchoredAt
    );

    constructor(address admin) {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(ATTESTOR_ROLE, admin);
    }

    // ─── Write ───────────────────────────────────────────────────────────────

    function anchorProof(
        bytes32 proofHash,
        string calldata attestorName,
        string calldata coverageRatioBps,
        string calldata ipfsUri
    ) external onlyRole(ATTESTOR_ROLE) returns (uint256 index) {
        index = _proofs.length;
        _proofs.push(Proof({
            proofHash:        proofHash,
            anchoredAt:       uint40(block.timestamp),
            attestorName:     attestorName,
            coverageRatioBps: coverageRatioBps,
            ipfsUri:          ipfsUri
        }));
        emit ProofAnchored(index, proofHash, attestorName, uint40(block.timestamp));
    }

    // ─── Read ────────────────────────────────────────────────────────────────

    function totalProofs() external view returns (uint256) {
        return _proofs.length;
    }

    function getProof(uint256 index) external view returns (Proof memory) {
        require(index < _proofs.length, "RPA: out of bounds");
        return _proofs[index];
    }

    function latestProof() external view returns (Proof memory) {
        require(_proofs.length > 0, "RPA: no proofs");
        return _proofs[_proofs.length - 1];
    }

    function verifyProof(uint256 index, bytes32 expectedHash) external view returns (bool) {
        if (index >= _proofs.length) return false;
        return _proofs[index].proofHash == expectedHash;
    }
}
