# Cloudflare Deployment Guide — dignity.unykorn.org

## Architecture

Dignity deploys as a **Cloudflare Worker with Assets** via OpenNext/Cloudflare.
The build pipeline compiles Next.js → OpenNext → `.open-next/worker.js` + `.open-next/assets/`.

- **Worker name:** `dignity-institutional`
- **Custom domain:** `dignity.unykorn.org` (managed by Wrangler, DNS auto-configured)
- **Workers.dev URL:** `dignity-institutional.kevanbtc.workers.dev`

---

## Prerequisites

- Cloudflare account with `unykorn.org` zone active
- Wrangler CLI: `npm install -g wrangler`
- Cloudflare API token with **Edit Workers** scope
- `pnpm` installed at root

---

## 1. Environment Variables

Copy `.env.example` to `.env.production.local` in `apps/web/` and fill in:

```env
DATABASE_URL=postgresql://USER:PASS@HOST:PORT/dignity_prod
NEXTAUTH_URL=https://dignity.unykorn.org
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
NODE_ENV=production
```

---

## 2. Build & Deploy via GitHub Actions (recommended)

### 2a. GitHub Secrets (already configured)

| Secret Name              | Status |
|--------------------------|--------|
| `CLOUDFLARE_API_TOKEN`   | ✅ Set |
| `CLOUDFLARE_ACCOUNT_ID`  | ✅ Set |
| `DATABASE_URL`           | ✅ Set |
| `NEXTAUTH_URL`           | ✅ Set |
| `NEXTAUTH_SECRET`        | ✅ Set |

### 2b. GitHub Actions Workflow

The workflow at `.github/workflows/deploy.yml` runs on every push to `main`:

1. `pnpm install --frozen-lockfile`
2. `pnpm --filter @dignity/web build` (Next.js build)
3. `npx @opennextjs/cloudflare build` (OpenNext → `.open-next/`)
4. `wrangler deploy` (Workers deploy with custom domain)

---

## 3. Manual Deploy

```bash
cd apps/web

# Build Next.js
pnpm build

# Build OpenNext for Cloudflare Workers
npx @opennextjs/cloudflare build

# Deploy Worker + assets
npx wrangler deploy
```

---

## 4. wrangler.toml

```toml
name = "dignity-institutional"
main = ".open-next/worker.js"
compatibility_date = "2025-04-01"
compatibility_flags = ["nodejs_compat"]
workers_dev = true

routes = [
  { pattern = "dignity.unykorn.org", custom_domain = true }
]

[assets]
directory = ".open-next/assets"
binding = "ASSETS"

[vars]
NODE_ENV = "production"
```

The `custom_domain = true` route tells Wrangler to auto-manage DNS for `dignity.unykorn.org`.

---

## 5. Static PDFs

PDFs are pre-generated at build time and served from `public/docs/`:

```bash
npx tsx scripts/generate-pdfs.mjs
```

This outputs 5 institutional PDFs to `public/docs/`. The documents page links to
`/docs/{filename}.pdf` (static files) instead of `/api/documents/{slug}` (Node.js runtime).

---

## 6. Headers & Redirects

`apps/web/public/_headers` and `apps/web/public/_redirects` are picked up by Workers Assets:

- Security headers (CSP, HSTS, X-Frame-Options)
- Static asset caching (1 year immutable for `/_next/static/`)
- Redirects from legacy paths (`/proof-center` → `/proof`, `/board` → `/leadership`)

**Note:** Workers Assets only supports relative URL redirects. www→apex redirect
should be configured via Cloudflare Redirect Rules in the dashboard.

---

## 7. Post-Deploy Checklist

- [x] `https://dignity.unykorn.org` loads homepage
- [ ] HSTS header present
- [ ] All public routes return 200: `/`, `/evolution`, `/leadership`, `/platform`, `/proof`, `/fundability`, `/controls`, `/roadmap`, `/contact`, `/documents`
- [ ] PDF downloads work: `/docs/Dignity_Executive_Summary_2026.pdf`
- [ ] `/_next/static/*` assets cached
- [ ] Background video (`bg.mp4`) plays

---

## 8. Rollback

```bash
# List Worker versions
wrangler versions list

# Roll back to a previous version
wrangler rollback <VERSION_ID>
```
