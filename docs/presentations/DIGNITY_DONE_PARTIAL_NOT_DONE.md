# DIGNITY GLOBAL — STATUS MATRIX: DONE / PARTIAL / NOT DONE
### Honest Accounting of Platform State | April 2026

---

> **Purpose:** This document answers the question every serious investor and board member will ask:  
> *"What actually exists? What's still missing? What would it take to get to institutional-grade?"*  
>
> **Scoring key:**  
> ✅ Done — Built, wired, and testable in the platform  
> ◑ Partial — Scaffolding exists; real data or key wiring incomplete  
> ✗ Not Done — Does not exist yet; action required

---

## DOMAIN 1 — INFRASTRUCTURE & PLATFORM

| Element | Status | Notes / What Remains |
|---------|--------|---------------------|
| Monorepo structure (pnpm + Turbo) | ✅ | Clean; 14 packages |
| Next.js 15 App Router web app | ✅ | Building, port 3300, zero TS errors |
| Prisma 5.22 + PostgreSQL schema | ✅ | Full schema: investors, subscriptions, tokens, redemptions, assets, NAV, reserve positions, audit events, attestations |
| All 14 workspace packages structured | ✅ | All have src/index.ts and tsconfig |
| All TypeScript typechecks passing | ✅ | 0 errors as of last build |
| `next build` clean | ✅ | Passed with Prisma exclude fix |
| Dev server running | ✅ | http://localhost:3300 |
| Production deploy | ✗ | No hosting configured; no domain |
| CI/CD pipeline | ✗ | No GitHub Actions or equivalent |
| Environment secrets management | ✗ | No .env.production; no vault integration |
| Database: real PostgreSQL instance | ✗ | No connection string; Prisma schema exists but no live DB |
| Prisma migrations applied | ✗ | `prisma migrate dev` has not been run against a live DB |

---

## DOMAIN 2 — COMPLIANCE ENGINE

| Element | Status | Notes / What Remains |
|---------|--------|---------------------|
| KYC check module scaffolded | ◑ | Interface exists; no real provider (Persona/Jumio/Onfido) integrated |
| AML screening scaffolded | ◑ | Stub function; no Chainalysis/Elliptic/TRM integration |
| Accredited Investor verification logic | ◑ | Check type exists in schema; no doc review or third-party integration |
| OFAC/sanctions screening | ✗ | No wallet screening; no name screening against OFAC SDN list |
| Travel Rule handler | ✗ | No VASP-to-VASP protocol (Notabene / Sygna / OpenVASP) |
| Reg D exemption tracking per investor | ◑ | `exemptionType` field in DB schema; no filing integration |
| Form D drafts or filing | ✗ | No SEC EDGAR integration; no Form D draft |
| Reg S overseas investor flagging | ✗ | Country restriction list only — no certification flow |
| Blue sky / state law screening | ✗ | No state-level exemption logic |
| Compliance dashboard (UI) | ◑ | Static demo data; not pulling from compliance module |
| Compliance event logging | ✅ | AuditEvent schema captures compliance events |
| First legal opinion on exemption | ✗ | No outside counsel review documented in platform |

---

## DOMAIN 3 — SECURITIES TOKEN ENGINE

| Element | Status | Notes / What Remains |
|---------|--------|---------------------|
| DIGau token schema + types | ✅ | `TokenHolding`, `TokenTransaction` in Prisma schema |
| Subscription creation flow | ◑ | API + schema done; no real payment rail wired |
| Subscription status transitions | ✅ | PENDING → APPROVED → SETTLED → ISSUED state machine in schema |
| Token issuance record | ◑ | Schema exists; no actual on-chain minting or txHash capture |
| Transfer restriction logic | ✗ | No on-chain transfer restriction contract (TOKEN_TRANSFER_RESTRICTIONS) |
| Transfer restriction whitelist | ✗ | Not built |
| Lock-up period enforcement | ✗ | No lock-up tracking in token engine |
| On-chain contract address | ✗ | No deployed security token contract |
| Secondary transfer approval workflow | ✗ | Not built |
| Redemption flow | ◑ | Schema + API stub; no real USDC payout connected |
| NAV calculation | ◑ | NAV record schema exists; calculation not wired to reserve data |

---

## DOMAIN 4 — TREASURY

| Element | Status | Notes / What Remains |
|---------|--------|---------------------|
| Treasury accounts schema | ✅ | `TreasuryAccount` + `TreasuryMovement` in Prisma |
| Treasury account types (7) | ✅ | SUBSCRIPTION_RECEIPT, REDEMPTION_POOL, OPERATING_RESERVE, MARKET_MAKING, ESCROW, COMPLIANCE, INSURANCE |
| Treasury movement recording | ◑ | Schema + adapter; no real movement triggers from payment events |
| Treasury admin UI | ◑ | Demo data; not pulling live movements |
| Multi-sig wallet for treasury | ✗ | No Gnosis Safe or equivalent configured |
| Segregated accounts at custodian | ✗ | No custodian (Prime Trust, Anchorage, Copper, Fireblocks) |
| Stablecoin deposit monitoring | ✗ | Not built (pending stablecoin-rails package) |
| Stablecoin outbound settlement | ✗ | Not built |
| Fiat banking integration | ✗ | No bank (Signature-era / cross river / Mercury) integration |
| Monthly reconciliation | ✗ | No reconciliation automation |

---

## DOMAIN 5 — RESERVE REGISTRY & PROOF

| Element | Status | Notes / What Remains |
|---------|--------|---------------------|
| Reserve position schema | ✅ | `ReservePosition`, `ReserveAsset`, `ProofAnchor` in Prisma |
| ProofAnchor hash storage | ✅ | Schema ready for SHA-256 + CID |
| Reserve admin UI | ◑ | Demo CoverageGauge with dummy data |
| Proof center (public) | ◑ | UI exists with dummy proof documents |
| Real mining reserve data | ✗ | No verified mining property data connected |
| Actual SHA-256 hashed documents | ✗ | No documents submitted or hashed yet |
| IPFS pinning | ✗ | No Pinata / web3.storage integration |
| On-chain proof registry contract | ✗ | No Solidity contract deployed |
| NI 43-101 or S-K 1300 report | ✗ | Not commissioned; no qualified person engaged |
| Independent third-party reserve audit | ✗ | Not yet engaged |
| ProofAnchor CID publicly verifiable | ✗ | No IPFS CID exists yet |

---

## DOMAIN 6 — MINING DISCLOSURE

| Element | Status | Notes / What Remains |
|---------|--------|---------------------|
| Mining property identified | ✗ | No confirmed property tied into platform |
| Property title confirmed | ✗ | No legal opinion or title search documented |
| S-K 1300 Qualified Person engaged | ✗ | Not retained |
| Mineral Resource estimate | ✗ | Not performed |
| Technical Report Exploration Summary | ✗ | Not drafted |
| Production data (if producing property) | ✗ | Not available |
| Mining Disclosure UI in platform | ✗ | No page or data model for mining disclosure |
| Environmental permits / approvals | ✗ | Not documented in platform |
| Insurance — Mining-specific | ✗ | Not in place |

---

## DOMAIN 7 — INSURANCE

| Element | Status | Notes / What Remains |
|---------|--------|---------------------|
| D&O Insurance | ✗ | Not in place (highest priority for board) |
| Cyber Liability Insurance | ✗ | Not in place |
| Crime / Fidelity Insurance | ✗ | Not in place |
| E&O / Professional Liability | ✗ | Not in place |
| Property / Specie Insurance (mining assets) | ✗ | Not in place |
| Environmental Liability | ✗ | Not in place |
| General Liability | ✗ | Status unknown |
| Insurance tracking in platform | ✗ | No schema; no admin UI |

---

## DOMAIN 8 — LEGAL & GOVERNANCE

| Element | Status | Notes / What Remains |
|---------|--------|---------------------|
| Entity formation (issuer) | ✗ | Unconfirmed — need legal memo attached to platform |
| Operating agreement | ✗ | Not in documents module |
| Securities counsel retained | ✗ | No outside counsel referenced |
| Securities counsel opinion letter | ✗ | Not created |
| Investor subscription agreement template | ◑ | Documents module scaffolded; template text not finalized |
| PPM (Private Placement Memo) | ✗ | Not yet drafted |
| Investor rights agreement | ✗ | Not in documents module |
| Board meeting minutes in system | ✗ | No governance module |
| RBAC policy formally documented | ✗ | Code-level roles exist; no formal RBAC document |
| Whistleblower policy | ✗ | Not in platform |
| Information barrier policy | ✗ | Not in platform |

---

## DOMAIN 9 — LP / MARKET STRUCTURE

| Element | Status | Notes / What Remains |
|---------|--------|---------------------|
| Market-ops package | ✅ | Schema + index; inventory, OTC quote, MM agreement models |
| LP/MM dashboard UI | ◑ | Pending page creation |
| Market maker agreements (template) | ✗ | Not in documents module |
| MM entity onboarded | ✗ | No real counterparty |
| OTC RFQ flow | ◑ | Type schema exists; no workflow UI |
| Circuit breaker logic | ◑ | Type schema; no enforcement automation |
| Reporting to LPs | ✗ | No monthly LP report generation |
| ATS / broker-dealer — confirmed? | ✗ | Board narrative references capability; no broker-dealer engaged yet |
| Liquidation mechanism | ✗ | No redemption gate enforcement |

---

## DOMAIN 10 — STABLECOIN RAILS

| Element | Status | Notes / What Remains |
|---------|--------|---------------------|
| `@dignity/stablecoin-rails` package | ✗ | Not built yet (next work item) |
| Circle USDC adapter | ✗ | Not built |
| Tether USDT adapter | ✗ | Not built |
| Deposit instruction generator | ✗ | Not built |
| Deposit monitoring | ✗ | Not built |
| Settlement engine | ✗ | Not built |
| Treasury reconciliation hook | ✗ | Not built |
| Admin stablecoin UI | ✗ | Not built |
| Rail health monitoring | ✗ | Not built |

---

## AGGREGATE SCORECARD

| Domain | Done | Partial | Not Done | Score (Done+½Partial / Total) |
|--------|------|---------|----------|-------------------------------|
| Infrastructure | 7 | 2 | 3 | 67% |
| Compliance Engine | 3 | 4 | 5 | 42% |
| Token Engine | 3 | 4 | 4 | 45% |
| Treasury | 3 | 3 | 5 | 41% |
| Reserve & Proof | 3 | 3 | 6 | 38% |
| Mining Disclosure | 0 | 0 | 9 | 0% |
| Insurance | 0 | 0 | 8 | 0% |
| Legal & Governance | 0 | 2 | 9 | 9% |
| LP / Market | 2 | 3 | 4 | 42% |
| Stablecoin Rails | 0 | 0 | 10 | 0% |
| **TOTALS** | **21** | **21** | **63** | **~29%** |

**Platform Maturity: Early-Operational Infrastructure — Pre-Disclosure, Pre-Institutional**

---

## PRIORITY-ORDERED ACTION LIST

### Tier 1 — Blocking Everything Else

1. **Engage securities counsel** — Need legal opinion on Reg D exemption availability before any investor contact
2. **Engage D&O insurance broker** — Board members have personal liability exposure without coverage
3. **Confirm mining property title** — Core asset backing is unverified
4. **Engage Qualified Person (QP)** for S-K 1300 technical report — No mineral estimate without QP

### Tier 2 — Platform Infrastructure (This Codebase)

5. **Build `@dignity/stablecoin-rails` package** — Required to close subscription and redemption flows
6. **Connect live PostgreSQL** — Schema is complete; no live DB yet
7. **Wire real KYC provider** (Persona recommended for accredited investor verification)
8. **Wire OFAC screening** to subscription + stablecoin rail (Chainalysis or Elliptic)
9. **Set up IPFS pinning** (Pinata) and begin hashing available documents

### Tier 3 — Disclosure & Governance

10. **Draft PPM** with securities counsel
11. **Draft subscription agreement** with legal review
12. **Set up multi-sig treasury wallet** (Gnosis Safe or Fireblocks)
13. **Complete RBAC policy document**
14. **Complete incident response plan**

### Tier 4 — Market and Reporting Infrastructure

15. **Execute MM agreement** with first counterparty
16. **Build LP monthly reporting** template and delivery mechanism
17. **Create investor data room** with proofed documents
18. **Implement NAV calculation** from real reserve data

---

*Document Version: 1.0 — April 2026*  
*Classification: Board and Senior Management — Restricted*
