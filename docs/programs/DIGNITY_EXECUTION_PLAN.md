# DIGNITY EXECUTION PLAN

## Order of Execution

### Step 1 — Environment & Workspace Isolation ✅
- Create `dignity-institutional-platform/` root
- Initialize package.json, turbo.json, tsconfig.json, pnpm-workspace.yaml
- Create .env.example, .env.local.example, docker-compose.local.yml
- Create bootstrap scripts
- Write isolation & planning docs

### Step 2 — Domain Schema & Packages
- Prisma schema: all Dignity domain models
- `@dignity/shared-types`: all enums and interfaces
- `@dignity/db`: Prisma client + seed
- `@dignity/auth`: session + role policy
- `@dignity/compliance-engine`: KYC/KYB, jurisdiction, transfer rules
- `@dignity/token-engine`: issuance, redemption, lifecycle state machine
- `@dignity/reserve-registry`: reserve assets, lots, valuations, NAV
- `@dignity/attestation`: evidence, proof anchors, signed documents
- `@dignity/treasury`: accounts, movements, reconciliation
- `@dignity/market-ops`: venues, MMs, OTC/RFQ, snapshots, circuit breakers
- `@dignity/audit`: append-only events, hash chain
- `@dignity/documents`: document registry
- `@dignity/analytics`: aggregated reporting
- `@dignity/ui`: shared React components

### Step 3 — Contract Suite
- CanonicalSecurityToken.sol
- IdentityRegistry.sol
- ComplianceRegistry.sol
- IssuanceController.sol
- RedemptionController.sol
- RoleManager.sol
- TimelockAdmin.sol
- ReserveProofAnchor.sol
- Deploy scripts + tests
- Contract governance docs

### Step 4 — API Layer
- Public routes: programs, tokens, proof, NAV, liquidity, disclosures, news
- Investor routes: profile, holdings, documents, subscriptions, redemptions, wallets
- Admin routes: dashboard, programs, investors, compliance, reserves, attestations, treasury, liquidity, venues, market-makers, RFQ, audit, policies
- Auth middleware, role checks, validation, audit logging

### Step 5 — Frontend: Layout + Public Site
- AppShell, PublicHeader, SidebarNav, TopHeader
- Design system: obsidian/graphite/gold palette, Tailwind tokens
- Homepage (/)
- About (/about)
- Token (/token)
- Newsroom (/newsroom)
- Legal (/legal)
- Risk (/risk)
- Contact (/contact)

### Step 6 — Proof Center
- /proof-center (reserve summary)
- /proof-center/reserves (reserve asset registry)
- /proof-center/attestations (attestation timeline)
- /proof-center/disclosures (disclosure versions)
- ProofTimeline, ReserveCoverageWaterfall components
- AttestationDocumentViewer, DisclosureVersionViewer components

### Step 7 — Market Structure & Liquidity
- /market-structure
- /liquidity
- /liquidity/venues
- /liquidity/otc
- VenueHealthTable, NavVsMarketChart, LiquidityHealthCard
- PricingAnomalyPanel, CircuitBreakerBanner

### Step 8 — Issuer Back Office
- /issuer/admin (executive dashboard)
- /issuer/treasury
- /issuer/compliance
- /issuer/market-ops
- /issuer/audit

### Step 9 — Investor Portal
- /investors/dashboard
- /investors/documents
- /investors/notices

### Step 10 — Adapter Wiring
- Wire pages to package adapters
- Typed mock data behind adapters
- Demo mode separation

### Step 11 — Hardening
- Structured logging
- Health checks
- Rate limiting
- Audit hash chain
- Env validation at startup
- All runbooks completed

### Step 12 — Validation
- pnpm install ✓
- pnpm typecheck ✓
- pnpm build ✓
- LOCAL_BOOTSTRAP_COMPLETE.md
- VALIDATION_REPORT.md

## Risk Register

| Risk | Mitigation |
|------|-----------|
| Port collision | check-ports.ps1 script validates before startup |
| DB collision | Different DB name + port |
| Import confusion | TypeScript `@dignity/*` path aliases enforce namespace |
| Maya leaking in | Code review: no Maya-specific copy or logic anywhere in this workspace |
| Over-engineering | Keep packages thin — only real logic, no speculative generics |
