# DIGNITY WORKSPACE PLAN

## What We Are Building

**Dignity** is an institutional-grade digital asset issuer operating system for a reserve-backed precious-metals security token (DIGAU). This is not a meme token, not a retail exchange product, and not a promotional site. It is a compliance-first, evidence-first, treasury-grade capital-markets platform.

## Core Program Identity

- **Token**: DIGAU — a reserve-referenced digital security backed by precious metals
- **Issuer posture**: institutional, compliance-first, accredited-investor only
- **Liquidity model**: controlled OTC / RFQ / approved market-makers (no retail exchange theater)
- **Proof model**: evidence-first — attestation, reserve lots, signed documents, on-chain anchors
- **Investor model**: KYC/KYB, accreditation, allowlist-controlled transfers

## Phases

### Phase 1 — Workspace Isolation & Schema (Complete)
- New isolated workspace at `dignity-institutional-platform/`
- New package namespace `@dignity/*`
- New DB `dignity_institutional` on port 5442
- New Redis on port 6382
- New web on port 3300
- Prisma schema with full Dignity domain model
- All packages scaffolded with interfaces

### Phase 2 — Backend Packages (In Progress)
- `@dignity/shared-types` — enums, interfaces, domain types
- `@dignity/db` — Prisma client, migrations, seed
- `@dignity/auth` — sessions, roles, access control
- `@dignity/compliance-engine` — KYC/KYB, jurisdiction, transfer rules
- `@dignity/token-engine` — token lifecycle, issuance, redemption
- `@dignity/reserve-registry` — reserve assets, lots, valuations, NAV
- `@dignity/attestation` — evidence, proof-anchors, signed documents
- `@dignity/treasury` — accounts, movements, reconciliation
- `@dignity/market-ops` — venues, MMs, snapshots, RFQ, circuit breakers
- `@dignity/audit` — append-only audit trail, hash chain
- `@dignity/analytics` — reporting aggregates
- `@dignity/documents` — document registry

### Phase 3 — Contract Suite
- `CanonicalSecurityToken.sol` — compliance-aware ERC-1400
- `IdentityRegistry.sol` — investor allowlist
- `ComplianceRegistry.sol` — transfer restrictions
- `IssuanceController.sol` — controlled mint
- `RedemptionController.sol` — burn / redemption workflow
- `RoleManager.sol` — role-based admin
- `TimelockAdmin.sol` — governance timelock
- `ReserveProofAnchor.sol` — on-chain proof anchoring

### Phase 4 — API Layer
- All REST routes under `apps/web/src/app/api/v1/`
- Public, investor, admin, issuer route groups
- Auth middleware, role checks, audit logging

### Phase 5 — Frontend (Dignity-branded)
- Public site: `/`, `/about`, `/token`, `/proof-center`, `/market-structure`, `/liquidity`, `/newsroom`, `/legal`, `/risk`, `/contact`
- Issuer back office: `/issuer/admin`, `/issuer/treasury`, `/issuer/compliance`, `/issuer/market-ops`, `/issuer/audit`
- Investor portal: `/investors/dashboard`, `/investors/documents`, `/investors/notices`

## What Is Intentionally Deferred

| Item | Reason |
|------|--------|
| Maya track | Separate workspace — do not build here |
| Public exchange listing | Downstream of OTC/RFQ — not core |
| Retail investor flows | Outside Dignity scope (accredited only) |
| Multi-chain bridge | Future — single chain first |
| White-label SaaS | Future — Maya extraction pass |

## What Can Be Shared With Maya Later

After Dignity is stable, a **shared-core extraction pass** will produce:
- `@platform/shared-types` (from `@dignity/shared-types`)
- `@platform/auth` (from `@dignity/auth`)
- `@platform/audit` (from `@dignity/audit`)
- `@platform/ui` (from `@dignity/ui`)

Maya will be a **new repo** importing `@platform/*` packages, not directly depending on `@dignity/*`.

## What Must Remain Dignity-Specific

- DIGAU token identity, branding, copy
- Dignity-specific compliance rules
- Dignity contract addresses
- Dignity investor registry
- Dignity reserve registry
- Dignity treasury accounts
- Dignity-specific DB state
