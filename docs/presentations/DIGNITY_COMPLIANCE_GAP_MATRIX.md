# DIGNITY GLOBAL — COMPLIANCE GAP MATRIX
### Confidential | April 2026

Scoring scale: 0 = not started, 25 = design only, 50 = system built / not validated, 75 = operational with gaps, 100 = audited and confirmed.

---

## DOMAIN 1 — SECURITIES LAW / OFFERING WORKFLOW

### Status: 35 / 100

| Element | Current State | Evidence Available | Evidence Missing | Priority |
|---------|--------------|-------------------|-----------------|----------|
| Offering exemption (Reg D) | Stated on public site | Public statement | Executed Form D, legal opinion | HIGH |
| Offering exemption (Reg S) | Stated on public site | Public statement | Legal opinion, offshore investor controls | HIGH |
| Subscription agreement template | Not public | — | Executed template, legal review | HIGH |
| Investor suitability criteria | Described in concept | Stated | Enforcement workflow, documented criteria | HIGH |
| Transfer restrictions | System enforces | System built | Transfer agent confirmation, legal opinion | HIGH |
| Resale restrictions (6-month Reg D hold) | System described | — | Enforcement proof, exception workflow | HIGH |
| Corporate actions workflow | System built | — | Legal opinion, tested workflow | MEDIUM |
| Disclosure acceptance tracking | System built | — | Audit log, retention policy | MEDIUM |
| Bad actor disqualification check | Not visible | — | Policy doc, implementation proof | HIGH |
| Integration with broker-dealer workflow | Described | Tritaurian Capital named | BD operating agreement depth | HIGH |

### System Module Coverage

- `@dignity/token-engine` — subscription/redemption lifecycle, status gates ✅
- `@dignity/compliance-engine` — transfer rules, jurisdiction rules ✅
- `@dignity/documents` — disclosure acceptance tracking ✅
- MISSING: Legal opinion package, Form D filing tracker

---

## DOMAIN 2 — BROKER-DEALER / DISTRIBUTION / TRANSFER AGENT

### Status: 30 / 100

| Element | Current State | Evidence Available | Evidence Missing | Priority |
|---------|--------------|-------------------|-----------------|----------|
| BD relationship | Tritaurian Capital named | Public reference | Operating agreement, supervision evidence | HIGH |
| Offering workflow handoff | Not documented | — | Written BD-issuer protocol | HIGH |
| Order intake controls | System built | — | BD review workflow | MEDIUM |
| Transfer agent designation | Not confirmed | — | Transfer agent agreement | HIGH |
| Securityholder registry | System built (investorProfile + subscriptionRequest) | — | TA confirmation, DTC eligibility if applicable | HIGH |
| Cap table integrity | System built | — | Reconciliation proof, TA sign-off | HIGH |
| Reissuance / freeze / recovery | Not built in current system | — | System build, policy, legal opinion | HIGH |
| Investor communications | Not built | — | System for material event notices | MEDIUM |
| AML program for BD | Not documented | — | BD AML policy, SAR procedures | HIGH |

### System Module Coverage

- `@dignity/token-engine` — registry approach ✅
- `@dignity/compliance-engine` — KYC gateway ✅
- MISSING: Transfer agent integration, freeze/recovery workflow, material event notification system

---

## DOMAIN 3 — KYC / KYB / AML / OFAC / SANCTIONS

### Status: 40 / 100

| Element | Current State | Evidence Available | Evidence Missing | Priority |
|---------|--------------|-------------------|-----------------|----------|
| CIP (Customer Identification Program) | System tracks KYC records | System built | Vendor contract, policy document | HIGH |
| KYB (business entity verification) | Not confirmed separate | — | KYB workflow, entity verification docs | HIGH |
| Accreditation verification | System built | — | Verification method, third-party confirmation | HIGH |
| Wallet screening | System described | — | Screening vendor, hit rate logs | HIGH |
| Transaction monitoring | Not visible | — | Monitoring rules engine, SAR workflow | HIGH |
| OFAC screening | Not confirmed | — | OFAC screening vendor, policy | HIGH |
| EDD (Enhanced Due Diligence) | Not visible | — | EDD trigger rules, case management | MEDIUM |
| Case management / escalations | Not visible | — | Case system, escalation policy | MEDIUM |
| Sanctions hit handling | Not visible | — | Hit response protocol, legal guidance | HIGH |
| Travel Rule compliance | Not visible | — | $3K threshold policy, VASP data sharing | MEDIUM |
| Periodic re-screening | System built (KYC lifecycle) | — | Re-screening schedule, enforcement | MEDIUM |

### System Module Coverage

- `@dignity/compliance-engine` — KYC record management, sanctions check records ✅
- `@dignity/audit` — compliance event logging ✅
- MISSING: Live screening vendor integration, SAR workflow, OFAC API connection, travel rule engine

---

## DOMAIN 4 — MINING / RESERVE DISCLOSURE

### Status: 25 / 100

*See also: DIGNITY_MINE_DISCLOSURE_AND_INSURANCE_MATRIX.md*

| Element | Current State | Evidence Available | Evidence Missing | Priority |
|---------|--------------|-------------------|-----------------|----------|
| NI 43-101 technical report | Referenced on site | Site reference | Full report, QP name, report date | HIGH |
| U.S. Reg S-K 1300 gap analysis | Not addressed | — | Legal/engineering memo | HIGH |
| Property title documentation | Referenced (UCC, deed of trust) | Concept | Title search, chain of title | HIGH |
| UCC lien filing confirmation | Referenced | Site mention | Filed UCC-1 numbers, state records | HIGH |
| Deed of trust confirmation | Referenced | Site mention | Executed deed, trustee identity | HIGH |
| Pledge documentation | Referenced | Site mention | Executed pledge agreement | HIGH |
| Reserve methodology disclosure | Not visible | — | Methodology document | HIGH |
| Environmental / permitting | Not addressed | — | Permit status, environmental baseline | MEDIUM |
| Production assumptions vs. actuals | Not visible | — | Production report | MEDIUM |
| Third-party engineering firm identification | Not public | — | Named QP/firm with credentials | HIGH |

### System Module Coverage

- `@dignity/reserve-registry` — asset/lot/valuation/custody tracking ✅
- `@dignity/attestation` — evidence documents + proof anchors ✅
- MISSING: NI 43-101 document ingestion, UCC lien tracker, S-K 1300 memo, title chain document

---

## DOMAIN 5 — TREASURY / CUSTODY / SETTLEMENT

### Status: 45 / 100

| Element | Current State | Evidence Available | Evidence Missing | Priority |
|---------|--------------|-------------------|-----------------|----------|
| Account segregation | System built (6 account types) | System built | Third-party custody confirmation | HIGH |
| Wallet custody model | Architecture described | — | Custodian agreement, key management policy | HIGH |
| Signer policy | Not formal | — | Written policy, multi-sig confirmation | HIGH |
| Hot/warm/cold wallet segregation | Not documented | — | Wallet topology document | MEDIUM |
| Stablecoin settlement | System being built | — | Live rail confirmation | MEDIUM |
| Fiat settlement | System built (FiatSettlement model) | — | Bank relationship, wire SLA | MEDIUM |
| Bank account confirmation | Not public | — | Bank name, account structure | HIGH |
| Reconciliation controls | System built | — | Reconciliation policy, audit sign-off | MEDIUM |
| Approval controls | Not formal | — | Approval matrix, multi-sig policy | HIGH |
| Emergency fund controls | Not documented | — | Emergency policy, circuit breaker | MEDIUM |

### System Module Coverage

- `@dignity/treasury` — accounts, movements, reconciliation ✅
- `@dignity/stablecoin-rails` — being built ✅
- MISSING: Custodian agreement, key management policy, bank confirmation, multi-sig setup documentation

---

## DOMAIN 6 — STABLECOIN / PAYMENT RAIL COMPLIANCE

### Status: 20 / 100

| Element | Current State | Evidence Available | Evidence Missing | Priority |
|---------|--------------|-------------------|-----------------|----------|
| USDC adapter | Being built | — | Live test confirmation | MEDIUM |
| USDT adapter | Being built | — | Live test confirmation | MEDIUM |
| Payment rail legal analysis | Not done | — | Legal memo on MSB/money transmission | HIGH |
| FinCEN/MSB analysis | Not done | — | Legal memo | HIGH |
| State money transmission licensing | Not assessed | — | State-by-state analysis | HIGH |
| OFAC screening for stablecoin flows | Not confirmed | — | Screening controls documentation | HIGH |
| Travel Rule for stablecoin ($3K+) | Not addressed | — | Policy, VASP data sharing plan | MEDIUM |
| AML transaction monitoring (USDC/USDT separately from DIGau) | Not done | — | Separate monitoring track | HIGH |
| GENIUS Act analysis | Not done | — | Legal analysis (DIGau ≠ payment stablecoin) | MEDIUM |

### System Module Coverage

- `@dignity/stablecoin-rails` — being built ✅
- MISSING: Legal memo, MSB analysis, state licensing exposure, OFAC integration on payment flows

---

## DOMAIN 7 — GOVERNANCE / AUDIT / RISK

### Status: 50 / 100

| Element | Current State | Evidence Available | Evidence Missing | Priority |
|---------|--------------|-------------------|-----------------|----------|
| Board approval workflow | Not built | — | Governance policy, resolution template | HIGH |
| Policy management | System built (PolicyFile model) | — | Policy approval workflow, version control | MEDIUM |
| Audit log | System built (AuditEvent with hash chain) | — | Retention policy, export capability | MEDIUM |
| Incident response plan | Not documented | — | Written IRP | HIGH |
| Cyber controls | Not documented | — | Security assessment, penetration test | HIGH |
| Access control policy | Not documented | — | RBAC matrix, access review schedule | HIGH |
| Change management | Not documented | — | Change control policy | MEDIUM |
| Periodic attestations | System built | — | Cadence policy, signatory list | MEDIUM |
| Risk committee | Not documented | — | Charter, meeting cadence | MEDIUM |

### System Module Coverage

- `@dignity/audit` — hash-chained audit events ✅
- `@dignity/documents` — policy file management ✅
- MISSING: Board resolution templates, IRP, RBAC policy document, change management policy

---

## DOMAIN 8 — INSURANCE / RISK TRANSFER

### Status: 10 / 100

*See also: DIGNITY_MINE_DISCLOSURE_AND_INSURANCE_MATRIX.md*

| Insurance Category | Confirmed | Partially Confirmed | Unconfirmed |
|-------------------|-----------|--------------------| ------------|
| Directors & Officers (D&O) | | | ✗ |
| Errors & Omissions (E&O) | | | ✗ |
| Cyber Liability | | | ✗ |
| Crime / Fidelity | | | ✗ |
| Specie (physical metal) | | | ✗ |
| Environmental Liability | | | ✗ |
| General Liability | | | ✗ |
| Surety / Reclamation Bonds | | | ✗ |
| Title / Legal Opinion | | ◑ (referenced) | |
| Reps & Warranties | | | ✗ |

**Action Required:** Minimum viable insurance package for institutional credibility: D&O + E&O + Cyber. Obtain policies or document why coverage is unavailable.

---

## DOMAIN 9 — LP / MARKET STRUCTURE

### Status: 30 / 100

| Element | Current State | Evidence Available | Evidence Missing | Priority |
|---------|--------------|-------------------|-----------------|----------|
| Subscription/redemption mechanics | System built | — | Executed workflow, tested flow | MEDIUM |
| OTC RFQ desk | Architecture built | — | Live desk, counterparty agreements | HIGH |
| Designated market makers | Architecture built | — | Executed MM agreement, live inventory | HIGH |
| Treasury-seeded inventory | Not confirmed | — | Treasury allocation decision | HIGH |
| NAV / reference pricing methodology | System built | — | Methodology disclosure, pricing vendor | MEDIUM |
| Premium / discount monitoring | Architecture built | — | Live monitoring, alert history | MEDIUM |
| Venue scorecards | System built | — | Live venue data | LOW |
| Circuit breakers | Architecture built | — | Policy, test history | MEDIUM |
| Anomaly monitoring | Architecture built | — | Live monitoring, alert history | MEDIUM |
| Monthly LP reporting | Not operational | — | Report template, sent example | HIGH |
| LP legal docs | Not confirmed | — | LP agreement template, executed example | HIGH |

### System Module Coverage

- `@dignity/market-ops` — venues, NAV, MM, OTC, circuit breakers ✅
- MISSING: Live LP agreement, executed MM agreement, OTC counterparty, live monitoring activation

---

## DOMAIN 10 — REPORTING / PROOF / IPFS

### Status: 35 / 100

| Element | Current State | Evidence Available | Evidence Missing | Priority |
|---------|--------------|-------------------|-----------------|----------|
| Monthly investor report | Not sent | — | Template, first report | HIGH |
| Monthly reserve report | Not sent | — | Template, first report | HIGH |
| Quarterly audit letter | Not on file | — | Audit relationship, first letter | HIGH |
| IPFS hash anchoring | System built (ProofAnchor) | — | Live CID examples | HIGH |
| Onchain anchor contract | Not deployed | — | Contract address | MEDIUM |
| Public proof center | System built | — | Live data, real CIDs | HIGH |
| Data room | Architecture described | — | Operational data room with real documents | HIGH |
| Real-time coverage gauge | System built | — | Live data connection | HIGH |

### System Module Coverage

- `@dignity/attestation` — ProofAnchor records ✅
- `apps/web/app/(public)/proof-center` — public UI ✅
- MISSING: IPFS integration (web3.storage, Pinata, or nft.storage), live data connections, first real attestation

---

## AGGREGATE SCORECARD

| Domain | Score | Weight | Weighted |
|--------|-------|--------|---------|
| Securities / Offering | 35 | 15% | 5.25 |
| KYC/KYB/AML/OFAC | 40 | 15% | 6.00 |
| Broker-Dealer / Transfer | 30 | 12% | 3.60 |
| Mining / Reserve Disclosure | 25 | 12% | 3.00 |
| Custody / Treasury | 45 | 12% | 5.40 |
| Stablecoin / Payment Rails | 20 | 5% | 1.00 |
| Governance / Audit | 50 | 10% | 5.00 |
| Insurance / Risk Transfer | 10 | 8% | 0.80 |
| LP / Market Structure | 30 | 6% | 1.80 |
| Reporting / Proof / IPFS | 35 | 5% | 1.75 |
| **TOTAL** | | **100%** | **33.6 / 100** |

### Milestone Thresholds

| Score | Status |
|-------|--------|
| 0–25 | Pre-institutional — narrative only |
| 26–50 | **Current: Early-operational — system built, gaps known** |
| 51–70 | Compliance-forward operational — suitable for qualified investor soft launch |
| 71–85 | Institutional-grade — suitable for full fund diligence |
| 86–100 | Fully compliant RWA — audited, insured, independent-agent confirmed |

---

*Document Version: 1.0 — April 2026*  
*Classification: Confidential — Board and Counsel Use*
