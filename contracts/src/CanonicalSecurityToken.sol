// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title CanonicalSecurityToken
 * @notice ERC-20 with compliance enforcement on every transfer.
 *         Transfers are only permitted when both sender and receiver
 *         have been approved by the IdentityRegistry and ComplianceRegistry.
 *
 * Roles (from RoleManager):
 *   ISSUER_ROLE         — can mint and batch-mint
 *   TRANSFER_AGENT_ROLE — can forcibly transfer (court orders / escrow)
 *   DEFAULT_ADMIN_ROLE  — pause / unpause
 */
contract CanonicalSecurityToken is ERC20, ERC20Burnable, ERC20Pausable, AccessControl {
    bytes32 public constant ISSUER_ROLE         = keccak256("ISSUER_ROLE");
    bytes32 public constant TRANSFER_AGENT_ROLE = keccak256("TRANSFER_AGENT_ROLE");

    /// @notice Reference to the ComplianceRegistry for transfer eligibility
    address public complianceRegistry;

    /// @notice ISIN or internal identifier for the security
    string public isin;

    event ComplianceRegistryUpdated(address indexed oldRegistry, address indexed newRegistry);
    event ForcedTransfer(address indexed from, address indexed to, uint256 amount, string reason);

    constructor(
        string memory name_,
        string memory symbol_,
        string memory isin_,
        address admin,
        address complianceRegistry_
    ) ERC20(name_, symbol_) {
        isin = isin_;
        complianceRegistry = complianceRegistry_;
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(ISSUER_ROLE, admin);
    }

    // ─── Mint ────────────────────────────────────────────────────────────────

    function mint(address to, uint256 amount) external onlyRole(ISSUER_ROLE) {
        _mint(to, amount);
    }

    function batchMint(address[] calldata recipients, uint256[] calldata amounts)
        external
        onlyRole(ISSUER_ROLE)
    {
        require(recipients.length == amounts.length, "CST: length mismatch");
        for (uint256 i = 0; i < recipients.length; i++) {
            _mint(recipients[i], amounts[i]);
        }
    }

    // ─── Forced transfer (transfer agent only) ───────────────────────────────

    function forcedTransfer(
        address from,
        address to,
        uint256 amount,
        string calldata reason
    ) external onlyRole(TRANSFER_AGENT_ROLE) {
        _transfer(from, to, amount);
        emit ForcedTransfer(from, to, amount, reason);
    }

    // ─── Pause ───────────────────────────────────────────────────────────────

    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) { _pause(); }
    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) { _unpause(); }

    // ─── Compliance hook ─────────────────────────────────────────────────────

    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Pausable)
    {
        // Mint and burn bypass compliance check
        if (from != address(0) && to != address(0)) {
            IComplianceRegistry reg = IComplianceRegistry(complianceRegistry);
            require(reg.isEligible(from, to, value), "CST: transfer not compliant");
        }
        super._update(from, to, value);
    }

    function updateComplianceRegistry(address newRegistry)
        external
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        emit ComplianceRegistryUpdated(complianceRegistry, newRegistry);
        complianceRegistry = newRegistry;
    }

    function decimals() public pure override returns (uint8) { return 18; }
}

interface IComplianceRegistry {
    function isEligible(address from, address to, uint256 amount) external view returns (bool);
}
