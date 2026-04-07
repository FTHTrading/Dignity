# Dignity Institutional Platform — Local Bootstrap Script
# Run from workspace root: .\scripts\bootstrap-local.ps1

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $PSScriptRoot

Write-Host ""
Write-Host "  DIGNITY INSTITUTIONAL PLATFORM — LOCAL BOOTSTRAP" -ForegroundColor Cyan
Write-Host "  ════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# 1. Check .env.local exists
$envLocal = Join-Path $Root ".env.local"
if (-not (Test-Path $envLocal)) {
    Write-Host "  [WARN] .env.local not found — copying from .env.local.example" -ForegroundColor Yellow
    Copy-Item (Join-Path $Root ".env.local.example") $envLocal
    Write-Host "  [INFO] Please review .env.local and set real values" -ForegroundColor Yellow
}

# 2. Check ports
Write-Host "  [1/5] Checking ports..." -ForegroundColor White
& "$PSScriptRoot\check-ports.ps1"

# 3. Install dependencies
Write-Host ""
Write-Host "  [2/5] Installing dependencies (pnpm)..." -ForegroundColor White
Set-Location $Root
& pnpm install

# 4. Generate Prisma client
Write-Host ""
Write-Host "  [3/5] Generating Prisma client..." -ForegroundColor White
& pnpm db:generate

# 5. Push schema to DB (dev shortcut — use migrate in staging/prod)
Write-Host ""
Write-Host "  [4/5] Pushing schema to database..." -ForegroundColor White
& pnpm db:push

# 6. Seed demo data
Write-Host ""
Write-Host "  [5/5] Seeding demo data..." -ForegroundColor White
& pnpm db:seed

Write-Host ""
Write-Host "  ══════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "  Bootstrap complete. Start dev server with: pnpm dev" -ForegroundColor Green
Write-Host "  Web: http://localhost:3300" -ForegroundColor Green
Write-Host "  ══════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""
