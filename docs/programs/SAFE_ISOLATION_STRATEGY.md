# SAFE ISOLATION STRATEGY

## Principle

The Dignity workspace must be completely safe to build, run, and iterate without risk of breaking any other system running on this machine or in any connected repository.

## Hard Separation Rules

### 1. File System Isolation
- Root: `C:\Users\Kevan\dignity-institutional-platform`
- Completely separate from:
  - `C:\Users\Kevan\sovereign-assets-platform` (existing repo, @sov/* namespace)
  - `C:\Users\Kevan\USDF-rebuild`
  - `C:\Users\Kevan\UnyKorn-X402-aws`
  - `C:\Users\Kevan\apostle-chain`
- No symlinks into other repos
- No `require('../../../other-repo')` patterns

### 2. Package Namespace Isolation
- All dignity packages use `@dignity/*` prefix
- Existing `@sov/*` packages are NOT imported
- Existing `@usdf/*` packages are NOT imported
- There are zero cross-repo package dependencies

### 3. Database Isolation
| Dimension | This Workspace | Other Repos |
|-----------|---------------|-------------|
| DB name | `dignity_institutional` | `sovereign_assets` / others |
| Port | 5442 | 5432 (existing) |
| User | postgres | postgres |
| Migrations | `packages/db/prisma/migrations/` | separate per repo |
| Seed data | `packages/db/src/seed.ts` | separate per repo |

### 4. Port Isolation
| Service | This Workspace | Existing Repo |
|---------|---------------|---------------|
| Web | 3300 | 3000 |
| Redis | 6382 | 6379 |
| Postgres | 5442 | 5432 |
| Hardhat | 8646 | N/A |

Other known occupied ports on this machine:
- 7332 — Apostle Chain
- 7700 — Finn AI
- 8089 — ClawBot runner
- 8099–8104 — ClawBot executors
- 8000 — Triton
- 11434 — Ollama
- 9010/9020 — Riva ASR/TTS

### 5. Environment Variable Isolation
- `.env.local` in this repo ONLY applies to this repo
- No shared `.env` files between repos
- `REDIS_KEY_PREFIX=dignity:` ensures no Redis key collision

### 6. Docker Isolation
- Docker project name: `dignity-local`
- All volume names prefixed: `dignity_postgres_data`, `dignity_redis_data`
- Container names: `dignity-postgres`, `dignity-redis`
- Prevents collision with other `docker compose` stacks

### 7. Git Isolation
- New git repo: `git init` in workspace root
- No remote pointing to existing repos
- Separate commit history
- Maya will be a separate git repo

## How to Verify Isolation

Run before starting services:
```powershell
.\scripts\check-ports.ps1
```

This script will fail with a clear error if any required port is already occupied.

## Breaking Changes Policy

Any change that could affect other repos MUST be blocked. Specifically:
- Never `pnpm link` across repos without explicit confirmation
- Never modify a shared package from inside this workspace
- Never point `DATABASE_URL` at an existing database
- Never push contracts to a network that other systems use without coordination

## Maya Boundary

When Maya is built:
1. Create `C:\Users\Kevan\maya-institutional-platform` (separate root)
2. Use `@maya/*` package namespace
3. Use port range 3400–3410 and DB `maya_institutional` on port 5445
4. Do NOT import `@dignity/*` packages directly
5. If shared logic is needed, run a formal extraction pass to `@platform/*`
