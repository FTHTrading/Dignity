# Dignity System Topology
> "Where is the system and the site?"

This document is the authoritative map of every component, its local address,
its production address, and its relationship to the rest of the stack.

---

## Platform at a glance

```
                     ┌─────────────────────────────────────────┐
                     │         Cloudflare Edge (CDN/WAF)        │
                     │   dignity.unykorn.org   (Cloudflare Pages)│
                     └────────────────┬────────────────────────┘
                                      │ HTTPS
                     ┌────────────────▼────────────────────────┐
                     │         Next.js 15 Web App              │
                     │   apps/web   port 3300 (dev)            │
                     │   /api/agent/* proxy → agent-backend    │
                     └──────┬────────────────────┬────────────┘
                            │ Prisma             │ fetch proxy
              ┌─────────────▼──────────┐  ┌──────▼──────────────────┐
              │    PostgreSQL DB        │  │  @dignity/agent-backend  │
              │  localhost:5433 (dev)  │  │  apps/agent-backend      │
              │  Neon/Supabase (prod)  │  │  port 5100               │
              └────────────────────────┘  │  21 MCP tools / 7 domains│
                                          └──────┬───────────────────┘
                                                 │ Phase IV
                              ┌──────────────────▼─────────────────┐
                              │   x402.unykorn.org (facilitator)    │
                              │   Apostle Chain  port 7332          │
                              │   ATP asset  chain_id 7332          │
                              └────────────────────────────────────┘
```

---

## Component Directory

### 1. Web App — `apps/web`
| Property  | Dev                     | Production                          |
|-----------|-------------------------|-------------------------------------|
| URL       | `http://localhost:3300` | `https://dignity.unykorn.org`       |
| Deployer  | `pnpm dev`              | Cloudflare Pages (auto via push)    |
| Framework | Next.js 15.2.4          | Static export + SSR on Pages        |
| Config    | `apps/web/next.config.ts` | `infra/cloudflare/wrangler.toml`  |
| Notes     | 9 public routes + full admin panel at `/admin/*` |

**Public routes:**
```
/              Homepage
/evolution     Company narrative
/leadership    Team
/platform      Product overview
/controls      Internal controls + governance
/proof         Proof of reserve
/fundability   Investor fundability thesis
/agent         AI agent mesh + x402 roadmap  ← NEW
/roadmap       Product roadmap
/contact       Institutional inquiry form
```

**Admin routes (auth-gated):**
```
/admin                 Dashboard
/admin/reserve         Reserve lot management
/admin/token           Token supply management
/admin/approvals       Approval queue (four-eyes)
/admin/compliance      Investor KYC/AML
/admin/market          Venue + spread management
/admin/audit           Hash-chain audit log
/admin/analytics       Coverage + issuance reports
/admin/reports         Reserve report publishing
/admin/users           User management
/admin/settings        Platform settings
```

---

### 2. Agent Backend — `apps/agent-backend`
| Property  | Dev                     | Production (planned)                |
|-----------|-------------------------|-------------------------------------|
| URL       | `http://localhost:5100` | Fly.io / Cloudflare Worker          |
| Start     | `pnpm dev` in `apps/agent-backend` | `pnpm build && node dist/index.js`  |
| Framework | Fastify 4.x             | Same                                |
| DB        | `@dignity/db` (shared Prisma) | Same PostgreSQL as web app    |

**API endpoints:**
```
GET  /health                 Liveness + DB connectivity
GET  /mcp/status             MCP protocol info + x402 phase
GET  /tools                  Full 21-tool catalog (filter: ?domain=, ?readOnly=)
GET  /tools/:name            Single tool by name
POST /mcp/invoke             Execute a tool — { tool, input, agentId }
GET  /agents                 List registered agent personas
POST /agents/register        Register a new agent
GET  /agents/:id             Get agent + update lastSeenAt
POST /a2a/messages           Route a message between agents
GET  /a2a/messages?agentId=  Get inbox for an agent
```

**Next.js proxy:**
All `/api/agent/*` requests on the web app forward to `localhost:5100`.

---

### 3. Database — PostgreSQL
| Environment | Host                  | Port  | DB name   |
|-------------|-----------------------|-------|-----------|
| Dev         | `localhost`           | 5433  | `dignity` |
| Production  | Neon / Supabase       | 5432  | `dignity` |

**Env var:** `DATABASE_URL` in `apps/web/.env.local` and `apps/agent-backend/.env`

---

### 4. x402 Payment Rail *(Phase IV — not active)*
| Component            | URL                            | Status      |
|----------------------|--------------------------------|-------------|
| x402 Facilitator     | `https://x402.unykorn.org`     | Not deployed|
| Apostle Chain API    | `http://localhost:7332` (dev)  | Running     |
| Asset                | ATP (chain_id 7332)            | —           |
| Agent wallet source  | `C:\Users\Kevan\apostle-chain\` | —          |

**Tool costs in Phase III (current):** 0 ATP for all tools.
**Phase IV plan:** read tools stay free, write tools (mint, approve, toggle) metered in ATP.

---

### 5. UnyKorn AI Infrastructure *(adjacent — not part of dignity monorepo)*
Located at `C:\Users\Kevan\UnyKorn-X402-aws\`

| Service         | Port  | Description                              |
|-----------------|-------|------------------------------------------|
| Agent Gateway   | 4000  | PrismaClient + AgentRegistry + PolicyEngine |
| WebSocket       | 4010  | Real-time agent event stream             |
| A2A Router      | 4011  | Agent-to-agent message proxy             |
| MCP Hub         | 4020  | Fastify MCP server registry              |
| Rust Signer     | 4050  | Ed25519 signing service                  |
| ClawBot Runner  | 8089  | NVIDIA-first LLM execution               |
| Inference Router| 8100  | Triton→ONNX→Ollama load balancer         |
| Speech Router   | 8200  | Riva ASR+TTS NIM                         |
| Finn            | 7700  | Kevan's sovereign AI (v0.3.0)            |
| Ollama          | 11434 | qwen2.5:7b local inference               |
| Triton          | 8000  | GPU inference server (RTX 5090)          |

---

## Deployment: Where the site lives

### Current state
- **Production site**: `https://dignity.unykorn.org` (Cloudflare Pages)
- **CI/CD**: Push to `main` → GitHub Actions → `wrangler pages deploy`
- **Config**: `infra/cloudflare/wrangler.toml` + `CLOUDFLARE_DEPLOY.md`
- **Cloudflare account**: from `cloudflare-tokens.md` in user memory
- **Agent backend**: not yet deployed (runs only locally on port 5100)

### Recommended production stack for agent backend
Options (pick one):
1. **Fly.io** — `fly launch` from `apps/agent-backend/`, PostgreSQL add-on, `DATABASE_URL` set as secret
2. **Cloudflare Worker** — compile to Workers (no Fastify — would need Hono or native Workers fetch)
3. **Render.com** — Dockerfile deploy, managed PostgreSQL

---

## Monorepo Structure
```
dignity-institutional-platform/
├── apps/
│   ├── web/                  ← Next.js 15 web app
│   └── agent-backend/        ← Fastify MCP agent service  ← NEW
├── packages/
│   ├── db/                   ← @dignity/db (Prisma)
│   ├── audit/                ← @dignity/audit (SHA-256 hash-chain)
│   ├── shared-types/         ← @dignity/shared-types
│   ├── auth/                 ← @dignity/auth
│   ├── email/                ← @dignity/email
│   └── ui/                   ← @dignity/ui (Tailwind components)
├── infra/
│   └── cloudflare/
│       └── wrangler.toml
├── CLOUDFLARE_DEPLOY.md
└── SYSTEM_TOPOLOGY.md        ← this file
```

---

## Starting the full stack locally

```bash
# 1 — Install dependencies
pnpm install

# 2 — Start PostgreSQL (if not already running)
#     or set DATABASE_URL in each .env.local

# 3 — Run DB migrations
cd packages/db && pnpm db:migrate

# 4 — Start everything
pnpm dev
#  → web app on :3300
#  → agent backend on :5100

# 5 — (optional) Start Apostle Chain for x402 Phase IV
cd C:\Users\Kevan\apostle-chain
cargo run --release
#  → chain API on :7332
```

**Env files needed:**
- `apps/web/.env.local` — `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `AGENT_BACKEND_URL`
- `apps/agent-backend/.env` — `DATABASE_URL`, `AGENT_BACKEND_PORT=5100`

---

*Last updated: 2026 — see git log for accurate timestamp.*
