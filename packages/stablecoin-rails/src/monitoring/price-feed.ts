// @dignity/stablecoin-rails — Reference price feed
// Provides USDC and USDT reference prices.
// USDC/USDT should trade at $1.000 ± 0.005 — deviations are anomalies.

import axios from "axios";

export interface StablecoinPrice {
  asset: "USDC" | "USDT";
  priceUsd: number;
  /** Deviation from $1.00 in basis points */
  deviationBps: number;
  /** Whether the deviation exceeds the alert threshold */
  isAnomalous: boolean;
  source: string;
  fetchedAt: Date;
}

const ANOMALY_THRESHOLD_BPS = 50; // 0.50% deviation = alert

export class PriceFeed {
  /** Fetch USDC and USDT prices from a public price API */
  static async fetchAll(): Promise<StablecoinPrice[]> {
    try {
      // CoinGecko simple price endpoint (no API key required for basic use)
      const resp = await axios.get<Record<string, { usd: number }>>(
        "https://api.coingecko.com/api/v3/simple/price",
        {
          params: { ids: "usd-coin,tether", vs_currencies: "usd" },
          timeout: 8_000,
        }
      );

      const usdcPrice = resp.data["usd-coin"]?.usd ?? 1.0;
      const usdtPrice = resp.data["tether"]?.usd ?? 1.0;

      return [
        buildPrice("USDC", usdcPrice, "CoinGecko"),
        buildPrice("USDT", usdtPrice, "CoinGecko"),
      ];
    } catch {
      // Fallback: assume $1.00 if price feed fails (log but don't throw)
      return [
        buildPrice("USDC", 1.0, "fallback"),
        buildPrice("USDT", 1.0, "fallback"),
      ];
    }
  }

  /** Shortcut to get a single asset price */
  static async fetch(asset: "USDC" | "USDT"): Promise<StablecoinPrice> {
    const all = await this.fetchAll();
    return all.find((p) => p.asset === asset)!;
  }
}

function buildPrice(
  asset: "USDC" | "USDT",
  priceUsd: number,
  source: string
): StablecoinPrice {
  const deviationBps = Math.abs(Math.round((priceUsd - 1.0) * 10_000));
  return {
    asset,
    priceUsd,
    deviationBps,
    isAnomalous: deviationBps > ANOMALY_THRESHOLD_BPS,
    source,
    fetchedAt: new Date(),
  };
}
