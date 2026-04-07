// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title IssuanceController
 * @notice Accepts subscription investments and mints security tokens
 *         after compliance confirmation from the off-chain engine.
 *
 * Flow:
 *   1. Investor calls subscribe() with fiat reference + amount
 *   2. Off-chain: compliance engine evaluates; if approved, calls confirmIssuance()
 *   3. Token is minted to investor wallet
 */
contract IssuanceController is AccessControl, ReentrancyGuard {
    bytes32 public constant TRANSFER_AGENT_ROLE = keccak256("TRANSFER_AGENT_ROLE");
    bytes32 public constant ISSUER_ROLE         = keccak256("ISSUER_ROLE");

    ISecurityToken public securityToken;

    struct IssuanceRequest {
        address investor;
        uint256 tokenAmount;        // tokens to mint (18 dec)
        uint256 investmentAmountUsd; // fiat in USD micro-units (6 dec)
        bytes32 subscriptionRef;    // off-chain UUID hash
        bool settled;
        bool rejected;
    }

    uint256 public nextRequestId;
    mapping(uint256 => IssuanceRequest) public requests;

    event SubscriptionSubmitted(uint256 indexed id, address indexed investor, bytes32 ref);
    event IssuanceConfirmed(uint256 indexed id, address indexed investor, uint256 tokens);
    event IssuanceRejected(uint256 indexed id, address indexed investor, string reason);

    constructor(address admin, address token_) {
        securityToken = ISecurityToken(token_);
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(ISSUER_ROLE, admin);
        _grantRole(TRANSFER_AGENT_ROLE, admin);
    }

    function subscribe(
        address investor,
        uint256 tokenAmount,
        uint256 investmentAmountUsd,
        bytes32 subscriptionRef
    ) external onlyRole(ISSUER_ROLE) returns (uint256 id) {
        id = nextRequestId++;
        requests[id] = IssuanceRequest({
            investor: investor,
            tokenAmount: tokenAmount,
            investmentAmountUsd: investmentAmountUsd,
            subscriptionRef: subscriptionRef,
            settled: false,
            rejected: false
        });
        emit SubscriptionSubmitted(id, investor, subscriptionRef);
    }

    function confirmIssuance(uint256 id) external nonReentrant onlyRole(TRANSFER_AGENT_ROLE) {
        IssuanceRequest storage req = requests[id];
        require(!req.settled && !req.rejected, "IC: already processed");
        req.settled = true;
        securityToken.mint(req.investor, req.tokenAmount);
        emit IssuanceConfirmed(id, req.investor, req.tokenAmount);
    }

    function rejectIssuance(uint256 id, string calldata reason)
        external
        onlyRole(TRANSFER_AGENT_ROLE)
    {
        IssuanceRequest storage req = requests[id];
        require(!req.settled && !req.rejected, "IC: already processed");
        req.rejected = true;
        emit IssuanceRejected(id, req.investor, reason);
    }
}

interface ISecurityToken {
    function mint(address to, uint256 amount) external;
}
