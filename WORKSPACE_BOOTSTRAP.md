# WORKSPACE BOOTSTRAP — Dignity Institutional Platform

This document records the complete bootstrap state for this workspace.

## Workspace Identity

- **Name**: dignity-institutional-platform
- **Package namespace**: @dignity/*
- **Docker project**: dignity-local
- **Database**: dignity_institutional (PostgreSQL)
- **Redis prefix**: dignity:
- **Core domain**: DIGAU / Dignity — reserve-backed institutional digital security

## Isolation Confirmation

This workspace is **fully isolated** from:
- `sovereign-assets-platform` (existing @sov/* monorepo, port 3000, DB sovereign_assets)
- `USDF-rebuild` (stablecoin system)
- `UnyKorn-X402-aws` (x402 payment network, port varies)
- Apostle Chain (port 7332)
- ClawBot stack (ports 8089, 8099–8104)
- Finn AI (port 7700)
- Any other running local services

## Port Assignments

| Service    | Port | Purpose                        |
|------------|------|-------------------------------|
| web        | 3300 | Next.js full-stack app        |
| worker     | 3301 | Background job process        |
| postgres   | 5442 | dignity_institutional DB      |
| redis      | 6382 | Cache + job queues            |
| hardhat    | 8646 | Local EVM chain for contracts |

## Environment Files

- `.env.example` — template, committed, no secrets
- `.env.local.example` — local dev template, committed  
- `.env.local` — actual secrets, gitignored, never committed

## Bootstrap Steps Completed

- [x] Directory tree created
- [x] package.json initialized (@dignity namespace)
- [x] pnpm-workspace.yaml configured
- [x] turbo.json configured
- [x] tsconfig.json configured
- [x] .nvmrc set to Node 20
- [x] .editorconfig set
- [x] .gitignore set
- [ ] pnpm install
- [ ] Prisma schema generated
- [ ] First migration
- [ ] Seed data loaded
- [ ] Next.js dev server confirmed on port 3300

## First Run Commands

```powershell
cd C:\Users\Kevan\dignity-institutional-platform
pnpm install
pnpm db:generate
pnpm db:push
pnpm db:seed
pnpm dev
```
