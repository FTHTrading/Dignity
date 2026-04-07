# Dignity Platform — Approval Workflows

**Version:** 0.1-DRAFT | **Owner:** Chief Compliance Officer

---

## 1. Investor Subscription Approval

```
INVESTOR submits subscription intent
        │
        ▼
[IR Portal] Subscription form captured
    - Amount (USD)
    - Accreditation attestation (Reg D 506(b))
    - Source of funds declaration
        │
        ▼
[KYC/AML Queue] COMPLIANCE_OFFICER reviews
    - Identity verification (Persona / Jumio vendor)
    - OFAC / PEP / sanctions screen
    - Source of funds plausibility check
    SLA: 2 business days
        │
    ┌───┴───────────┐
   PASS            FAIL
    │               │
    │           [REJECTED] → investor notified, funds returned T+3
    │
    ▼
[Investment Committee] TREASURY_MANAGER + COMPLIANCE_OFFICER dual-approve
    - Subscription size > $250,000 → IC approval required
    - Subscription size ≤ $250,000 → IR + Compliance unilateral
    SLA: 1 business day
        │
        ▼
[Settlement] TREASURY_MANAGER initiates deposit instruction
    - Stablecoin rail: USDC/USDT deposit address issued by DepositInstructionService
    - Wire: ABA/SWIFT coordinates issued
        │
        ▼
[Confirmation] Rail monitors confirm receipt
    - DIGau tokens minted to investor wallet at confirmed NAV
    - AuditEvent: INVESTOR_SUBSCRIBED logged
        │
        ▼
[Investor Portal] Position updated; confirmation email sent
```

**Required AuditEvents:**
- `INVESTOR_KYC_SUBMITTED`
- `INVESTOR_KYC_APPROVED` / `INVESTOR_KYC_REJECTED`
- `INVESTOR_SUBSCRIPTION_APPROVED`
- `INVESTOR_SUBSCRIBED`

---

## 2. Investor Redemption Approval

```
INVESTOR submits redemption request (portal)
    - Token quantity
    - Preferred settlement rail + address
    - Reason (optional)
        │
        ▼
[Liquidity Check] TREASURY_MANAGER reviews
    - Available stablecoin rail balance vs. redemption amount
    - Outstanding redemption queue depth
    SLA: 1 business day
        │
    ┌───┴──────────────────┐
 LIQUID                 ILLIQUID
    │                      │
    │                  [QUEUED] → investor notified of delay (max 5 business days)
    │                      │
    │               [GATE INVOKED if > 10% fund NAV in 30d window]
    │
    ▼
[Compliance Review] COMPLIANCE_OFFICER verifies no hold
    - No outstanding SAR / investigation flag on investor
    - Redemption doesn't trigger AML reporting threshold ($10K cash-equivalent)
    SLA: same day if no flags
        │
        ▼
[Settlement Execution] TREASURY_MANAGER executes
    - SettlementEngine routes to appropriate stablecoin rail
    - AuditEvent: INVESTOR_REDEEMED logged
        │
        ▼
[Investor Portal] Position updated; settlement confirmation sent
```

**Required AuditEvents:**
- `INVESTOR_REDEMPTION_REQUESTED`
- `INVESTOR_REDEMPTION_APPROVED`
- `INVESTOR_REDEEMED`
- `INVESTOR_REDEMPTION_GATED` (if applicable)

---

## 3. Treasury Wire Authorization

```
Request initiated by TREASURY_MANAGER
    - Purpose: MM reload / operating expense / reserve rebalance
    - Amount + destination + supporting documentation
        │
        ▼
[Compliance Sign-off] COMPLIANCE_OFFICER
    - Not required for intra-entity moves < $50,000
    - Required for all external wires
    SLA: 4 hours
        │
        ▼
[CEO/Chairman Co-sign] required for wires > $500,000
    SLA: same business day
        │
        ▼
[Bank / Rail Execution]
    - Domestic wire: same-day settlement
    - International wire: T+1 to T+2
    - Stablecoin: on-chain confirmation within 1 block
        │
        ▼
[Reconciliation] TREASURY_MANAGER confirms receipt
    AuditEvent: TREASURY_WIRE_EXECUTED logged
```

---

## 4. MM / LP Onboarding Approval

```
LP submits onboarding package (see LP_ONBOARDING_CHECKLIST.md)
        │
        ▼
[Legal Review] Counsel reviews ISDA / MDA / MSA draft
    SLA: 5 business days
        │
        ▼
[Compliance Review] COMPLIANCE_OFFICER
    - Entity KYB (Know Your Business)
    - Beneficial ownership (25% threshold)
    - Sanctions screen
    SLA: 3 business days
        │
        ▼
[IC Approval] CEO + Compliance dual-approve
        │
        ▼
[System Provisioning] MARKET_OPS creates LP_COUNTERPARTY user
    - MM inventory caps configured
    - OTC quote permissions enabled
    AuditEvent: LP_ONBOARDED logged
```

---

## 5. Approval SLA Summary

| Workflow | Standard SLA | Escalation |
|----------|-------------|------------|
| KYC/AML review | 2 business days | Compliance supervisor |
| Subscription IC | 1 business day | CEO |
| Redemption liquidity | 1 business day | Treasury + CEO |
| Treasury wire (external) | Same day (< $500K) | Chairman co-sign (≥ $500K) |
| LP onboarding | 8 business days total | Waivable only by CEO |

---

*Deviations from these workflows must be documented in writing and approved by the Compliance Officer.*
