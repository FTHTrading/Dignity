# Dignity Platform — Role & Permission Matrix

**Version:** 0.1-DRAFT | **Last Updated:** 2025-Q2 | **Owner:** Compliance Officer

---

## 1. Role Definitions

| Role Code | Display Name | Description |
|-----------|--------------|-------------|
| `SUPER_ADMIN` | Super Administrator | Full platform access, system configuration |
| `COMPLIANCE_OFFICER` | Compliance Officer | AML/KYC oversight, regulatory filing, investor approval |
| `TREASURY_MANAGER` | Treasury Manager | Reserve management, settlement approval, wire authorization |
| `MARKET_OPS` | Market Operations | MM/LP management, OTC desk, circuit breakers |
| `INVESTOR_RELATIONS` | Investor Relations | Investor onboarding, subscription/redemption processing |
| `AUDITOR` | External Auditor | Read-only access to all audit logs and financial data |
| `INVESTOR` | Accredited Investor | Self-service portal: portfolio view, redemption request |
| `LP_COUNTERPARTY` | LP/MM Counterparty | OTC quote board, MM inventory view |

---

## 2. Permission Registry

### 2.1 Treasury Permissions

| Permission | SUPER_ADMIN | COMPLIANCE_OFFICER | TREASURY_MANAGER | MARKET_OPS | AUDITOR |
|------------|:-----------:|:------------------:|:----------------:|:----------:|:-------:|
| `treasury:read` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `treasury:write` | ✅ | ❌ | ✅ | ❌ | ❌ |
| `treasury:approve_wire` | ✅ | ❌ | ✅ | ❌ | ❌ |
| `treasury:reserve_verify` | ✅ | ✅ | ✅ | ❌ | ✅ |

### 2.2 Compliance Permissions

| Permission | SUPER_ADMIN | COMPLIANCE_OFFICER | TREASURY_MANAGER | AUDITOR |
|------------|:-----------:|:------------------:|:----------------:|:-------:|
| `compliance:read` | ✅ | ✅ | ✅ | ✅ |
| `compliance:write` | ✅ | ✅ | ❌ | ❌ |
| `compliance:kyc_approve` | ✅ | ✅ | ❌ | ❌ |
| `compliance:sar_file` | ✅ | ✅ | ❌ | ❌ |
| `compliance:investor_approve` | ✅ | ✅ | ❌ | ❌ |

### 2.3 Market Operations Permissions

| Permission | SUPER_ADMIN | COMPLIANCE_OFFICER | TREASURY_MANAGER | MARKET_OPS | LP_COUNTERPARTY |
|------------|:-----------:|:------------------:|:----------------:|:----------:|:---------------:|
| `market_ops:read` | ✅ | ✅ | ✅ | ✅ | ✅ (own) |
| `market_ops:write` | ✅ | ❌ | ❌ | ✅ | ❌ |
| `market_ops:circuit_breaker` | ✅ | ✅ | ❌ | ✅ | ❌ |
| `market_ops:otc_approve` | ✅ | ❌ | ✅ | ✅ | ❌ |

### 2.4 Investor Permissions

| Permission | SUPER_ADMIN | COMPLIANCE_OFFICER | INVESTOR_RELATIONS | AUDITOR | INVESTOR |
|------------|:-----------:|:------------------:|:-----------------:|:-------:|:--------:|
| `investor:read_own` | ✅ | ✅ | ✅ | ✅ | ✅ (own) |
| `investor:read_all` | ✅ | ✅ | ✅ | ✅ | ❌ |
| `investor:subscribe` | ✅ | ❌ | ✅ | ❌ | ✅ |
| `investor:redeem` | ✅ | ❌ | ✅ | ❌ | ✅ |
| `investor:onboard_approve` | ✅ | ✅ | ✅ | ❌ | ❌ |

### 2.5 Audit Permissions

| Permission | SUPER_ADMIN | COMPLIANCE_OFFICER | TREASURY_MANAGER | AUDITOR |
|------------|:-----------:|:------------------:|:----------------:|:-------:|
| `audit:read` | ✅ | ✅ | ✅ | ✅ |
| `audit:export` | ✅ | ✅ | ❌ | ✅ |
| `audit:purge` | ✅ | ❌ | ❌ | ❌ |

---

## 3. Segregation of Duties (SoD) Rules

Critical controls — enforced at the application layer:

| Rule | Description |
|------|-------------|
| **SoD-1** | `TREASURY_MANAGER` cannot approve investor subscriptions (prevents self-dealing) |
| **SoD-2** | `COMPLIANCE_OFFICER` cannot execute treasury wires (4-eyes on fund movement) |
| **SoD-3** | `INVESTOR` can only view own portfolio; no cross-investor data access |
| **SoD-4** | `AUDITOR` is strictly read-only; cannot modify any record |
| **SoD-5** | `MARKET_OPS` cannot approve its own OTC trades without a second approver |
| **SoD-6** | No single role can file a SAR and approve the related investor redemption simultaneously |

---

## 4. Role Assignment Workflows

### 4.1 Granting Elevated Roles
1. Request submitted to `COMPLIANCE_OFFICER` in writing (email + ticket)
2. Background check confirmed for `TREASURY_MANAGER` and above
3. `SUPER_ADMIN` creates user record with role assignment
4. `AuditEvent` logged: `ADMIN_ROLE_GRANTED` with actor + subject + role
5. New user receives encrypted credentials — never transmitted by same channel as role notice

### 4.2 Role Revocation
1. Immediate revocation on termination or role change (same-day, not next-cycle)
2. `AuditEvent` logged: `ADMIN_ROLE_REVOKED`
3. Active sessions invalidated via NextAuth session purge
4. Quarterly access review — all `SUPER_ADMIN` and `TREASURY_MANAGER` roles reviewed by `COMPLIANCE_OFFICER`

---

## 5. Implementation Status

| Control | Status |
|---------|--------|
| `hasPermission()` in `@dignity/auth` | ✅ Implemented |
| Role enforcement on all `/api/v1/admin/*` routes | ✅ Implemented |
| `INVESTOR` role — scoped portal pages | ✅ Implemented |
| SoD rule enforcement (application layer) | ⬜ Stub — needs code |
| Quarterly access review process | ⬜ Not started |
| Role assignment audit trail | ⬜ Partial — needs AuditEvent integration |

---

*This document is a living policy. Last reviewed: see version header. Next review: quarterly.*
