# Dignity Platform — Fund Investment Due Diligence Checklist

**Version:** 0.1-DRAFT | **Owner:** Investor Relations + Investment Committee  
**Use:** Complete for each institutional investor (fund, family office, HNWI) before subscription approval.

---

## Part 1 — Investor Identification & KYC

### 1.1 Entity (Funds, Family Offices, Institutions)
- [ ] Full legal name of investing entity
- [ ] Jurisdiction of formation + registration number
- [ ] LEI (Legal Entity Identifier), if applicable
- [ ] Primary contact: name, title, email, phone
- [ ] Compliance officer contact
- [ ] Authorized signatory list with titles + specimen signatures
- [ ] Beneficial owner / UBO disclosure (≥ 25% ownership threshold)
- [ ] Organization chart (if complex structure: SPVs, feeder funds)

### 1.2 Individual Investors (HNWI / Direct)
- [ ] Full legal name (as on government ID)
- [ ] Date of birth
- [ ] Government-issued ID (passport preferred)
- [ ] Proof of address (< 90 days)
- [ ] SSN / Tax ID (Form W-9 for U.S.; W-8BEN for non-U.S.)

---

## Part 2 — Accreditation Verification (Reg D 506(b))

Investor must meet at least ONE of the following:

- [ ] **Income test:** $200K individual / $300K joint income in prior 2 years + reasonable expectation of same
  - Verified via: [ ] Tax returns  [ ] CPA letter  [ ] W-2s
- [ ] **Net worth test:** > $1M net worth excluding primary residence
  - Verified via: [ ] Bank/brokerage statements  [ ] CPA letter  [ ] Accountant attestation
- [ ] **Entity test:** All equity owners are accredited; OR entity > $5M assets + NOT formed to invest in Dignity
  - Verified via: [ ] organizational docs  [ ] financial statements
- [ ] **Knowledgeable employee** (if applicable to investment vehicle structure)

**Accreditation verified by:** [ ] IR Team  [ ] Third-party verifier (___________) **Date:** _______

---

## Part 3 — Suitability & Investment Objectives

- [ ] Investment objectives match product profile (long-term, illiquid digital asset, inflation hedge)
- [ ] Investor understands: DIGau is NOT redeemable for physical gold; it is backed by mining-stage assets
- [ ] Investor confirms understanding of lock-up / redemption gate policy
- [ ] Liquidity profile reviewed: what % of investor's total portfolio does this represent?
  - Dignity recommendation: ≤ 10% of investor's alternative allocation
- [ ] Risk tolerance questionnaire completed
- [ ] Investor confirms receipt and review of:
  - [ ] Private Placement Memorandum (PPM)
  - [ ] Subscription Agreement
  - [ ] Risk Factors disclosure
  - [ ] Compliance Posture Summary

---

## Part 4 — Source of Funds & AML

- [ ] Source of funds declared and documented (business income, investment returns, asset sale, inheritance)
- [ ] Source of wealth narrative (for investments > $500,000)
- [ ] OFAC SDN screen — investor entity + all UBOs (record result + date)
- [ ] PEP screen — all UBOs and controlling persons
- [ ] Adverse media search — entity + principals
- [ ] FinCEN 314(a) cross-reference (if applicable)
- [ ] Enhanced Due Diligence (EDD) if any flag identified:
  - EDD reviewer: ___________  EDD date: _______
  - EDD outcome: [ ] CLEARED  [ ] REJECTED

**Screen results:**
- Entity: [ ] CLEAR  [ ] FLAG — describe: ___________
- Principals: [ ] CLEAR  [ ] FLAG — describe: ___________

---

## Part 5 — Legal Agreements

- [ ] Subscription Agreement executed (all pages initialed, signature page signed)
- [ ] PPM acknowledged (investor confirms received + had opportunity to ask questions)
- [ ] Investor Representation Letter signed (accreditation + suitability self-certification)
- [ ] W-9 or W-8BEN-E on file
- [ ] FATCA / CRS certification (for non-U.S. entities)
- [ ] Data Privacy Notice acknowledged

---

## Part 6 — Investment Committee Review

| Threshold | Required Approvers |
|-----------|-------------------|
| ≤ $250,000 | IR Lead + Compliance Officer |
| $250,001 – $1,000,000 | IR Lead + Compliance Officer + Treasury Manager |
| > $1,000,000 | Full IC: CEO + Compliance Officer + Treasury Manager |

**IC Decision:**
- [ ] APPROVED — proceed to settlement
- [ ] APPROVED WITH CONDITIONS — describe: ___________
- [ ] REJECTED — reason: ___________

| Approver | Role | Date | Signature |
|---------|------|------|-----------|
| | IR Lead | | |
| | Compliance Officer | | |
| | Treasury Manager (if required) | | |
| | CEO (if required) | | |

---

## Part 7 — Subscription Settlement

- [ ] Deposit instruction issued to investor (via DepositInstructionService)
- [ ] Settlement rail confirmed: [ ] USDC / ETH  [ ] USDC / Polygon  [ ] USDT  [ ] Wire
- [ ] Funds received + confirmed by TREASURY_MANAGER
- [ ] DIGau tokens minted at confirmed NAV: _____ tokens at $_____ NAV
- [ ] `AuditEvent: INVESTOR_SUBSCRIBED` logged
- [ ] Investor portal position updated
- [ ] Confirmation communication sent to investor

---

## Part 8 — Ongoing Monitoring Triggers

Investor file must be re-reviewed if ANY of the following occur:
- [ ] Subsequent investment that pushes total > $1,000,000
- [ ] Quarterly OFAC/PEP re-screen (all active investors)
- [ ] Investor redemption request > 33% of their total position
- [ ] Investor requests change of settlement wallet / banking details
- [ ] Adverse media hit on investor post-onboarding

---

**Investor file retained for:** Life of investment + 7 years  
**Document custodian:** Compliance Officer
