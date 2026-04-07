// @dignity/stablecoin-rails — Rail health monitor
// Polls all adapters and aggregates health status into a dashboard-ready summary.

import { SettlementEngine } from "../settlement/engine.js";
import { PriceFeed, type StablecoinPrice } from "./price-feed.js";
import type { RailHealth } from "../shared-types/index.js";

export interface RailHealthSummary {
  allHealthy: boolean;
  rails: RailHealth[];
  prices: StablecoinPrice[];
  priceAnomalyDetected: boolean;
  checkedAt: Date;
}

export class HealthMonitor {
  private readonly engine: SettlementEngine;

  constructor(engine: SettlementEngine) {
    this.engine = engine;
  }

  async check(): Promise<RailHealthSummary> {
    const [rails, prices] = await Promise.all([
      this.engine.getAllRailHealth(),
      PriceFeed.fetchAll().catch(() => [] as StablecoinPrice[]),
    ]);

    const allHealthy = rails.every((r) => r.status === "HEALTHY");
    const priceAnomalyDetected = prices.some((p) => p.isAnomalous);

    return {
      allHealthy,
      rails,
      prices,
      priceAnomalyDetected,
      checkedAt: new Date(),
    };
  }
}
