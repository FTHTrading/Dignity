# Cloudflare Deployment Guide — dignity.unykorn.org

## Prerequisites

- Cloudflare account with `unykorn.org` zone active
- Wrangler CLI installed: `npm install -g wrangler`
- Cloudflare API token with **Edit Cloudflare Workers + Pages** scope
- PostgreSQL production database connection string
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

In the Cloudflare Pages dashboard, add these as **Environment Variables** (Settings → Environment Variables → Production):

| Variable             | Value                       |
|----------------------|-----------------------------|
| `DATABASE_URL`       | Your production DB URL      |
| `NEXTAUTH_URL`       | `https://dignity.unykorn.org` |
| `NEXTAUTH_SECRET`    | 32-byte base64 secret       |
| `NODE_ENV`           | `production`                |

---

## 2. DNS Configuration

In the Cloudflare dashboard for `unykorn.org`:

| Type  | Name      | Target                          | Proxy |
|-------|-----------|---------------------------------|-------|
| CNAME | dignity   | `dignity-institutional.pages.dev` | ✅ Yes (Proxied) |

The custom domain `dignity.unykorn.org` should then be added under Pages → Custom Domains.

---

## 3. Build & Deploy via GitHub Actions (recommended)

### 3a. Add GitHub Secrets

In your GitHub repository settings → Secrets → Actions:

| Secret Name              | Value |
|--------------------------|-------|
| `CLOUDFLARE_API_TOKEN`   | `cfut_pjEgkRcv4FUjJHge3QQEbGqGJymyYQEMlTezvEOh6fb44082` |
| `CLOUDFLARE_ACCOUNT_ID`  | Your Cloudflare Account ID (from dashboard URL) |
| `DATABASE_URL`           | Production PostgreSQL URL |
| `NEXTAUTH_URL`           | `https://dignity.unykorn.org` |
| `NEXTAUTH_SECRET`        | 32-byte base64 secret |

### 3b. GitHub Actions Workflow

The workflow is already committed at `.github/workflows/deploy.yml`.
It runs automatically on every push to `main`:

1. `pnpm install --frozen-lockfile`
2. `pnpm --filter @dignity/web build` (Next.js build)
3. `npx @opennextjs/cloudflare build` (OpenNext → `.cf-deploy`)
4. `wrangler pages deploy .cf-deploy --project-name=dignity-institutional --branch=main`

All 5 secrets listed above are already configured on the repo.

---

## 4. Manual Deploy (one-time or emergency)

```bash
# From repo root
cd apps/web

# Build Next.js + OpenNext for Cloudflare
pnpm build
npx @opennextjs/cloudflare build

# Deploy the .cf-deploy output
npx wrangler pages deploy .cf-deploy \
  --project-name=dignity-institutional \
  --branch=main
```

---

## 5. Cloudflare Pages Project Setup (first time)

If the Pages project does not yet exist:

```bash
wrangler pages project create dignity-institutional
```

The custom domain `dignity.unykorn.org` has already been added via API (2026-04-07).
SSL certificate authority: Google. Status should be "active" within a few minutes.

---

## 6. Headers & Redirects

`apps/web/public/_headers` and `apps/web/public/_redirects` are automatically picked up by
Cloudflare Pages during deployment. They configure:

- Security headers (CSP, HSTS, X-Frame-Options, etc.)
- Static asset caching (1 year immutable for `/_next/static/`)
- Redirects from legacy paths (`/proof-center` → `/proof`, `/board` → `/leadership`)
- www → apex redirect

---

## 7. Database Connectivity

The platform requires a live PostgreSQL connection. Options for production:

| Option | Notes |
|--------|-------|
| Neon (serverless Postgres) | Recommended for edge deployments — connection pooling built-in |
| Supabase | Managed Postgres, connection pooler available |
| AWS RDS + VPC | Standard, requires Cloudflare Tunnel or public endpoint |
| Railway | Simple managed Postgres, suitable for initial launch |

Set `DATABASE_URL` to a **pooled** connection string (e.g. PgBouncer port 6543 on Neon/Supabase)
to handle Next.js serverless function connection behaviour.

---

## 8. Post-Deploy Checklist

- [ ] `https://dignity.unykorn.org` loads homepage
- [ ] HSTS header present: `Strict-Transport-Security: max-age=63072000`
- [ ] All 8 public routes return 200: `/`, `/evolution`, `/leadership`, `/platform`, `/proof`, `/fundability`, `/controls`, `/roadmap`, `/contact`
- [ ] `/auth/signin` redirects properly
- [ ] `/_next/static/*` assets served with `Cache-Control: immutable`
- [ ] Admin routes (`/admin/*`) require authentication
- [ ] `https://www.dignity.unykorn.org` redirects → apex

---

## 9. Rollback

Cloudflare Pages retains all previous deployments. To roll back:

```bash
# List deployments
wrangler pages deployment list --project-name=dignity-institutional

# Roll back  
wrangler pages deployment rollback DEPLOYMENT_ID --project-name=dignity-institutional
```
