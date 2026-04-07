// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title RedemptionController
 * @notice Locks tokens in escrow during redemption processing,
 *         then burns on confirmation or returns on rejection.
 *
 * Flow:
 *   1. Transfer agent calls requestRedemption() (investor tokens pre-transferred here)
 *   2. Off-chain: compliance + treasury confirm settlement reference
 *   3. confirmRedemption() burns the escrowed tokens
 *   OR rejectRedemption() returns tokens to investor
 */
contract RedemptionController is AccessControl, ReentrancyGuard {
    bytes32 public constant TRANSFER_AGENT_ROLE = keccak256("TRANSFER_AGENT_ROLE");

    ISecurityTokenBurnable public securityToken;

    struct RedemptionRequest {
        address investor;
        uint256 tokenAmount;
        bytes32 redemptionRef;
        bool settled;
        bool rejected;
    }

    uint256 public nextRequestId;
    mapping(uint256 => RedemptionRequest) public requests;

    /// @notice Escrowed token balance per request
    mapping(uint256 => uint256) public escrow;

    event RedemptionRaised(uint256 indexed id, address indexed investor, uint256 tokens, bytes32 ref);
    event RedemptionConfirmed(uint256 indexed id, address indexed investor, uint256 tokens);
    event RedemptionRejected(uint256 indexed id, address indexed investor, string reason);

    constructor(address admin, address token_) {
        securityToken = ISecurityTokenBurnable(token_);
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(TRANSFER_AGENT_ROLE, admin);
    }

    function requestRedemption(
        address investor,
        uint256 tokenAmount,
        bytes32 redemptionRef
    ) external onlyRole(TRANSFER_AGENT_ROLE) returns (uint256 id) {
        id = nextRequestId++;
        requests[id] = RedemptionRequest({
            investor: investor,
            tokenAmount: tokenAmount,
            redemptionRef: redemptionRef,
            settled: false,
            rejected: false
        });
        // Caller must have already transferred tokens here; record escrow
        escrow[id] = tokenAmount;
        emit RedemptionRaised(id, investor, tokenAmount, redemptionRef);
    }

    function confirmRedemption(uint256 id) external nonReentrant onlyRole(TRANSFER_AGENT_ROLE) {
        RedemptionRequest storage req = requests[id];
        require(!req.settled && !req.rejected, "RC: already processed");
        req.settled = true;
        uint256 amount = escrow[id];
        escrow[id] = 0;
        securityToken.burn(amount);
        emit RedemptionConfirmed(id, req.investor, amount);
    }

    function rejectRedemption(uint256 id, string calldata reason)
        external
        nonReentrant
        onlyRole(TRANSFER_AGENT_ROLE)
    {
        RedemptionRequest storage req = requests[id];
        require(!req.settled && !req.rejected, "RC: already processed");
        req.rejected = true;
        uint256 amount = escrow[id];
        escrow[id] = 0;
        // Return tokens to investor
        IERC20Transfer(address(securityToken)).transfer(req.investor, amount);
        emit RedemptionRejected(id, req.investor, reason);
    }
}

interface ISecurityTokenBurnable {
    function burn(uint256 amount) external;
}

interface IERC20Transfer {
    function transfer(address to, uint256 amount) external returns (bool);
}
