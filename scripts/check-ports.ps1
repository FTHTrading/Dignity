# Dignity — Port Conflict Check
# Run: .\scripts\check-ports.ps1

$ports = @(
    @{ Port = 3300; Service = "Web (Next.js)" },
    @{ Port = 3301; Service = "Worker process" },
    @{ Port = 5442; Service = "PostgreSQL (dignity_institutional)" },
    @{ Port = 6382; Service = "Redis" },
    @{ Port = 8646; Service = "Hardhat local chain" }
)

$hasConflict = $false

Write-Host ""
Write-Host "  Dignity Port Check" -ForegroundColor Cyan
Write-Host "  ─────────────────────────────────────────────────────" -ForegroundColor DarkGray

foreach ($entry in $ports) {
    $conn = Test-NetConnection -ComputerName "localhost" -Port $entry.Port -WarningAction SilentlyContinue -InformationLevel Quiet 2>$null
    if ($conn) {
        Write-Host ("  [CONFLICT] Port {0} IN USE — {1}" -f $entry.Port, $entry.Service) -ForegroundColor Red
        $hasConflict = $true
    } else {
        Write-Host ("  [OK]       Port {0} free   — {1}" -f $entry.Port, $entry.Service) -ForegroundColor Green
    }
}

Write-Host "  ─────────────────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host ""

if ($hasConflict) {
    Write-Host "  !! Port conflicts detected. Resolve before starting services." -ForegroundColor Red
    Write-Host "  See docs/runbooks/LOCAL_PORT_MAP.md for reassignment guidance." -ForegroundColor Yellow
    exit 1
} else {
    Write-Host "  All required ports are available." -ForegroundColor Green
}
