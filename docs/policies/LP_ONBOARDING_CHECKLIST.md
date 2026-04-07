# Dignity Platform — LP / MM Onboarding Checklist

**Version:** 0.1-DRAFT | **Owner:** Market Operations + Compliance  
**Use:** Complete for each new Market Maker or Liquidity Provider counterparty before system access is granted.

---

## Part 1 — Entity Identification

- [ ] Legal entity name (exactly as registered)
- [ ] Jurisdiction of formation
- [ ] Registration / LEI number
- [ ] Primary business address
- [ ] Trading desk contact (name, email, phone)
- [ ] Compliance contact (name, email, phone)
- [ ] List of authorized signatories with title and signature specimens
- [ ] Beneficial ownership disclosure — all owners ≥ 25% stake (name, %, jurisdiction)

---

## Part 2 — KYB (Know Your Business) Documentation

- [ ] Certificate of Good Standing (< 12 months old)
- [ ] Corporate formation documents (articles of incorporation, operating agreement)
- [ ] Proof of registered address (utility bill, bank statement, government letter — < 90 days)
- [ ] Government-issued ID for each beneficial owner ≥ 25% (passport or national ID)
- [ ] Proof of address for each beneficial owner ≥ 25%
- [ ] Audited financial statements (most recent 2 years, if available)
- [ ] AML/Compliance policy summary or attestation letter
- [ ] U.S. entities: IRS Form W-9; Non-U.S. entities: IRS Form W-8BEN-E

---

## Part 3 — Sanctions & Background Screening

- [ ] OFAC SDN screen — entity name + all beneficial owners (record result + date)
- [ ] PEP (Politically Exposed Person) screen — all beneficial owners
- [ ] FinCEN 314(a) cross-reference (if applicable)
- [ ] Adverse media search — entity + principals
- [ ] Regulatory action search (SEC EDGAR, FINRA BrokerCheck, CFTC)
- [ ] Results reviewed and sign-off by Compliance Officer

**Screen results:**
- Entity: [ ] CLEAR  [ ] FLAG — describe: ___________
- Principals: [ ] CLEAR  [ ] FLAG — describe: ___________
- Adverse media: [ ] CLEAR  [ ] FLAG — describe: ___________

---

## Part 4 — Legal Agreements

- [ ] Non-Disclosure Agreement (NDA) signed
- [ ] Market Making Agreement (MMA) or Master Digital Asset Agreement (MDAA) signed
  - Includes: inventory minimums, spread obligations, reporting requirements
- [ ] Fee schedule agreed and signed
- [ ] Circuit-breaker provisions acknowledged in writing
- [ ] Data handling / confidentiality annex (GDPR / CCPA if applicable)
- [ ] Legal review completed by outside counsel: [ ] YES [ ] WAIVED (document reason)

---

## Part 5 — Technical Onboarding

- [ ] LP/MM wallet addresses registered (per chain):
  - ETH: 0x___________
  - Polygon: 0x___________
  - Solana: ___________
  - (other): ___________
- [ ] API key issued for OTC quote board (role: `LP_COUNTERPARTY`)
- [ ] Stablecoin rail test transaction completed (confirm round-trip)
- [ ] MM inventory thresholds configured in platform:
  - USDC: min threshold $___________
  - USDT: min threshold $___________
- [ ] Circuit breaker notification webhook confirmed (MM receives alerts)

---

## Part 6 — Compliance Training

- [ ] Dignity platform policies provided (this checklist + ROLE_MATRIX, APPROVAL_WORKFLOWS)
- [ ] AML obligations acknowledged (suspicious activity reporting to Dignity compliance desk)
- [ ] LP counterparty agrees not to facilitate sanctioned-entity trades
- [ ] Attestation letter signed by authorized signatory

---

## Part 7 — Approval Sign-offs

| Step | Approver | Date | Signature |
|------|---------|------|-----------|
| KYB documentation complete | Compliance Officer | _______ | _______ |
| Sanctions screen — CLEAR | Compliance Officer | _______ | _______ |
| Legal agreements executed | Outside Counsel | _______ | _______ |
| Technical onboarding complete | MARKET_OPS | _______ | _______ |
| **Final IC Approval** | CEO + Compliance Officer | _______ | _______ |

---

## Part 8 — System Activation

- [ ] `LP_COUNTERPARTY` user created in platform by SUPER_ADMIN
- [ ] `AuditEvent: LP_ONBOARDED` logged with metadata: `{ entityName, mmId, approvedBy }`
- [ ] Welcome communication sent with portal credentials
- [ ] 30-day check-in scheduled (performance review after first month of activity)

---

**Onboarding record retained for:** Life of relationship + 7 years  
**Document custodian:** Compliance Officer
