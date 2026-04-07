// @dignity/stablecoin-rails — Settlement engine
// Routes settlement orders to the correct adapter based on asset + chain.
// Coordinates deposit monitoring and outbound payments.

import { CircleAdapter } from "../adapters/circle/index.js";
import { TetherAdapter } from "../adapters/tether/index.js";
import { LocalAdapter } from "../adapters/local/index.js";
import type {
  StablecoinAdapter,
  StablecoinAsset,
  SupportedChain,
  DepositInstruction,
  DepositConfirmation,
  SettlementOrder,
  RailHealth,
} from "../shared-types/index.js";

/** Strategy for which adapters to use */
type AdapterMode = "circle" | "tether" | "local";

export class SettlementEngine {
  private readonly adapters: Map<StablecoinAsset, StablecoinAdapter>;

  constructor(mode: AdapterMode = "local") {
    this.adapters = new Map();

    if (mode === "local") {
      this.adapters.set("USDC", new LocalAdapter("USDC", false));
      this.adapters.set("USDT", new LocalAdapter("USDT", false));
    } else {
      this.adapters.set("USDC", new CircleAdapter());
      this.adapters.set("USDT", new TetherAdapter());
    }
  }

  private getAdapter(asset: StablecoinAsset): StablecoinAdapter {
    const adapter = this.adapters.get(asset);
    if (!adapter) throw new Error(`No adapter registered for asset ${asset}`);
    return adapter;
  }

  /** Generate a unique deposit address for a given subscription */
  async generateDepositInstruction(
    subscriptionId: string,
    investorId: string,
    asset: StablecoinAsset,
    chain: SupportedChain,
    amountMinor: bigint
  ): Promise<DepositInstruction> {
    return this.getAdapter(asset).generateDepositInstruction(
      subscriptionId,
      investorId,
      chain,
      amountMinor
    );
  }

  /** Poll for a deposit matching the instruction */
  async checkDeposit(instruction: DepositInstruction): Promise<DepositConfirmation | null> {
    return this.getAdapter(instruction.asset).checkDeposit(instruction);
  }

  /** Send a stablecoin payment to an external address */
  async initiateSettlement(order: SettlementOrder): Promise<{ txHash: string }> {
    return this.getAdapter(order.asset).initiateSettlement(order);
  }

  /** Get health status for all supported chains across all adapters */
  async getAllRailHealth(): Promise<RailHealth[]> {
    const results: RailHealth[] = [];
    for (const [, adapter] of this.adapters) {
      for (const chain of adapter.supportedChains) {
        const health = await adapter.healthCheck(chain);
        results.push(health);
      }
    }
    return results;
  }

  /** Get health for a specific asset + chain */
  async getRailHealth(asset: StablecoinAsset, chain: SupportedChain): Promise<RailHealth> {
    return this.getAdapter(asset).healthCheck(chain);
  }
}
