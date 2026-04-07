# CARRY-FORWARD REUSE MAP

## Source: sovereign-assets-platform

The existing `sovereign-assets-platform` repo contains substantial Phase 1-2 backend work under `@sov/*` namespace. This document maps what patterns and logic can be carried forward into `@dignity/*` without creating coupling.

## Approach: Architectural Pattern Reuse (Not Code Import)

We do NOT import `@sov/*` packages. We carry forward **the same architectural patterns** by reimplementing them under `@dignity/*`. This keeps the Dignity codebase standalone and allows independent evolution.

## Pattern Carry-Forward Map

| Domain | Source Location | Dignity Implementation | Notes |
|--------|----------------|----------------------|-------|
| Prisma schema structure | `packages/db/prisma/schema.prisma` | `packages/db/prisma/schema.prisma` | Same approach, Dignity-specific models |
| Auth/Session pattern | `packages/auth/src/` | `packages/auth/src/` | NextAuth v5 pattern |
| Compliance engine interface | `packages/compliance-engine/src/` | `packages/compliance-engine/src/` | Same interface shape |
| Token lifecycle state machine | `packages/token-engine/src/` | `packages/token-engine/src/` | Identical pattern |
| Reserve registry pattern | `packages/reserve-registry/src/` | `packages/reserve-registry/src/` | Extended for Dignity |
| Market-ops architecture | `packages/market-ops/src/` | `packages/market-ops/src/` | Same service pattern |
| Audit trail append-only | `packages/audit/src/` | `packages/audit/src/` | Hash chain same |
| Next.js App Router structure | `apps/web/src/app/` | `apps/web/src/app/` | Same route group pattern |
| Tailwind design tokens | `apps/web/tailwind.config.js` | `apps/web/tailwind.config.js` | Dignity palette override |
| Turbo monorepo config | `turbo.json` | `turbo.json` | Near-identical |

## UI Components Available for Reuse (Pattern-Level)

These components in the existing repo inform the dignity equivalents but are RE-CODED, not imported:

| Component | Source | Dignity Equivalent |
|-----------|--------|-------------------|
| `proof-timeline.tsx` | `apps/web/src/components/proof/` | `components/proof/ProofTimeline.tsx` |
| `reserve-backing-waterfall.tsx` | `apps/web/src/components/charts/` | `components/proof/ReserveCoverageWaterfall.tsx` |
| `nav-vs-market-chart.tsx` | `apps/web/src/components/charts/` | `components/liquidity/NavVsMarketChart.tsx` |
| `exchange-venue-table.tsx` | `apps/web/src/components/liquidity/` | `components/liquidity/VenueHealthTable.tsx` |
| `liquidity-health-widget.tsx` | `apps/web/src/components/liquidity/` | `components/liquidity/LiquidityHealthCard.tsx` |
| `pricing-anomaly-detector-panel.tsx` | `apps/web/src/components/liquidity/` | `components/liquidity/PricingAnomalyPanel.tsx` |
| `audit-log-table.tsx` | `apps/web/src/components/admin/` | `components/issuer/AuditLogTable.tsx` |
| `treasury-balances-panel.tsx` | `apps/web/src/components/admin/` | `components/issuer/TreasuryFlowViewer.tsx` |
| `hero-section.tsx` | `apps/web/src/components/` | `components/public/HeroSection.tsx` |

## What Is NOT Carried Forward

| Item | Reason |
|------|--------|
| Maya Preferred logic | Not applicable to Dignity |
| Competitor blend/comparison logic | Dignity is not a aggregator |
| CatEx exchange adapter specifics | Out of scope |
| `@sov/*` package exports | Direct import would create coupling |
| Existing DB migrations | Dignity needs its own migration history |
| Existing seed data | Dignity needs Dignity-specific seed data |
| Any multi-program selection UI | Dignity is single-program only |

## Risk Areas

1. **Schema divergence** — If both repos evolve their schemas, the extraction pass for Maya will need careful reconciliation.
2. **Auth session shape** — If NextAuth config diverges, shared auth for a unified platform later becomes harder.
3. **Audit hash chain format** — Keep this identical in both workspaces so audit exports are comparable.
4. **Contract ABI format** — Dignity contracts must use the same ABI encoding conventions so a unified contract registry is possible later.

## Future Extraction Pass (Maya Trigger)

When Maya is ready to be built, a formal extraction pass will:
1. Identify identical logic between `@dignity/*` and `@maya/*`
2. Create `@platform/shared-types`, `@platform/auth`, `@platform/audit`, `@platform/ui`
3. Both Dignity and Maya import from `@platform/*`
4. No breaking changes to either existing codebase during extraction
