# Dignity Platform — Incident Response Plan (IRP)

**Version:** 0.1-DRAFT | **Owner:** Chief Compliance Officer + CTO  
**Effective:** Upon board adoption  
**Review Cycle:** Annually or after each incident

---

## 1. Scope

This IRP covers all security, operational, and compliance incidents affecting the Dignity institutional platform, including:
- Unauthorized access to investor data or platform systems
- Financial settlement failures or stablecoin rail disruptions
- Regulatory threshold breaches (AML/OFAC hits)
- Reserve asset discrepancies
- Market operations circuit-breaker events
- Third-party vendor failures (Circle, Tether, custodians, cloud)

---

## 2. Incident Severity Levels

| Level | Name | Description | Response SLA |
|-------|------|-------------|-------------|
| **P1** | Critical | Investor funds at risk, data breach, regulatory violation, exchange trading halted | 15 minutes |
| **P2** | High | Settlement rail degraded, KYC/AML system down, NAV calculation unavailable | 1 hour |
| **P3** | Medium | Single feature outage, non-critical vendor degradation, compliance process delay | 4 hours |
| **P4** | Low | Performance degradation, non-urgent configuration issue | Next business day |

---

## 3. Incident Response Phases

### Phase 1 — DETECT (0–15 min)

**Triggers:**
- `CRITICAL` AuditEvent fires → real-time alert to on-call
- `CIRCUIT_BREAKER_TRIGGERED` event
- Investor or counterparty reports anomaly
- Automated monitoring alert (PriceFeed anomaly detection, HealthMonitor degradation)
- Third-party vendor notifies of disruption

**Actions:**
1. On-call engineer acknowledges alert within 5 minutes
2. Preliminary severity classification (P1–P4)
3. Open incident ticket with timestamp
4. Notify incident commander (CTO for P1/P2; IR lead for P3/P4)

---

### Phase 2 — CONTAIN (15 min – 2 hrs)

**P1 Containment:**
- Activate circuit breaker if market-facing (MARKET_OPS)
- Suspend affected investor accounts if credentials compromised
- Isolate affected infrastructure segment (do not destroy — preserve forensics)
- Disable compromised API keys / stablecoin rail credentials via WalletRouter
- Engage Circle / Tether emergency lines if rail compromise suspected

**P2 Containment:**
- Activate fallback stablecoin rail (e.g., USDC polygon if USDC ethereum degraded)
- Queue settlement requests — do not fail; hold and retry
- Notify affected investors if UI-visible disruption > 15 min

**All Levels:**
- Log containment actions in incident ticket
- `AuditEvent` logged: `SYSTEM_ERROR_CRITICAL` with full context

---

### Phase 3 — ASSESS (1–4 hrs)

**Determine:**
1. Root cause (technical / vendor / human error / adversarial)
2. Scope of impact (# investors, $ at risk, data records affected)
3. Regulatory notification obligations (see §5 below)
4. Whether law enforcement notification required (SEC; FinCEN; FBI Cyber Division)

**Evidence Preservation:**
- IPFS-anchor all relevant AuditEvent bundles (proofCid recorded)
- Snapshot DB state at time of incident
- Preserve raw log files (do not rotate during active incident)

---

### Phase 4 — NOTIFY (within 72 hrs of confirmed P1)

**Internal:**
- Board of Directors: within 24 hours for P1
- Investors (if data or funds affected): written notice within 48 hours

**Regulatory:**
| Trigger | Body | Timeframe |
|---------|------|-----------|
| Data breach (PII / financial data) | SEC (if registered), FinCEN | 72 hours (EU GDPR equivalent); 30 days (SEC) |
| OFAC sanctions hit | OFAC | Within 10 business days |
| SAR trigger | FinCEN | 30 calendar days |
| Material operational disruption | SEC (once registered) | Prompt notification |

---

### Phase 5 — RECOVER (4 hrs – days)

**Technical Recovery:**
1. Apply fix / patch / configuration correction
2. Restore stablecoin rail (re-enable or switch provider)
3. Resume settlement queue processing (oldest first)
4. Verify reserve balances via ReconciliationService
5. Lift circuit breaker only after Compliance Officer confirmation

**Validation:**
- Full HealthMonitor pass: all rails GREEN
- ReconciliationService: net position = 0 discrepancies
- Typecheck + integration test suite passing on staging

**Communication:**
- Investor portal status banner: display resolution message
- LP/MM counterparties: direct message confirming operations normalized

---

### Phase 6 — POST-MORTEM (within 5 business days)

**Required deliverables:**
1. Written post-mortem document: timeline, root cause, impact, corrective actions
2. Updated runbooks / playbooks for similar future events
3. Any policy or code changes required (tracked as GitHub issues)
4. Board summary for P1 incidents
5. Lessons-learned session with engineering + compliance teams

**Document retention:** 10 years (all P1/P2 post-mortems)

---

## 4. On-Call Roster

| Role | Responsibility | Escalation Path |
|------|---------------|-----------------|
| On-Call Engineer | First responder, containment | → CTO (P1/P2) |
| CTO | Technical incident commander | → CEO (P1) |
| Compliance Officer | Regulatory assessment + notifications | → External Counsel (P1) |
| Investor Relations | Investor communication | → CEO (P1) |
| External Counsel | Legal review, regulatory filings | — |

---

## 5. Contact Directory

*(Fill in with actual contacts before going live)*

| Contact | Role | Method |
|---------|------|--------|
| [CTO Name] | Incident Commander | Mobile + Slack |
| [CCO Name] | Compliance | Mobile + encrypted email |
| [External Counsel] | Legal | Mobile (P1 only) |
| Circle Emergency | Rail vendor | support@circle.com (P1 line TBD) |
| FinCEN | Regulatory | fincen.gov/contact |

---

## 6. Implementation Status

| Item | Status |
|------|--------|
| AuditEvent CRITICAL alerting | ⬜ Not implemented |
| PagerDuty / Slack integration | ⬜ Not implemented |
| Circuit breaker automation | ⬜ Stub in market_ops adapter |
| Incident ticket system | ⬜ Not configured |
| On-call rotation | ⬜ Pending team hire |
| Regulatory contact directory | ⬜ Needs legal review |

---

*This plan must be tested via tabletop exercise before platform go-live.*
