# LOCAL PORT MAP — Dignity Institutional Platform

Last updated: 2026-04-06

## Assigned Ports

| Service | Port | Protocol | Docker Container | Notes |
|---------|------|----------|-----------------|-------|
| Next.js web app | **3300** | HTTP | N/A (native) | Public + investor + issuer UI |
| Background worker | **3301** | HTTP | N/A (native) | Job processing health endpoint |
| PostgreSQL | **5442** | TCP | dignity-postgres | `dignity_institutional` database |
| Redis | **6382** | TCP | dignity-redis | Cache + job queues |
| Hardhat local chain | **8646** | HTTP/WS | N/A (native) | EVM dev chain for contract tests |

## Conflict Avoidance

The following ports are known to be occupied by other services on this machine and must NOT be used:

| Port | Occupied By |
|------|------------|
| 3000 | sovereign-assets-platform (existing repo web) |
| 5432 | Primary PostgreSQL (existing DB) |
| 6379 | Primary Redis (existing cache) |
| 7332 | Apostle Chain (Rust/Axum API) |
| 7700 | Finn AI core |
| 7710 | finn-brain inference engine |
| 8000 | Triton Inference Server |
| 8089 | ClawBot runner |
| 8099 | ClawdHub registry |
| 8100 | Inference Router |
| 8101 | Marketing executor |
| 8103 | Coding executor |
| 8104 | DevOps executor |
| 8200 | Speech Router |
| 9010 | Riva ASR NIM |
| 9020 | Riva TTS NIM |
| 11434 | Ollama |

## If a Port Conflict Is Discovered

1. Run `.\scripts\check-ports.ps1` to confirm which port is occupied
2. Stop the conflicting process or reassign it
3. Alternatively, update this file and `docker-compose.local.yml` with a new safe port
4. Update `.env.local` to match the new port
5. Communicate the change to the team

## Reassignment Reserved Range (if needed)

If primary ports are occupied during staging/CI, use:

| Service | Backup Port |
|---------|------------|
| Web | 3305 |
| Worker | 3306 |
| Postgres | 5448 |
| Redis | 6388 |
| Hardhat | 8648 |
