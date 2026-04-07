# Dignity Platform — Audit Event Taxonomy

**Version:** 0.1-DRAFT | **Owner:** Engineering + Compliance

This document defines every `AuditEvent` category, action, and required field used in `@dignity/audit`.

---

## 1. Event Structure

```typescript
interface AuditEvent {
  id: string;              // CUID
  occurredAt: Date;
  actorId: string | null;  // null = system-initiated
  actorRole: UserRole | "SYSTEM";
  action: AuditAction;     // see taxonomy below
  resourceType: string;    // e.g. "investor", "settlement", "proof"
  resourceId: string;      // primary key of affected resource
  metadata: JsonObject;    // action-specific detail
  ipAddress: string | null;
  userAgent: string | null;
  severity: "INFO" | "WARN" | "CRITICAL";
  proofCid: string | null; // IPFS CID of proof bundle (if anchored)
}
```

---

## 2. Investor Events (`resourceType: "investor"`)

| Action | Severity | Required metadata fields |
|--------|----------|--------------------------|
| `INVESTOR_KYC_SUBMITTED` | INFO | `{ provider, submissionId }` |
| `INVESTOR_KYC_APPROVED` | INFO | `{ provider, approvedBy }` |
| `INVESTOR_KYC_REJECTED` | WARN | `{ provider, reason }` |
| `INVESTOR_SUBSCRIPTION_APPROVED` | INFO | `{ amountUsd, approvedBy, subscriptionId }` |
| `INVESTOR_SUBSCRIBED` | INFO | `{ amountUsd, tokenQty, navAtSubscription, rail, txHash? }` |
| `INVESTOR_REDEMPTION_REQUESTED` | INFO | `{ tokenQty, preferredRail, destinationAddress }` |
| `INVESTOR_REDEMPTION_APPROVED` | INFO | `{ amountUsd, approvedBy }` |
| `INVESTOR_REDEEMED` | INFO | `{ amountUsd, tokenQty, rail, txHash? }` |
| `INVESTOR_REDEMPTION_GATED` | WARN | `{ reason, gateExpiresAt }` |
| `INVESTOR_PORTAL_LOGIN` | INFO | `{ sessionId }` |
| `INVESTOR_PORTAL_LOGOUT` | INFO | `{ sessionId }` |
| `INVESTOR_DOCUMENT_DOWNLOADED` | INFO | `{ documentType, documentId }` |

---

## 3. Compliance Events (`resourceType: "compliance"`)

| Action | Severity | Required metadata fields |
|--------|----------|--------------------------|
| `COMPLIANCE_SAR_FILED` | CRITICAL | `{ filingRef, filingType, regulatoryBody }` |
| `COMPLIANCE_CTR_FILED` | CRITICAL | `{ filingRef, amountUsd }` |
| `COMPLIANCE_SANCTIONS_HIT` | CRITICAL | `{ list, matchScore, investorId }` |
| `COMPLIANCE_SANCTIONS_CLEARED` | WARN | `{ list, reviewedBy }` |
| `COMPLIANCE_AML_FLAG_RAISED` | WARN | `{ triggeredBy, rule, flagId }` |
| `COMPLIANCE_AML_FLAG_RESOLVED` | WARN | `{ resolution, resolvedBy }` |
| `COMPLIANCE_INVESTOR_SUITABILITY_REVIEWED` | INFO | `{ outcome, reviewedBy }` |
| `COMPLIANCE_POLICY_UPDATED` | INFO | `{ policyName, previousVersion, newVersion }` |
| `COMPLIANCE_REGULATORY_REPORT_SUBMITTED` | INFO | `{ reportType, period, submittedTo }` |

---

## 4. Treasury Events (`resourceType: "settlement" | "treasury"`)

| Action | Severity | Required metadata fields |
|--------|----------|--------------------------|
| `TREASURY_WIRE_INITIATED` | INFO | `{ amountUsd, destination, purpose, initiatedBy }` |
| `TREASURY_WIRE_EXECUTED` | INFO | `{ amountUsd, rail, txRef, confirmedBy }` |
| `TREASURY_WIRE_FAILED` | WARN | `{ amountUsd, failureReason }` |
| `TREASURY_RESERVE_VERIFIED` | INFO | `{ reportedNAV, verifiedByAccounting, proofCid? }` |
| `TREASURY_RESERVE_VARIANCE_DETECTED` | WARN | `{ expected, actual, variancePct }` |
| `SETTLEMENT_INITIATED` | INFO | `{ asset, amountRaw, chain, direction }` |
| `SETTLEMENT_CONFIRMED` | INFO | `{ txHash, blockNumber, chain }` |
| `SETTLEMENT_FAILED` | WARN | `{ reason, retryCount }` |
| `STABLECOIN_DEPOSIT_RECEIVED` | INFO | `{ asset, amountRaw, chain, fromAddress, depositId }` |
| `STABLECOIN_REDEMPTION_SENT` | INFO | `{ asset, amountRaw, chain, toAddress }` |
| `MM_RELOAD_EXECUTED` | INFO | `{ mmId, asset, amountRaw, chain }` |

---

## 5. Market Operations Events (`resourceType: "market_ops" | "lp"`)

| Action | Severity | Required metadata fields |
|--------|----------|--------------------------|
| `LP_ONBOARDED` | INFO | `{ entityName, mmId, approviedBy }` |
| `LP_OFFBOARDED` | WARN | `{ entityName, mmId, reason }` |
| `OTC_QUOTE_CREATED` | INFO | `{ mmId, direction, tokenQty, limitPrice }` |
| `OTC_QUOTE_FILLED` | INFO | `{ mmId, direction, tokenQty, finalPrice, counterparty }` |
| `OTC_QUOTE_EXPIRED` | INFO | `{ mmId, quoteId }` |
| `CIRCUIT_BREAKER_TRIGGERED` | CRITICAL | `{ triggeredBy, reason, spread, threshold }` |
| `CIRCUIT_BREAKER_LIFTED` | WARN | `{ liftedBy, durationMinutes }` |
| `MM_INVENTORY_BELOW_THRESHOLD` | WARN | `{ mmId, asset, chain, current, threshold }` |
| `NAV_PRICE_ANOMALY_DETECTED` | WARN | `{ asset, expected, actual, deviationBps }` |

---

## 6. Admin / System Events (`resourceType: "admin" | "system"`)

| Action | Severity | Required metadata fields |
|--------|----------|--------------------------|
| `ADMIN_ROLE_GRANTED` | WARN | `{ targetUserId, role, grantedBy }` |
| `ADMIN_ROLE_REVOKED` | WARN | `{ targetUserId, role, revokedBy, reason }` |
| `ADMIN_USER_CREATED` | INFO | `{ targetUserId, email, role }` |
| `ADMIN_USER_SUSPENDED` | WARN | `{ targetUserId, reason }` |
| `ADMIN_CONFIG_CHANGED` | WARN | `{ configKey, previousValue, newValue }` |
| `SYSTEM_STARTUP` | INFO | `{ version, environment }` |
| `SYSTEM_ERROR_CRITICAL` | CRITICAL | `{ error, stack?, context }` |
| `PROOF_ANCHOR_SUBMITTED` | INFO | `{ resourceType, resourceId, cid }` |
| `PROOF_ANCHOR_CONFIRMED` | INFO | `{ cid, chain, txHash }` |

---

## 7. Severity Definitions

| Severity | Description | Alerting |
|----------|-------------|---------|
| `INFO` | Normal operation | None — written to log DB only |
| `WARN` | Noteworthy deviation; requires monitoring | Daily digest to Compliance Officer |
| `CRITICAL` | Immediate human attention required | Real-time Slack/PagerDuty alert |

---

## 8. Retention Policy

| Category | Retention |
|----------|-----------|
| `INFO` events | 7 years (SEC Rule 17a-4) |
| `WARN` events | 7 years |
| `CRITICAL` events | 10 years + IPFS anchoring |
| Investor-specific events | Life of account + 7 years |

---

## 9. Implementation Status

| Item | Status |
|------|--------|
| `AuditEvent` Prisma model | ✅ Defined in schema |
| `@dignity/audit` package | ✅ Scaffolded |
| `logAuditEvent()` function | ⬜ Stub — needs DB write |
| CRITICAL alert hook | ⬜ Not started |
| IPFS proof anchoring | ⬜ Not started (spec in DIGNITY_IPFS_PROOF_ARCHITECTURE.md) |
| Retention purge job | ⬜ Not started |
