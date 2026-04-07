# DIGNITY GLOBAL — LP AND INSTITUTIONAL STRATEGY
### Confidential | April 2026

---

## PART I — WHAT CREATES FAKE LIQUIDITY

Understanding fake liquidity is prerequisite to building real liquidity architecture.

| Fake Liquidity Signal | Why It Fails Institutional Diligence |
|----------------------|--------------------------------------|
| Token listed on obscure DEX | Thin order books; 1 lot moves price 20%; no independent market maker |
| High 24h volume with thin depth | Bot wash trading; self-dealing volume; spoofing |
| "Market cap" derived from thin trade | Calculated from last trade × circulating supply — meaningless without real bid depth |
| "Liquidity pools" not backed by treasury | LP tokens owned by project treasury recycled as fake depth |
| No circuit breakers | Single large order destroys pricing reference |
| No LP or market maker agreements | No legal obligation to provide quotes; MM disappears when conditions worsen |
| Lock-up waiver promises | Violation of Reg D hold-period creates securities law exposure |
| No independent NAV reference | Price is whatever the last thin trade says, not asset value |

**Definition:** Any "liquidity" that could not survive a $500K redemption request in under 5 business days without breaking the price reference is not institutional liquidity.

---

## PART II — WHAT CREATES REAL LIQUIDITY

### 2.1 The Five Components of Real Institutional Liquidity

**Component 1 — Asset-Anchored NAV**
- NAV per token calculated from reserve valuation divided by circulating supply
- Valuation updated on defined cadence (daily, weekly, or monthly per disclosure)
- NAV methodology disclosed and independently evaluated
- Premium/discount to NAV tracked and reported
- NAV is the primary pricing reference, not secondary market trading

**Component 2 — Treasury-Seeded Inventory**
- Issuer treasury pre-funds a designated market making wallet
- MM uses inventory to provide two-sided quotes within defined spread policy
- Inventory reload policy defined (trigger level, approval, timeline)
- Inventory reports included in monthly treasury reporting

**Component 3 — Designated Market Maker Agreements**
- Written agreement between issuer and designated MM
- Defines: spread obligation, inventory minimum, quote frequency, reporting cadence
- Circuit breaker carve-outs defined (market disruption events)
- Fee structure and performance metrics documented
- At least one primary MM; secondary MM desirable

**Component 4 — OTC / RFQ Desk**
- For blocks > $100K, bilateral RFQ is more appropriate than order book
- RFQ format: investor or counterparty requests a quote; desk responds with bid/ask
- Quote valid for defined window (e.g., 15 minutes)
- Acceptance triggers formal OTC trade confirmation
- Settlement in USDC/USDT T+0 or wire T+1
- OTC trades reported in NAV reference and LP reporting

**Component 5 — Institutional Data Room**
- Fund diligence starts with data room access, not secondary market trading
- Data room contains: reserve reports, legal opinions, board resolutions, financial statements, insurance certificates, compliance policy docs, audit letter, subscription agmt template
- Updated quarterly minimum
- NDA-gated access with investor verification

---

## PART III — THE SUBSCRIPTION / REDEMPTION OPERATING MODEL

### 3.1 Subscription Flow

```
Investor Interest
       ↓
Investor Portal — create profile, submit subscription request
       ↓
KYC/KYB Screening — compliance-engine gate
       ↓
Accreditation Verification — Reg D / Reg S eligibility gate
       ↓
OFAC / Wallet Screening — compliance gate
       ↓
BD Review and Approval — Tritaurian Capital workflow
       ↓
Subscription Agreement Execution — digital or wet signature
       ↓
Funding — USDC / USDT / Wire ACH
       ↓
Stablecoin-Rails Deposit Confirmation — real-time monitoring
       ↓
Treasury Movement Record — subscription receipt credit
       ↓
Token Issuance — token-engine mints / credits
       ↓
Transfer Restriction Lock — Reg D hold-period enforcement
       ↓
Investor Confirmation and Document Receipt
```

**SLA targets:**
- KYC decision: 1–3 business days
- BD review: 1–2 business days
- Settlement: 1 business day from confirmed funds receipt
- Token credit: Same day as settlement confirmation

### 3.2 Redemption Flow

```
Redemption Request — investor portal
       ↓
Compliance Review — transfer restrictions check, hold period check
       ↓
BD Approval
       ↓
Treasury Approval — sufficiency of funds check
       ↓
Token Burn / Debit Authorization
       ↓
Fiat / Stablecoin Settlement — USDC/USDT or wire
       ↓
Treasury Movement Record — redemption payment debit
       ↓
Investor Confirmation
```

**SLA targets:**
- Redemption approval: 2–5 business days from request
- Settlement: T+3 from approval (wire) or T+0 (USDC/USDT if facility exists)
- Redemption gates: issuer may apply quarterly redemption caps per disclosure

### 3.3 Redemption Gates and Liquidity Policy

| Gate Type | Trigger | Action |
|-----------|---------|--------|
| Daily redemption cap | Request exceeds 2% of float per day | Queue excess to next window |
| Monthly cap | Aggregate redemptions exceed 10% of NAV | Pro-rata allocation |
| Suspension | Material adverse event, regulatory action | Board resolution required, investor notice |
| Hold-period gate | Reg D 6-month hold not expired | Automatic rejection with explanation |

---

## PART IV — LP AND MARKET MAKER FRAMEWORK

### 4.1 Market Maker Onboarding Requirements

| Requirement | Standard |
|-------------|---------|
| Entity type | Registered broker-dealer or equivalent; ISDA-documented for derivatives |
| Minimum inventory | Negotiated; typically $500K–$2M in DIGau equivalent |
| Spread obligation | Bid/ask ≤ defined basis points (e.g., 200bp max) during normal markets |
| Quote frequency | Firm quotes available during defined trading hours |
| Reporting | Daily position report; monthly performance report to issuer |
| Circuit breaker carve-outs | Defined triggers: extraordinary volatility, regulatory halt, market disruption |
| Termination | 30-day notice with inventory wind-down protocol |

### 4.2 Venue Scorecard Framework

Each secondary market venue (exchange, ATS, OTC venue) is scored on:

| Factor | Weight | Measurement |
|--------|--------|------------|
| Regulatory status | 30% | Registered ATS, FINRA member, or international equivalent |
| Liquidity depth | 20% | Average bid depth per day |
| Spread performance | 20% | Average bid/ask spread vs. benchmark |
| Settlement time | 15% | Average settlement cycle |
| Counterparty quality | 15% | Institutional vs. retail mix |

**Minimum score for approved venue: 65 / 100**

### 4.3 LP Reporting Package (Monthly)

Contents:
1. NAV per token — actual vs. prior month
2. Premium/discount to NAV — daily chart
3. Secondary market volume — total token units traded
4. Market maker inventory report — opening/closing positions
5. OTC RFQ summary — number of inquiries, quotes, executed trades
6. Redemption summary — total requests, approved, settled, queued
7. Subscription summary — total received, approved, settled
8. Treasury balance summary — reserve, operating, MM pool, escrow
9. Anomaly events — circuit breaker triggers, pricing anomalies
10. Compliance summary — KYC decisions, sanctions reviews

---

## PART V — WHAT FUNDS ACTUALLY NEED TO SEE

### 5.1 Investment Committee Checklist

Before an institutional fund allocates:

| Item | Why Required |
|------|-------------|
| Legal opinion — offering exemption | Fund counsel requires this before allocation |
| Legal opinion — transfer restrictions | Required to verify fund's ability to sell/redeem |
| Audited reserve report | Independent verification of backing asset |
| Insurance summary | D&O, cyber minimum for fiduciary confidence |
| Custody description | Key management, segregation, custodian identity |
| Redemption mechanics | Fund needs to model exit scenarios |
| Liquidity policy | Gate structure, caps, suspension rights |
| Governance | Board composition, decision authorities |
| AML/KYC policy | Fund compliance officer requires AML documentation |
| Financial statements | Annual or quarterly financials on the issuer entity |

### 5.2 Fund Types and Their Specific Requirements

| Fund Type | Key Focus Areas |
|-----------|----------------|
| Family office | Simpler structure preferred; strong board credibility; NDA data room |
| Credit fund | Reserve quality; title; lien priority; default and recovery analysis |
| Real asset fund | Mining disclosure; commodity price risk; operational credibility |
| Digital asset fund | On-chain proof; stablecoin settlement; smart contract audit |
| Multi-strategy fund | Full institutional package; legal opinions non-negotiable |

---

## PART VI — THE COUNTERPARTY ONBOARDING FLOW

```
Counterparty Interest
       ↓
NDA Execution → Data Room Access Granted
       ↓
Initial Review (2–4 weeks)
       ↓
Q&A Period — 10–25 standard questions + legal
       ↓
Site Visit / Management Meeting (if applicable)
       ↓
Investment Committee Submission
       ↓
Legal Review — subscription docs, legal opinions
       ↓
Compliance Review — AML/KYC on fund entity
       ↓
Investment Commitment
       ↓
Subscription Agreement Execution
       ↓
Capital Transfer and Token Issuance
       ↓
Ongoing Reporting (monthly LP reports)
```

---

## PART VII — INFRASTRUCTURE VS. MARKETING

| Marketing Approach | Infrastructure Approach |
|-------------------|------------------------|
| "Highly liquid token" | Published NAV + designated MM with executed agreement |
| "Backed by $X million in gold" | Reserve registry + independent attestation + IPFS proof |
| "Institutional grade" | Compliance scorecard ≥ 70, legal opinions on file, D&O confirmed |
| "Ready for fund allocation" | Data room operational, fund diligence checklist closed |
| "Secondary market available" | OTC RFQ desk operational, venue scorecard maintained |
| "Fully compliant" | Compliance scorecard ≥ 85, audited, transfer agent confirmed |

**The institutional close happens when the data room, LP agreement, legal opinions, and reserve proof are real — not when the marketing deck says the right words.**

---

*Document Version: 1.0 — April 2026*  
*Classification: Confidential — Board and Capital Markets Use*
