# DIGNITY GLOBAL — STABLECOIN RAILS INTEGRATION
### Confidential | April 2026

---

## OVERVIEW

Stablecoin settlement rails (USDC and USDT) are a payment and treasury tooling layer — they are **separate from DIGau securities compliance**. Adding stablecoin rails to Dignity solves treasury, settlement, and LP velocity problems. It does not substitute for securities law compliance, mining disclosure, or reserve proof.

---

## PART I — LOCAL ASSET INVENTORY

*Scanned April 2026 across: USDF-rebuild, UnyKorn-X402-aws, dignity-institutional-platform*

### Found and Reusable

| File / Module | Location | What It Provides | Reuse Decision |
|---------------|----------|-----------------|----------------|
| `FTHStablecoin.sol` | UnyKorn-X402-aws/packages/unyKorn-contracts | ERC-20 stablecoin with minter roles, pause, ERC-2612 permit, 6 decimals | Reference pattern only — DIGau uses external USDC/USDT, not a new ERC-20 |
| `fth-x402-treasury` service | UnyKorn-X402-aws | Treasury route architecture, treasury service pattern | Pattern reuse — wraps as adapter |
| `fth-x402-sdk/wallet.ts` | UnyKorn-X402-aws | Ed25519 signing pattern for payment proofs | Reference — different signing model |
| Merkle engine (USDF) | USDF-rebuild/engine | MeridianEngine — 5-chain connector pattern (XRPL, Stellar, ETH, SOL, TRON) | Pattern reuse — connector interface |
| `fth-network/stablecoin/` | USDF-rebuild | Stablecoin module types | Type patterns |
| `apostle-agents-7332.json` | UnyKorn-X402-aws/registry | Agent registry — ATP rail | No reuse for USDC/USDT |
| `treasury.ts` adapter | dignity-institutional-platform | Demo treasury adapter | Extend with stablecoin deposit acknowledgment |

### Gap — Not Found

- No Circle API integration (USDC on-chain monitoring via Circle Payments API)
- No Tether API integration (USDT on-chain monitoring)
- No USDC/USDT deposit instruction generator
- No stablecoin reconciliation hook linked to treasury movements
- No admin monitoring UI for stablecoin rail health

---

## PART II — COMPLIANCE SEPARATION RULES

### GENIUS Act vs. DIGau

The **Genius Act (S. 1582, 2025)** creates a federal framework for "payment stablecoins" — digital assets redeemable at a fixed dollar amount, not bearing yield, issued by a licensed entity.

**DIGau is not a payment stablecoin.** DIGau is a security token backed by mining assets, priced at NAV (which may vary), and issued under Reg D/Reg S. GENIUS Act regulation does not govern DIGau.

USDC and USDT used as payment rails within the Dignity platform are the payment instruments. The compliance obligation for those flows is separate:

| Compliance Track | Governing Framework | Module |
|-----------------|-------------------|--------|
| DIGau securities compliance | Reg D, Reg S, SEC, FINRA | `@dignity/compliance-engine`, `@dignity/token-engine` |
| USDC/USDT payment rail compliance | FinCEN/MSB, OFAC, state MTL, GENIUS Act if applicable | `@dignity/stablecoin-rails` + legal memo |

**Never cross-contaminate these two compliance tracks.** A stablecoin OFAC failure does not mean a securities compliance failure, and vice versa. Both must be managed separately.

---

## PART III — PACKAGE ARCHITECTURE: @dignity/stablecoin-rails

### 3.1 Module Map

```
packages/stablecoin-rails/
├── src/
│   ├── index.ts                    ← public exports
│   ├── shared-types/
│   │   └── index.ts                ← StablecoinAsset, RailHealth, SettlementOrder, etc.
│   ├── adapters/
│   │   ├── circle/
│   │   │   └── index.ts            ← Circle USDC adapter (Payments API)
│   │   ├── tether/
│   │   │   └── index.ts            ← Tether USDT adapter (EVM + Tron monitoring)
│   │   └── local/
│   │       └── index.ts            ← Local/test adapter (deterministic mock)
│   ├── settlement/
│   │   ├── engine.ts               ← Settlement orchestration, rail selection
│   │   └── reconciliation.ts       ← Reconciliation hooks → treasury movement
│   ├── treasury/
│   │   ├── wallet-router.ts        ← Chain/asset → wallet address routing
│   │   └── deposit-instructions.ts ← Deposit instruction generation per investor
│   └── monitoring/
│       ├── price-feed.ts           ← USDC/USDT reference price (should be ~$1.000)
│       └── health.ts               ← Rail health monitoring
```

### 3.2 Supported Rails

| Asset | Chain | Adapter | Notes |
|-------|-------|---------|-------|
| USDC | Ethereum | Circle Payments API | Primary institutional rail |
| USDC | Polygon | On-chain monitoring | Lower gas, faster settlement |
| USDC | Base | On-chain monitoring | Circle's L2 preference |
| USDC | Solana | Circle Payments API | High-throughput option |
| USDT | Ethereum | On-chain monitoring (ethers/viem) | Highest liquidity USDT |
| USDT | Tron (TRC-20) | Tron API monitoring | High USDT volume globally |
| USDT | Polygon | On-chain monitoring | Institutional secondary option |

---

## PART IV — INTEGRATION WITH DIGNITY PLATFORM

### 4.1 Subscription Settlement Integration

When a subscription is approved and the investor is ready to fund:

```
token-engine: subscription.status → APPROVED
       ↓
stablecoin-rails: GenerateDepositInstructions(subscriptionId, investorId)
       → Returns: { asset: "USDC", chain: "ethereum", address: "0x...", 
                    memo: "DIG-SUB-{id}", amount: "50000.000000", 
                    expiresAt: ISO8601 }
       ↓
Investor receives deposit instructions in portal
       ↓
Investor sends USDC on-chain
       ↓
stablecoin-rails: MonitorDeposit watches for matching transfer
       → on_confirm: emit DepositConfirmed event
       ↓
treasury: recordMovement(type: SUBSCRIPTION_RECEIPT, amountUsd, currency: "USDC")
       ↓
token-engine: subscription.status → SETTLED; issue tokens
```

### 4.2 Redemption Settlement Integration

```
token-engine: redemption.status → APPROVED
       ↓
treasury: verify REDEMPTION_POOL balance sufficiency
       ↓
stablecoin-rails: InitiateSettlement(redemptionId, investorWallet, amount, asset: "USDC")
       → Sends USDC on-chain from redemption pool wallet
       ↓
stablecoin-rails: MonitorOutboundTx
       → on_confirm: emit SettlementConfirmed event
       ↓
treasury: recordMovement(type: REDEMPTION_PAYMENT, amount, currency: "USDC")
       ↓
token-engine: redemption.status → SETTLED
```

### 4.3 LP / MM Treasury Reload Integration

```
market-ops: InventoryAllocation → MM pool below threshold
       ↓
Admin action: approve treasury reload
       ↓
stablecoin-rails: InitiateSettlement(to: mmWalletAddress, amount, asset: "USDC")
       ↓
treasury: recordMovement(type: MARKET_MAKER_ALLOCATION, from: MARKET_MAKING account)
       ↓
market-ops: InventoryAllocation.allocatedAmount updated
```

---

## PART V — CIRCLE USDC INTEGRATION SPECIFICS

### Circle Payments API

Circle's Payments API (v2) handles:
- Creating payment intents (deposit instruction generation)
- Monitoring incoming USDC deposits
- Webhook notifications on deposit confirmation
- Outgoing payment processing (USDC disbursements)
- Balance queries per business account

**Required credentials:**
```
CIRCLE_API_KEY=...
CIRCLE_ENVIRONMENT=sandbox|production
CIRCLE_WALLET_ID=...    # issuer's Circle wallet ID
```

**Note:** Do not expose these in client-side code. Route all Circle API calls through server-side API routes.

### Circle Chains Supported

As of 2026: Ethereum, Polygon, Avalanche, Solana, Base, Arbitrum, Optimism

### Payment Confirmation Timing

| Chain | Typical Confirmation Time | Circle Final Settlement |
|-------|--------------------------|------------------------|
| Ethereum | 1–3 minutes | ~5 minutes |
| Polygon | 20–30 seconds | ~2 minutes |
| Base | 5–10 seconds | ~1 minute |
| Solana | 0.5–1 seconds | ~30 seconds |

---

## PART VI — TETHER USDT INTEGRATION SPECIFICS

Since Tether does not provide a Payments API equivalent with deposit monitoring, USDT monitoring is done via:
- **Ethereum:** Listen to ERC-20 Transfer events on USDT contract (`0xdAC17F958D2ee523a2206206994597C13D831ec7`)
- **Tron (TRC-20):** Poll Tron scan API or use TronGrid WebSocket for TRC-20 transfers
- **Polygon:** Polygon USDT (`0xc2132D05D31c914a87C6611C10748AEb04B58e8F`) via ethers.js

**Monitoring strategy:**
1. Generate issuer deposit address per investor per subscription (HD wallet derivation)
2. Monitor for Transfer events to that address
3. On confirmation: emit DepositConfirmed with amount, txHash, chain, timestamp

---

## PART VII — COMPLIANCE HOOKS

Every stablecoin transaction processed by `@dignity/stablecoin-rails` must pass:

| Check | Timing | Action on Fail |
|-------|--------|---------------|
| OFAC wallet screening | Before deposit instruction generated | Block instruction, log compliance event |
| Transaction amount threshold | On deposit confirmation | Flag for manual review if > $10K |
| Counterparty wallet check | On every inbound | Screen against sanctions list |
| Travel Rule assessment | If transfer ≥ $3,000 | Document sender VASP information |

These checks are **independent of DIGau KYC checks** — they operate on the payment rail, not the securities eligibility track.

---

*Document Version: 1.0 — April 2026*  
*Classification: Confidential — Engineering and Compliance Use*
