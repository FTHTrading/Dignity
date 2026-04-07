<div align="center">

<br/>

<img src="https://img.shields.io/badge/DIGNITY-Institutional%20Gold%20Securities-C9A84C?style=for-the-badge&labelColor=0d0d0f&color=C9A84C" alt="Dignity" />

<br/><br/>

[![Platform](https://img.shields.io/badge/Platform-Next.js%2015-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![Runtime](https://img.shields.io/badge/Edge%20Runtime-Cloudflare%20Workers-F48120?style=flat-square&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com)
[![Database](https://img.shields.io/badge/Database-PostgreSQL%20%2B%20Prisma-336791?style=flat-square&logo=postgresql&logoColor=white)](https://prisma.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Monorepo](https://img.shields.io/badge/Monorepo-Turborepo%20%2B%20pnpm-EF4444?style=flat-square&logo=turborepo&logoColor=white)](https://turbo.build)
[![License](https://img.shields.io/badge/License-Proprietary-6B7280?style=flat-square)](./LICENSE)
[![Status](https://img.shields.io/badge/Status-Production%20v1.0-22C55E?style=flat-square)]()

<br/>

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   DIGNITY — Institutional Gold-Backed Digital           │
│   Securities Operating Platform                         │
│                                                         │
│   Reserve-backed · Board-governed · Audit-chained       │
│   Four-eyes enforced · MCP agent-native                 │
│                                                         │
│   dignity.unykorn.org                                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Dignity is not a cryptocurrency project.**  
It is a regulated operating infrastructure for the issuance, management, and audit of gold-backed digital securities — built to institutional capital markets standards from first principles.

<br/>

[![Live Site](https://img.shields.io/badge/Live-dignity.unykorn.org-C9A84C?style=for-the-badge&labelColor=0d0d0f)](https://dignity.unykorn.org)
[![Broker-Dealer](https://img.shields.io/badge/BD%20Platform-brokerdealer.unykorn.org-1E40AF?style=for-the-badge&labelColor=0d0d0f)](https://brokerdealer.unykorn.org)
[![x402](https://img.shields.io/badge/x402%20Protocol-x402.unykorn.org-7C3AED?style=for-the-badge&labelColor=0d0d0f)](https://x402.unykorn.org)
[![FTH](https://img.shields.io/badge/FTH%20Infrastructure-super--s.pages.dev-059669?style=for-the-badge&labelColor=0d0d0f)](https://super-s.pages.dev)

</div>

---

## Table of Contents

- [What Is Dignity](#what-is-dignity)
- [Board of Directors](#board-of-directors)
- [Architecture Overview](#architecture-overview)
- [Monorepo Structure](#monorepo-structure)
  - [Apps](#apps)
  - [Packages — 15 Workspace Libraries](#packages--15-workspace-libraries)
- [Platform Capabilities](#platform-capabilities)
  - [Reserve Registry](#reserve-registry)
  - [Token Engine](#token-engine)
  - [Audit Chain](#audit-chain)
  - [Governance Controls](#governance-controls)
  - [Compliance Engine](#compliance-engine)
  - [Market Operations](#market-operations)
  - [MCP Agent Mesh](#mcp-agent-mesh)
- [Public Routes](#public-routes)
- [Tech Stack](#tech-stack)
- [Data Model](#data-model)
- [Documents](#institutional-documents)
- [Revenue Model](#revenue-model)
- [Deployment](#deployment)
- [Local Development](#local-development)
- [Ecosystem](#ecosystem)

---

## What Is Dignity

> **"Before, Dignity's institutional case was primarily strategic. Today, it is increasingly operational."**

Dignity solves the four failure modes of every prior tokenized gold initiative:

| Failure Mode | Prior Products | Dignity's Solution |
|---|---|---|
| **Opacity** | No real-time reserve visibility | SHA-256 hash-chain audit log, public proof endpoint |
| **No proof** | Marketing claims only | Coverage ratio enforced at API level — issuance blocked if breached |
| **Governance gaps** | No separation of duties | Four-eyes principle as system invariant — unbypassable at the API layer |
| **No compliance tooling** | Manual KYC processes | Full KYC/AML engine with Reg D/S accreditation, logged to audit chain |

The platform is designed and operated under the oversight of a distinguished board of directors and powered by the FTH Trading institutional infrastructure stack — the same stack backing 100+ production modules across 13 blockchains with 4 qualified custodians.

---

## Board of Directors

<table>
<tr>
<td width="50%" valign="top">

### 🏛 David Weild IV — Chairman
![Investment Banking](https://img.shields.io/badge/Investment%20Banking-C9A84C?style=flat-square&labelColor=0d0d0f)
![NASDAQ](https://img.shields.io/badge/Former%20VP%20NASDAQ-C9A84C?style=flat-square&labelColor=0d0d0f)
![JOBS Act](https://img.shields.io/badge/JOBS%20Act%20Architect-C9A84C?style=flat-square&labelColor=0d0d0f)

Former Vice Chairman of NASDAQ and widely recognized architect of the JOBS Act. Decades at the intersection of capital formation, regulatory policy, and public market architecture. Provides Dignity with strategic orientation grounded in the most consequential thinking available on institutional capital and emerging asset classes.

*Former Vice Chairman, NASDAQ · JOBS Act architect · Capital markets strategist*

</td>
<td width="50%" valign="top">

### ⚖️ Richard Allen Perkins — Director
![Legal](https://img.shields.io/badge/Legal%20%26%20Regulatory-3B82F6?style=flat-square&labelColor=0d0d0f)
![Securities Law](https://img.shields.io/badge/Securities%20Law-3B82F6?style=flat-square&labelColor=0d0d0f)

Securities law compliance, regulatory filing obligations, and legal opinion architecture. Directly supports the compliance engine, securities token framework, and legal opinion structure underpinning the platform's issuance program.

*Paired with: Compliance engine · Securities token engine · Legal opinion framework*

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 📈 Randy Rowe — Director
![Capital Markets](https://img.shields.io/badge/Capital%20Markets%20Operations-10B981?style=flat-square&labelColor=0d0d0f)
![Institutional Trading](https://img.shields.io/badge/Institutional%20Trading-10B981?style=flat-square&labelColor=0d0d0f)

Capital markets execution strategy, market maker coordination, OTC desk policy, and institutional liquidity framework. Paired with the market-ops package and exchange-adapter infrastructure governing trading operations.

*Paired with: Exchange adapters · Market-ops package · LP/MM governance*

</td>
<td width="50%" valign="top">

### 🖥 Todd Reiter — Director
![Technology](https://img.shields.io/badge/Technology%20%26%20Platform%20Governance-8B5CF6?style=flat-square&labelColor=0d0d0f)
![Infrastructure](https://img.shields.io/badge/Infrastructure%20Governance-8B5CF6?style=flat-square&labelColor=0d0d0f)

Platform architecture decisions, security posture, and proof architecture governance. Provides the technical credibility required for institutional diligence across all 14 platform packages.

*Paired with: All 14 platform packages · Audit trail · Proof architecture*

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 🔬 Dr. Michael Repass — Director
![Clinical Governance](https://img.shields.io/badge/Clinical%20%26%20Scientific%20Governance-EF4444?style=flat-square&labelColor=0d0d0f)
![Evidence Based](https://img.shields.io/badge/Evidence--Based%20Review-EF4444?style=flat-square&labelColor=0d0d0f)

Applies the evidence hierarchy of clinical governance to compliance and reserve verification — ensuring claims about platform performance meet the same standard of evidence demanded in clinical practice.

*Paired with: Compliance rigor model · Evidence-based disclosure*

</td>
<td width="50%" valign="top">

### ⛏ Dr. Dana Hardin — Director
![Scientific Review](https://img.shields.io/badge/Scientific%20%26%20Technical%20Review-F59E0B?style=flat-square&labelColor=0d0d0f)
![Reserve Verification](https://img.shields.io/badge/Reserve%20Verification-F59E0B?style=flat-square&labelColor=0d0d0f)

Scientific and technical review authority for reserve verification and mining disclosure governance. Positions the platform to interface with Qualified Person engagements required for S-K 1300 technical reporting on underlying gold reserve assets.

*Paired with: Reserve registry · Mining disclosure · ProofAnchor verification*

</td>
</tr>
<tr>
<td width="50%" valign="top" colspan="2">

### 🌿 Angeline Cardinal Bendle — Director
![Community Sovereignty](https://img.shields.io/badge/Community%20Sovereignty%20%26%20ESG-059669?style=flat-square&labelColor=0d0d0f)
![Indigenous Rights](https://img.shields.io/badge/Indigenous%20Rights-059669?style=flat-square&labelColor=0d0d0f)

Embeds cultural sovereignty principles in platform governance. Covers community relations, Indigenous rights considerations, and ESG-linked disclosures aligned with the platform's long-term social licence.

*Paired with: ESG reporting layer · Community stakeholder engagement · Impact disclosure*

</td>
</tr>
</table>

---

## Architecture Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│                         DIGNITY PLATFORM                             │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  Cloudflare Pages + Workers (Edge CDN / DDoS / TLS)            │ │
│  └──────────────────────┬──────────────────────────────────────────┘ │
│                         │                                            │
│  ┌──────────────────────▼──────────────────────────────────────────┐ │
│  │  Next.js 15 Web Application  (apps/web · port 3300)            │ │
│  │  ├─ 9 Public Routes  (/, /evolution, /platform, /leadership...) │ │
│  │  ├─ Admin Panel      (/admin/*  — NextAuth protected)          │ │
│  │  ├─ Investor Portal  (/investor/*  — session auth)             │ │
│  │  └─ API Proxy        (/api/agent/* → agent-backend)            │ │
│  └──────────────────────┬──────────────────────────────────────────┘ │
│                         │                                            │
│  ┌──────────────────────▼──────────────────────────────────────────┐ │
│  │  Fastify 5 Agent Backend  (apps/agent-backend · port 5100)     │ │
│  │  ├─ MCP Tool Registry  (21 tools · 7 domains)                  │ │
│  │  ├─ A2A Routing        (agent-to-agent message bus)            │ │
│  │  └─ x402 Stubs         (Phase IV — ATP payment rail)           │ │
│  └──────────────────────┬──────────────────────────────────────────┘ │
│                         │                                            │
│  ┌──────────────────────▼──────────────────────────────────────────┐ │
│  │  PostgreSQL + Prisma ORM  (port 5433)                          │ │
│  │  ├─ Operational data (reserves, tokens, investors, venues)     │ │
│  │  └─ Audit chain (SHA-256 hash-linked, append-only)             │ │
│  └─────────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Monorepo Structure

```
dignity-institutional-platform/
├── apps/
│   ├── web/                 # Next.js 15 — institutional UI + admin + investor portal
│   └── agent-backend/       # Fastify 5 — MCP tool mesh + A2A routing
├── packages/
│   ├── analytics/           # Coverage timelines, issuance summaries
│   ├── attestation/         # Proof anchoring, custodian attestation chains
│   ├── audit/               # SHA-256 hash-chain AuditEvent engine
│   ├── auth/                # NextAuth session management
│   ├── compliance-engine/   # KYC/AML, Reg D/S accreditation, SAR pipeline
│   ├── db/                  # Prisma schema, migrations, seed data
│   ├── documents/           # Institutional PDF generation (5 documents)
│   ├── exchange-adapters/   # Venue connectors, spread policy enforcement
│   ├── market-ops/          # Market maker governance, OTC desk controls
│   ├── reserve-registry/    # Reserve lots, coverage ratio, custodian management
│   ├── shared-types/        # TypeScript types shared across packages
│   ├── stablecoin-rails/    # USDC/USDT settlement rail integration
│   ├── token-engine/        # Mint, redeem, burn, transfer restriction
│   ├── treasury/            # Treasury operations, reserve reporting workflow
│   └── ui/                  # Design system — Tailwind + glass-panel components
├── contracts/               # Solidity/Hardhat security token contracts
├── docs/                    # Runbooks, policies, compliance programs
├── infra/                   # Docker, Cloudflare tunnel config
├── scripts/                 # Local bootstrap, port checks, env validation
├── turbo.json               # Turborepo build pipeline
└── pnpm-workspace.yaml      # pnpm workspace config
```

### Apps

| App | Framework | Port | Purpose |
|---|---|---|---|
| `apps/web` | Next.js 15 + OpenNext/CF | 3300 | Institutional UI, admin panel, investor portal, API routes |
| `apps/agent-backend` | Fastify 5 | 5100 | MCP tool service, A2A routing, x402 stub layer |

### Packages — 15 Workspace Libraries

| Package | Category | Description |
|---|---|---|
| ![audit](https://img.shields.io/badge/@dignity%2Faudit-critical-EF4444?style=flat-square) | Security | SHA-256 hash-chain AuditEvent engine — append-only, tamper-evident |
| ![compliance-engine](https://img.shields.io/badge/@dignity%2Fcompliance--engine-critical-EF4444?style=flat-square) | Compliance | KYC/AML, Reg D accreditation, sanctions screening, SAR pipeline |
| ![token-engine](https://img.shields.io/badge/@dignity%2Ftoken--engine-critical-EF4444?style=flat-square) | Issuance | Mint, redeem, burn, transfer restriction enforcement |
| ![reserve-registry](https://img.shields.io/badge/@dignity%2Freserve--registry-high-F59E0B?style=flat-square) | Reserve | Reserve lot management, coverage ratio, custodian attestation |
| ![treasury](https://img.shields.io/badge/@dignity%2Ftreasury-high-F59E0B?style=flat-square) | Operations | Treasury workflows, mint/redemption approval routing |
| ![market-ops](https://img.shields.io/badge/@dignity%2Fmarket--ops-high-F59E0B?style=flat-square) | Market | Market maker governance, venue controls, spread enforcement |
| ![exchange-adapters](https://img.shields.io/badge/@dignity%2Fexchange--adapters-high-F59E0B?style=flat-square) | Market | Venue connectors, ATS interface, trading venue integration |
| ![stablecoin-rails](https://img.shields.io/badge/@dignity%2Fstablecoin--rails-high-F59E0B?style=flat-square) | Settlement | USDC/USDT multi-chain payment rail |
| ![attestation](https://img.shields.io/badge/@dignity%2Fattestation-medium-3B82F6?style=flat-square) | Proof | Custodian attestation, proof anchor, S-K 1300 reporting |
| ![analytics](https://img.shields.io/badge/@dignity%2Fanalytics-medium-3B82F6?style=flat-square) | Reporting | Coverage timelines, issuance summaries, investor dashboards |
| ![documents](https://img.shields.io/badge/@dignity%2Fdocuments-medium-3B82F6?style=flat-square) | Documents | PDF generation — 5 institutional documents |
| ![auth](https://img.shields.io/badge/@dignity%2Fauth-medium-3B82F6?style=flat-square) | Auth | NextAuth session, role-based access, board/investor gates |
| ![db](https://img.shields.io/badge/@dignity%2Fdb-medium-3B82F6?style=flat-square) | Database | Prisma ORM, schema, migrations, seed scripts |
| ![ui](https://img.shields.io/badge/@dignity%2Fui-low-6B7280?style=flat-square) | Design | Tailwind design system, glass-panel components, gold palette |
| ![shared-types](https://img.shields.io/badge/@dignity%2Fshared--types-low-6B7280?style=flat-square) | Types | TypeScript types, Zod schemas shared across all packages |

---

## Platform Capabilities

### Reserve Registry

The reserve foundation of all token issuance. Every physical gold holding is registered as a **Reserve Lot** — a discrete, uniquely identified record with LBMA bar reference, custodian identity, USD valuation at spot, and cryptographic status.

```
Coverage Ratio = Σ(Reserve Lot Valuation) ÷ Σ(Outstanding Token Supply × Par Value)
Minimum threshold: 1.000  ·  Target buffer: +5%  ·  Revaluation: Daily
```

| Parameter | Value |
|---|---|
| Minimum coverage ratio | **1.000** (100%) |
| Coverage buffer target | **+5%** above minimum |
| Revaluation frequency | **Daily** (spot feed) |
| Custodian attestation | **Monthly** |
| New issuance gate | **Blocked** if post-mint coverage < 1.000 |
| Lot States | `ACTIVE` · `PENDING` · `RETIRED` |

### Token Engine

```
Mint Flow:
Treasury Officer submits mint request
        ↓
System verifies post-mint coverage ≥ 1.000
        ↓
Board Director approves (separation of duties enforced at API level)
        ↓
Tokens minted → logged to audit chain
```

| Token Parameter | Specification |
|---|---|
| Denomination | 1 DIGN = 1 troy ounce equivalent |
| Fractional minimum | 0.001 troy oz |
| Backing requirement | 100% allocated gold |
| Issuance authority | Board + Treasury (dual approval) |
| Redemption right | Physical or cash at LBMA AM fix |
| Transfer restriction | KYC/AML-verified counterparties only |

### Audit Chain

Every write operation on the platform — reserve lot changes, token supply updates, compliance decisions, approval actions — is recorded as an immutable **AuditEvent** with:

- **Category + action** — typed, enumerated
- **Actor identity + role** — who performed the action
- **Before/after state** — full state diff
- **SHA-256 hash** — chained to the previous event

```
EventN.hash = SHA256(EventN.content + EventN-1.hash)
```

Any retroactive alteration breaks the chain and is immediately detectable by any verifier. The public proof endpoint at `/proof` exposes this chain to authorized investors and regulators without granting system access.

### Governance Controls

The **four-eyes principle** is a system invariant — not a policy. It cannot be disabled by any user, including board directors or system administrators.

| Action | Proposer | Approver | Expiry |
|---|---|---|---|
| Token Mint | Treasury Officer | Board Director | 72 hrs |
| Token Redemption | Treasury Officer | Board Director | 72 hrs |
| Venue Toggle | Market Ops | Board Director | 48 hrs |
| Reserve Report | Treasury Officer | Board Director | 120 hrs |
| Reserve Lot Addition | Treasury Officer | Board Director | 72 hrs |
| Investor Override | Compliance Officer | Board Director | 24 hrs |

> ⚠️ **The system checks at every approval that the approver's identity ≠ requestor's identity. There is no administrative override or emergency bypass.**

### Compliance Engine

| KYC Status | Permitted Actions |
|---|---|
| `PENDING` | None |
| `APPROVED` | Buy · Sell · Redeem |
| `FLAGGED` | Holds only — no new buys |
| `REJECTED` | Exit only — forced redemption |

- Individual investors: accredited status per Regulation D
- Institutional: QIB status per Rule 144A
- All checks logged to immutable audit chain
- Accreditation re-verified annually

### Market Operations

- Platform Spread Policy: maximum bid-ask spread, minimum market depth, circuit-breaker parameters
- Venue activation requires board approval (Venue Toggle workflow)
- Market maker agreements managed under the `@dignity/market-ops` package
- Exchange adapter registry interfaces with ATS partner infrastructure

### MCP Agent Mesh

Dignity is the **first institutional digital asset platform** to expose its operational state as a structured Model Context Protocol (MCP) tool catalog.

**21 tools across 7 domains:**

| Domain | Tools | Access Level |
|---|---|---|
| ![Audit](https://img.shields.io/badge/Audit-Read--Only-22C55E?style=flat-square) | `query_events` · `verify_chain` · `get_event` | Read-only |
| ![Reserve](https://img.shields.io/badge/Reserve-Mixed-3B82F6?style=flat-square) | `get_coverage` · `list_lots` · `get_report` | Mixed |
| ![Token](https://img.shields.io/badge/Token-Write%20%28approval%20req%27d%29-EF4444?style=flat-square) | `get_status` · `request_mint` · `request_redeem` | Write — approval required |
| ![Approval](https://img.shields.io/badge/Approval-Write%20%28sep.%20of%20duties%29-EF4444?style=flat-square) | `list_pending` · `approve` · `reject` | Write — sep. of duties |
| ![Compliance](https://img.shields.io/badge/Compliance-Mixed-F59E0B?style=flat-square) | `check_investor` · `list_flags` | Mixed |
| ![Market](https://img.shields.io/badge/Market-Mixed-F59E0B?style=flat-square) | `list_venues` · `toggle_venue` · `get_spread` | Mixed |
| ![Analytics](https://img.shields.io/badge/Analytics-Read--Only-22C55E?style=flat-square) | `coverage_timeline` · `issuance_summary` | Read-only |

**Six canonical agent personas** operate within the platform, each with a defined role and strict separation of duties position — mirroring the four-eyes principle of the human governance layer.

---

## Public Routes

| Route | Page | Purpose |
|---|---|---|
| `/` | Homepage | Platform overview · Ecosystem links · Board reference |
| `/evolution` | Evolution | From strategic buildout → validated operating environment |
| `/platform` | Platform | 14-package monorepo, approval workflows, reserve registry |
| `/leadership` | Leadership | Full board of directors with domain pairings |
| `/controls` | Controls | Four-eyes governance, approval workflows, audit chain design |
| `/proof` | Proof Center | Runtime-validated milestones, audit-chain integrity confirmation |
| `/fundability` | Fundability | Why operational validation improves institutional diligence posture |
| `/roadmap` | Roadmap | What is complete, what remains, Phase II–IV roadmap |
| `/contact` | Contact | Institutional inquiry, partnership engagement |
| `/documents` | Documents | 5 institutional PDF downloads |
| `/agent` | Agent Interface | MCP mesh status, agent tool catalog |

**Protected Routes:**
- `/admin/*` — Board-level admin panel (NextAuth required)
- `/investor/*` — Investor dashboard, subscribe, redeem, portfolio

---

## Tech Stack

<table>
<tr>
<td>

**Frontend**
- Next.js 15 (App Router)
- React 19
- Tailwind CSS 3.4
- Recharts (analytics)
- `@react-pdf/renderer` (documents)

</td>
<td>

**Backend**
- Fastify 5 (agent service)
- NextAuth 4 (session auth)
- Prisma ORM
- PostgreSQL 16
- Zod (validation)

</td>
<td>

**Infrastructure**
- Cloudflare Pages + Workers
- OpenNext/Cloudflare 1.18
- Wrangler 4.8
- Turborepo
- pnpm workspaces

</td>
<td>

**Security**
- SHA-256 hash-chain audit
- CSP + HSTS headers
- Parameterized queries (no raw SQL)
- Ed25519 signing (x402 layer)
- 4-eyes API enforcement

</td>
</tr>
</table>

---

## Data Model

Core entities in the Prisma schema:

```
ReserveLot          — Physical gold holdings (LBMA lot, custodian, valuation, status)
TokenSupply         — Outstanding token position and coverage calculation
AuditEvent          — Hash-chained immutable event log (every write operation)
ApprovalRequest     — Board approval workflow (pending, approved, rejected + expiry)
Investor            — KYC/AML records, accreditation status, position
TokenTransaction    — Mint, redeem, transfer records
ReserveReport       — Published coverage reports (DRAFT → PENDING → APPROVED)
Venue               — Trading venues with activation state and spread policy
MarketMaker         — LP/MM agreements with governance parameters
CustodianAttestation— Monthly custodian letters linked to reserve lots
```

---

## Institutional Documents

Five PDF documents generated at build time and served from `/docs/`:

| # | Document | ID | Classification |
|---|---|---|---|
| 1 | **Executive Summary** | DIG-ES-2026-001 | Confidential — QII Only |
| 2 | **Proof of Reserve Report** | DIG-POR-2026-001 | Confidential — QII Only |
| 3 | **Investor Prospectus & Token Economics** | DIG-IP-2026-001 | Confidential — QII Only |
| 4 | **Governance & Compliance Framework** | DIG-GCF-2026-001 | Confidential — QII Only |
| 5 | **Technology & Infrastructure Brief** | DIG-TB-2026-001 | Confidential — QII Only |

All documents use the Dignity design system: obsidian dark palette, gold accent, institutional typography.

---

## Revenue Model

| Stream | Type | Timing |
|---|---|---|
| Issuance Spread | 0.50% of notional | At mint |
| Annual Custody Fee | 0.20% p.a. on AUM | Quarterly |
| Redemption Fee | 0.25% (physical) | At redemption |
| Transfer Fee | 0.05% per trade | Per settlement |
| Compliance API | Subscription | Monthly |
| Analytics API | Subscription | Monthly |
| x402 Agent Micro-fees | Per-invocation ATP | **Phase IV** |

---

## Deployment

**Production:** [dignity.unykorn.org](https://dignity.unykorn.org) — Cloudflare Pages

```bash
# Build
pnpm --filter @dignity/web build

# OpenNext Cloudflare build
npx @opennextjs/cloudflare build

# Deploy to Cloudflare Pages
npx wrangler pages deploy .open-next \
  --project-name=dignity-institutional \
  --branch=main
```

**Environment Variables (Cloudflare Pages → Settings → Environment Variables):**

| Variable | Value |
|---|---|
| `DATABASE_URL` | PostgreSQL pooled connection string |
| `NEXTAUTH_URL` | `https://dignity.unykorn.org` |
| `NEXTAUTH_SECRET` | 32-byte base64 secret |
| `NODE_ENV` | `production` |

See [CLOUDFLARE_DEPLOY.md](./CLOUDFLARE_DEPLOY.md) for full deployment guide.

---

## Local Development

**Prerequisites:** Node.js 20+, pnpm 9+, PostgreSQL 16

```bash
# 1. Clone
git clone https://github.com/FTHTrading/Dignity.git
cd Dignity

# 2. Install dependencies
pnpm install

# 3. Environment setup
cp .env.local.example .env.local
# Fill in DATABASE_URL, NEXTAUTH_URL, NEXTAUTH_SECRET

# 4. Database setup
pnpm db:generate    # generate Prisma client
pnpm db:push        # push schema to your local DB
pnpm db:seed        # seed reference data (optional)

# 5. Start development
pnpm dev            # starts all apps via Turborepo

# Web app available at http://localhost:3300
# Agent backend available at http://localhost:5100
```

**Useful commands:**

```bash
pnpm build          # full monorepo build
pnpm typecheck      # TypeScript check across all packages
pnpm lint           # ESLint across all packages
pnpm db:studio      # Prisma Studio (DB browser)
pnpm check-ports    # verify ports 3300/5100/5433 are free
pnpm bootstrap      # full local environment bootstrap (PowerShell)
```

---

## Ecosystem

Dignity is one platform within a broader institutional infrastructure ecosystem:

| System | URL | Description |
|---|---|---|
| **UnyKorn Broker-Dealer Platform** | [brokerdealer.unykorn.org](https://brokerdealer.unykorn.org) | Full-stack BD infrastructure — 7 production layers, Fireblocks MPC, Rust engine, Reg D/S, 31 institutional docs |
| **x402 AI-to-AI Payment Protocol** | [x402.unykorn.org](https://x402.unykorn.org) | Machine-native HTTP 402 payment rail — Apostle Chain 7332, ATP, Ed25519, sub-second settlement |
| **FTH Trading Infrastructure Guide** | [super-s.pages.dev](https://super-s.pages.dev) | 100+ modules, 13 blockchains, 4 custodians, Genesis Protocol research engine |

---

## Phase Roadmap

| Phase | Description | Status |
|---|---|---|
| **Phase I** | Platform foundation — PostgreSQL, audit chain, Prisma schema | ✅ Complete |
| **Phase II** | MCP tool mesh — 21 tools, 6 agent personas, A2A routing | ✅ Active |
| **Phase III** | External agent JWT access, rate limiting, API gateway | 🔵 Planned |
| **Phase IV** | x402 ATP payment rail — per-tool micro-fees, agent billing | 🔵 Roadmap |

---

<div align="center">

---

```
DIGNITY INSTITUTIONAL PLATFORM
Reserve-backed · Board-governed · Audit-chained · Agent-native

Built for institutional capital markets.
Not startup standards — institutional standards.
```

[![Dignity](https://img.shields.io/badge/dignity.unykorn.org-Reference%20Overview%20%C2%B7%20Board%20%26%20Stakeholders-C9A84C?style=for-the-badge&labelColor=0d0d0f)](https://dignity.unykorn.org)

*This repository is proprietary. Content is shared for board and qualified institutional stakeholder reference. Not a public offering or solicitation.*

</div> — Institutional Platform

> A world-class reserve-backed digital security issuer operating system.  
> Precious metals. Institutional trust. Evidence-first claims.

---

## What This Is

**Dignity** is an institutional-grade digital asset issuer platform built for reserve-backed, compliance-first security token issuance. It is not a meme token, not a retail exchange, and not a promotional site. It is a production-grade capital-markets operating system.

## Architecture

```
dignity-institutional-platform/
├── apps/
│   └── web/               # Next.js 15 — public site + investor portal + issuer back office
├── packages/
│   ├── shared-types/      # Domain types, enums, interfaces
│   ├── db/                # Prisma schema + client (@dignity/db)
│   ├── auth/              # Session, role, access control
│   ├── compliance-engine/ # KYC/KYB, jurisdiction, transfer controls
│   ├── token-engine/      # Token lifecycle, issuance, redemption
│   ├── reserve-registry/  # Reserve assets, lots, valuations, NAV
│   ├── attestation/       # Evidence, proof-anchors, signed docs
│   ├── treasury/          # Accounts, movements, reconciliation
│   ├── market-ops/        # Venues, market-makers, snapshots, RFQ
│   ├── exchange-adapters/ # External venue/price feed connectors
│   ├── documents/         # Document registry, signing
│   ├── audit/             # Append-only audit trail, hash chain
│   ├── analytics/         # Reporting aggregates
│   └── ui/                # Shared React components
├── contracts/             # Solidity — security token contract suite
├── docs/                  # Runbooks, proof methodology, architecture
├── infra/                 # Docker compose, deployment configs
└── scripts/               # Bootstrap, port-check, env validation
```

## Ports (Dignity-specific — no collision with other workspaces)

| Service         | Port |
|-----------------|------|
| Web (Next.js)   | 3300 |
| PostgreSQL      | 5442 |
| Redis           | 6382 |
| Hardhat chain   | 8646 |
| Worker process  | 3301 |

## Quick Start

```powershell
# 1. Validate environment
pnpm run validate-env

# 2. Check for port conflicts
pnpm run check-ports

# 3. Bootstrap (installs deps, runs migrations, seeds demo data)
pnpm run bootstrap

# 4. Start development
pnpm dev
```

## Package Namespace

All internal packages use `@dignity/*` to avoid collision with the `@sov/*` namespace in the existing sovereign-assets-platform repo.

## Isolation Guarantee

This workspace uses:
- Separate `dignity_institutional` PostgreSQL database
- Separate Redis key prefix `dignity:`
- Separate Docker project name `dignity-local`
- Separate ports (3300, 5442, 6382)
- Separate `.env.local` (never shared with other repos)

## Maya Build Note

When the Maya track is ready, it will be implemented as a **separate parallel workspace** following the same isolation pattern. The `@dignity/*` packages will NOT be directly imported by Maya — a shared-core extraction pass will produce `@platform/*` packages if cross-program sharing is needed.

See [docs/programs/SAFE_ISOLATION_STRATEGY.md](docs/programs/SAFE_ISOLATION_STRATEGY.md) for boundaries.
