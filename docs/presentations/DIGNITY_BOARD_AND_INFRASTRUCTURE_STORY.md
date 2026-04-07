# DIGNITY GLOBAL — BOARD, ADVISORY, AND INFRASTRUCTURE STORY
### Confidential | April 2026

---

## FRAMING PRINCIPLE

The board and advisory group is a **credibility amplifier**, not the product. Infrastructure, proof, and compliance execution are the product.

**Allocation target:**
- Board / Leadership narrative: 20–30%
- Infrastructure, proof, execution: 70–80%

The slide deck should never become a biography collection. Every board mention must be paired with an infrastructure proof point.

---

## PART I — BOARD NARRATIVE

### The Design of the Leadership Stack

Dignity's leadership was assembled to cover every domain required to operate a compliant, institutionally credible real-asset digital security platform. That is not an accident.

**David Weild IV — Capital Markets and Institutional Finance**

Weild brings NYSE-level capital markets infrastructure credibility. His background spans exchanges, IPO reform, and institutional distribution. The signal this sends to a fund manager or compliance officer is that Dignity understands how institutional capital markets actually work — not in theory, but operationally. That is a door-opener at the investment committee level.

*Infrastructure pairing:* The issuer operating system he anchors builds the actual institutional plumbing — treasury segregation, transfer controls, compliance audit trail — that institutional capital requires.

**Daniel Sweet — Trading, Market Structure, and Series 24 Supervision**

Series 24 is supervisory principal license for broker-dealer general supervision. Sweet's presence signals that the market and trading operations side — quote management, order flow, market structure integrity, supervisory controls — is being taken seriously. This is relevant for LP relationships, OTC desk operations, and secondary market structure.

*Infrastructure pairing:* The market-ops package provides NAV pricing, venue health scoring, anomaly detection, circuit breakers, and LP management infrastructure. That is the operating system his credibility introduces.

**Miguel Barahona — Mining Engineering and Reserve Operations**

Mining engineering and operating leadership is the credibility anchor for the reserve side of the story. Investors and structured-finance professionals who diligence resource-backed assets require engineering credibility at the senior level — not just a cited report.

*Infrastructure pairing:* The reserve registry tracks reserve assets, lots, valuations, custody records, and NI 43-101 evidence documents. The attestation system creates signed, time-stamped, IPFS-anchored certifications of reserve integrity. That converts a mining credential into a verifiable system.

**William B. Heyn — Broker-Dealer and Securities Distribution**

Heyn's association with Tritaurian Capital represents the regulated distribution layer. A registered broker-dealer in the distribution chain is not decorative — it is a regulatory requirement for U.S. securities offerings. That relationship, if properly documented and maintained, closes one of the most significant structural gaps in token-based securities platforms.

*Infrastructure pairing:* The compliance-engine package handles investor eligibility gates, transfer restriction enforcement, and KYC/KYB screening. The token-engine manages subscription and redemption lifecycle under the Reg D/Reg S framework. These are the operating controls that make the BD relationship meaningful rather than nominal.

**Gary Levi — Capital Formation and Partnerships**

Levi's focus on capital and partnerships brings LP and distribution network gravity. For a real-asset digital security to achieve price discovery and secondary market depth, it needs active institutional capital formation and LP relationships — not token exchange listings.

*Infrastructure pairing:* The LP and market structure infrastructure — OTC RFQ desk architecture, designated market maker framework, subscription/redemption operating model, and counterparty onboarding workflow — is what makes capital formation durable.

**Andre E. Haynes — Technology, AI, and Blockchain**

Haynes anchors the credibility of the technology stack. In a space littered with platforms that describe sophisticated infrastructure but deliver thin implementations, having a credible technology leader signals that what is described as infrastructure actually exists and operates.

*Infrastructure pairing:* The full-stack issuer operating system — 10 packages, 27 pages/routes, PostgreSQL schema, IPFS proof layer, stablecoin settlement rails — is the technical execution behind the credibility signal.

---

## PART II — INFRASTRUCTURE STORY

### The Operating System That Backs Every Claim

The Dignity institutional platform has 10 operational packages, each responsible for a specific domain of the RWA issuance lifecycle.

---

### @dignity/token-engine

**Function:** Subscription processing, issuance lifecycle, and redemption execution.

**What it does:**
- Validates investor eligibility before subscription confirmation
- Routes compliance checks before any token event
- Creates signed token issuance records with full investor, amount, and program metadata
- Manages redemption requests through the full approval and settlement lifecycle
- Enforces status gates: SUBMITTED → PENDING_KYC → PENDING_FUNDS → APPROVED → SETTLED

**Why it matters:** Without automated lifecycle enforcement, a compliance failure is not a matter of if — it is a matter of when. Manual review does not scale. The token-engine is the control point.

---

### @dignity/compliance-engine

**Function:** KYC/KYB status management, jurisdiction rules, sanctions screening, transfer approval.

**What it does:**
- Evaluates investor jurisdiction against regulatory rules
- Tracks KYC/KYB record lifecycle (NOT_STARTED → IN_PROGRESS → PENDING_REVIEW → APPROVED)
- Screens for sanctions hits against investor wallets and profiles
- Enforces accreditation checks before subscription eligibility
- Records compliance events for audit purposes

**Why it matters:** The compliance engine is the gatekeeper between narrative ("we do KYC") and proof ("we enforce KYC through a controlled, logged, auditable system").

---

### @dignity/reserve-registry

**Function:** Reserve asset tracking, lot management, valuation, custody records, and NAV calculation.

**What it does:**
- Tracks reserve assets by type, quantity, and location
- Records reserve lot granularity (specific holdings)
- Manages valuation snapshots with price-per-unit and effective date
- Links custody records to custodians with transfer-in/transfer-out audit trail
- Calculates NAV per token based on reserve value and circulating supply
- Records coverage snapshots for public proof display

**Why it matters:** "Backed by reserves" is a claim. The reserve registry is the operating proof.

---

### @dignity/attestation

**Function:** Reserve attestation workflow, evidence document management, IPFS-ready proof anchoring.

**What it does:**
- Creates attestation records linking attestors to specific reserve states
- Tracks evidences attached to each attestation (engineering reports, legal opinions, audit letters)
- Manages attestation status lifecycle (DRAFT → SUBMITTED → VERIFIED)
- Generates ProofAnchor records with data hashes for onchain or IPFS publishing
- Supports attestation supersession and revocation

**Why it matters:** An attestation system that stores signed, timestamped, hash-anchored records is categorically different from a PDF you post on a website.

---

### @dignity/treasury

**Function:** Treasury account management, movement recording, and reconciliation.

**What it does:**
- Maintains segregated treasury accounts by type: RESERVE, OPERATING, ESCROW, MARKET_MAKING, REDEMPTION_POOL, FEE_COLLECTION
- Records every treasury movement with type, amount, currency, and timestamp
- Manages fiat settlement records linked to subscriptions and redemptions
- Runs reconciliation cycles and records discrepancy reports

**Why it matters:** Segregated treasury accounts with a full movement ledger is a compliance requirement, not a feature.

---

### @dignity/stablecoin-rails *(new)*

**Function:** USDC and USDT settlement adapters, wallet routing, deposit instruction generation, reconciliation hooks.

**What it does:**
- Wraps Circle APIs for USDC on-chain deposit monitoring and payment confirmation
- Wraps Tether for USDT monitoring across EVM and Tron rails
- Routes settlement instructions to correct chain/wallet
- Generates deposit instructions for investors
- Hooks into treasury movement recording on confirmation
- Provides admin monitoring dashboard for rail health and pending settlements

**Why it matters:** Stablecoin rails accelerate settlement, extend global investor reach, and enable T+0 OTC settlement. They are also the foundation for a broader institutional payment and treasury infrastructure.

---

### @dignity/market-ops

**Function:** NAV management, venue health monitoring, LP operations, OTC RFQ desk.

**What it does:**
- Maintains NAV history with effective dates and methodology notes
- Tracks venue health scores across trading venues
- Manages market maker inventory allocations and spread policies
- Records quote snapshots for pricing audit
- Handles OTC RFQ lifecycle: REQUEST → QUOTED → ACCEPTED → SETTLED
- Monitors for pricing anomalies and circuit breaker events

**Why it matters:** Secondary market integrity requires operational infrastructure, not just a listing.

---

### @dignity/audit

**Function:** Immutable audit event log with hash chain integrity.

**What it does:**
- Records every material action across all platform modules
- Generates hash chains linking each event to the previous event
- Enforces actor/target/action/category taxonomy
- Supports compliance review queries by actor, category, time range
- Cannot be retroactively modified without breaking the hash chain

**Why it matters:** An audit trail is a legal requirement. A hash-chained audit trail is an integrity proof.

---

### @dignity/analytics

**Function:** Investment flow analytics, redemption analytics, NAV trend tracking.

**What it does:**
- Aggregates subscription metrics by program and time window
- Tracks redemption patterns by status and investor profile
- Monitors NAV trend data with moving average calculation
- Supports governance reporting and investor analytics

**Why it matters:** Monthly reporting to investors and regulators requires structured data — not ad hoc queries.

---

### @dignity/documents

**Function:** Disclosure document management, policy file tracking, alert management.

**What it does:**
- Manages disclosure versions by slug with publication status
- Tracks policy files by category with active/archived lifecycle
- Maintains system alerts with severity, source, and resolution tracking

**Why it matters:** Disclosure management is a securities law requirement. Managing it in a controlled system with version history is the difference between compliance and exposure.

---

## PART III — THE COMBINED STORY

The board composition is not a collection of individuals. It is a map of the institutional RWA issuance domain.

```
Capital Markets + Distribution  →  David Weild IV + William Heyn
Market Structure + Supervision  →  Daniel Sweet
Reserve + Mining Engineering    →  Miguel Barahona
Capital Formation + LP          →  Gary Levi
Technology + Blockchain         →  Andre Haynes
```

Every domain they represent has a corresponding infrastructure module in the operating system.

The presentation message is:

> **"We did not build a website with a whitepaper. We built an operating system with a compliance-forward legal structure and a board that covers every domain required to run it properly."**

---

*Document Version: 1.0 — April 2026*  
*Classification: Confidential — Board Use*
