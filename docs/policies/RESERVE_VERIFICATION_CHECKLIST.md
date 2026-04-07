# Dignity Platform — Reserve Verification Checklist

**Version:** 0.1-DRAFT | **Owner:** Treasury Manager + Compliance Officer  
**Frequency:** Monthly (by 5th business day of each month)  
**Scope:** All reserve assets backing DIGau token issuance

---

## Overview

This checklist establishes the monthly process for verifying that the Dignity reserve pool is complete, accurately valued, and properly documented. Results feed directly into the Investor Monthly Report and the IPFS proof anchor submission.

---

## Part 1 — Token Supply Reconciliation

Run the following from the platform admin panel or directly via Prisma query:

- [ ] Retrieve total DIGau tokens outstanding (minted – burned)
- [ ] Retrieve total subscriptions processed this period
- [ ] Retrieve total redemptions processed this period
- [ ] **Verify:** Opening balance + subscriptions – redemptions = closing balance
- [ ] Discrepancy threshold: $0 (any discrepancy requires immediate escalation)

| Metric | Value |
|--------|-------|
| Opening token supply | _____ DIGau |
| Subscriptions (tokens minted) | _____ DIGau |
| Redemptions (tokens burned) | _____ DIGau |
| **Closing token supply** | **_____ DIGau** |
| Ledger-confirmed supply | _____ DIGau |
| **Discrepancy** | **$_____ / _____ tokens** |

---

## Part 2 — Physical Gold Reserve Verification

- [ ] Obtain monthly custodian statement (PDF + digital)
  - Custodian: _________________________
  - Statement date: _______
- [ ] Confirm gold quantity: _____ troy ounces
- [ ] Confirm gold purity / assay (standard: ≥ .995 fine)
- [ ] Spot price used for valuation: $_____ / oz (source: LBMA fix on _____)
- [ ] Total gold value: $_____ USD
- [ ] Insurance coverage confirmed current: [ ] Yes — expires _______ | [ ] Lapsed — ACTION REQUIRED
- [ ] Custodian confirmation letter on file: [ ] Yes | [ ] No — request immediately
- [ ] Third-party assay / audit (required annually — note last date): _______

---

## Part 3 — Mining Property Valuation

- [ ] Confirmed current book value from accounting: $_____ USD
- [ ] Method: [ ] Cost basis  [ ] Appraised value (appraisal date: _______)
- [ ] Mining rights / permits status: [ ] Current  [ ] Renewal pending (date: _______)
- [ ] Title / deed confirmed unencumbered: [ ] Yes  [ ] Lien exists — describe: ___________
- [ ] Independent appraisal (required annually): Last date: _______  Next due: _______
- [ ] Insurance on mining property: [ ] Current — expires _______ | [ ] Lapsed — ACTION REQUIRED

---

## Part 4 — Stablecoin Rail Balance Verification

For each active rail, confirm on-chain balance via SettlementEngine / ReconciliationService:

| Rail | Asset | Chain | Platform Ledger | On-Chain Balance | Discrepancy |
|------|-------|-------|----------------|-----------------|-------------|
| Circle | USDC | Ethereum | $_____ | $_____ | $_____ |
| Circle | USDC | Polygon | $_____ | $_____ | $_____ |
| Circle | USDC | Base | $_____ | $_____ | $_____ |
| Tether | USDT | Ethereum | $_____ | $_____ | $_____ |
| Tether | USDT | Polygon | $_____ | $_____ | $_____ |

- [ ] Sum of on-chain balances reconciled to platform treasury ledger
- [ ] ReconciliationService run: `{ discrepancies: [] }` — [ ] CLEAN  [ ] DISCREPANCIES (escalate)
- [ ] Circle API account balance confirmed matches on-chain: [ ] Yes | [ ] No

---

## Part 5 — Operating Cash Reserve

- [ ] Bank statement obtained (as of last business day of month)
  - Bank: _________________________
  - Account: *** (last 4 digits)
- [ ] Balance: $_____ USD
- [ ] Confirm no unexpected outflows > $10,000 without corresponding AuditEvent
- [ ] Operating runway at current burn: _____ months

---

## Part 6 — Total NAV Calculation

| Asset Class | Value (USD) | % of Total |
|-------------|------------|------------|
| Physical Gold | $_____ | ___% |
| Mining Property | $_____ | ___% |
| Stablecoin Rails | $_____ | ___% |
| Operating Cash | $_____ | ___% |
| **Total NAV** | **$_____** | **100%** |

| Metric | Calculation | Value |
|--------|------------|-------|
| Tokens outstanding | (from Part 1) | _____ |
| **NAV per token** | Total NAV ÷ Tokens | **$_____** |
| Prior month NAV | | $_____ |
| **Month-over-month change** | | **_____% ** |

---

## Part 7 — Compliance Checks

- [ ] No reserve assets are encumbered (pledged, lent, or hypothecated) without board approval
- [ ] All reserve assets meet investment policy minimums:
  - Gold: ≥ X% of NAV (per investment policy)
  - Liquid reserves (stablecoins + cash): ≥ X% of outstanding redemption requests
- [ ] Regulatory capital compliance checked (if applicable)
- [ ] Any reserve change > 5% month-over-month: documented reason + board notification

---

## Part 8 — IPFS Proof Anchoring

- [ ] Assemble proof bundle:
  - Custodian letter (PDF)
  - On-chain balance screenshots / API exports
  - Reconciliation report export
  - NAV calculation spreadsheet
- [ ] Upload bundle to IPFS via ProofAnchor module
- [ ] Record CID: `ipfs://___________________________`
- [ ] Log `AuditEvent: TREASURY_RESERVE_VERIFIED` with `proofCid`
- [ ] Publish CID on `/disclosures` page (or mark as "Pending" until confirmed)

---

## Part 9 — Sign-offs

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Treasury Manager | | | |
| Compliance Officer | | | |
| External Accountant (quarterly) | | | |
| Board Notification Sent | CEO | | |

---

**Verification record retained for:** 10 years  
**Escalation:** Any discrepancy in Parts 1, 2, or 4 → immediate notification to CEO + outside counsel (potential regulatory reporting obligation)
