// @dignity/stablecoin-rails — Circle USDC adapter
// Wraps Circle Payments API v2 for USDC deposit monitoring and outbound payments.
// All API calls are server-side only. Never expose CIRCLE_API_KEY to the client.

import axios, { type AxiosInstance } from "axios";
import type {
  StablecoinAdapter,
  DepositInstruction,
  DepositConfirmation,
  SettlementOrder,
  RailHealth,
  SupportedChain,
} from "../../shared-types/index.js";

const CIRCLE_SANDBOX = "https://api-sandbox.circle.com";
const CIRCLE_PRODUCTION = "https://api.circle.com";

// Chains Circle supports for USDC
const CIRCLE_CHAIN_MAP: Record<SupportedChain, string | null> = {
  ethereum: "ETH",
  polygon: "MATIC",
  base: "BASE",
  solana: "SOL",
  tron: null, // USDC not primary on Tron; skip
};

export class CircleAdapter implements StablecoinAdapter {
  readonly asset = "USDC" as const;
  readonly supportedChains: SupportedChain[] = ["ethereum", "polygon", "base", "solana"];

  private readonly http: AxiosInstance;
  private readonly walletId: string;

  constructor() {
    const apiKey = process.env.CIRCLE_API_KEY;
    const env = process.env.CIRCLE_ENVIRONMENT ?? "sandbox";
    this.walletId = process.env.CIRCLE_WALLET_ID ?? "";

    if (!apiKey) {
      throw new Error("CIRCLE_API_KEY environment variable is required");
    }

    this.http = axios.create({
      baseURL: env === "production" ? CIRCLE_PRODUCTION : CIRCLE_SANDBOX,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      timeout: 15_000,
    });
  }

  async generateDepositInstruction(
    subscriptionId: string,
    investorId: string,
    chain: SupportedChain,
    amountMinor: bigint
  ): Promise<DepositInstruction> {
    const circleChain = CIRCLE_CHAIN_MAP[chain];
    if (!circleChain) {
      throw new Error(`Chain ${chain} not supported by CircleAdapter`);
    }

    // Create a payment intent via Circle API
    // In production: POST /v1/paymentIntents with idempotencyKey, amount, currency, settlementCurrency, chain
    const idempotencyKey = `dignity-sub-${subscriptionId}-${chain}`;
    const amountHuman = formatMinorToHuman(amountMinor, 6);

    // Stubbed for demo — in production, call Circle API and parse depositAddress
    // const resp = await this.http.post("/v1/paymentIntents", { ... });
    // const { depositAddress } = resp.data.data;

    const address = simulateCircleDepositAddress(subscriptionId, chain);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

    return {
      subscriptionId,
      investorId,
      asset: "USDC",
      chain,
      address,
      memo: `DIG-SUB-${subscriptionId}`,
      amount: amountHuman,
      amountMinor,
      expiresAt,
      createdAt: new Date(),
    };
  }

  async checkDeposit(instruction: DepositInstruction): Promise<DepositConfirmation | null> {
    // Production: GET /v1/paymentIntents/{id} and check for confirmed inbound
    // Check for status === "complete" or "paid"
    // For now: return null (no pending deposit in stub mode)
    void instruction; // suppress unused warning
    return null;
  }

  async initiateSettlement(order: SettlementOrder): Promise<{ txHash: string }> {
    const circleChain = CIRCLE_CHAIN_MAP[order.chain];
    if (!circleChain) {
      throw new Error(`Chain ${order.chain} not supported for Circle outbound`);
    }

    // Production: POST /v1/transfers with source (walletId), destination (blockchain address), amount
    // const resp = await this.http.post("/v1/transfers", {
    //   source: { type: "wallet", id: this.walletId },
    //   destination: { type: "blockchain", chain: circleChain, address: order.toAddress },
    //   amount: { amount: order.amountHuman, currency: "USD" },
    //   idempotencyKey: `dignity-settle-${order.id}`,
    // });
    // return { txHash: resp.data.data.transactionHash };

    // Stub:
    return { txHash: `0x${simulateTxHash(order.id)}` };
  }

  async healthCheck(chain: SupportedChain): Promise<RailHealth> {
    const supported = this.supportedChains.includes(chain);
    if (!supported) {
      return {
        asset: "USDC",
        chain,
        status: "OFFLINE",
        lastCheckedAt: new Date(),
        notes: "Chain not supported by CircleAdapter",
      };
    }

    try {
      const start = Date.now();
      await this.http.get("/v1/ping");
      const latencyMs = Date.now() - start;
      return { asset: "USDC", chain, status: "HEALTHY", latencyMs, lastCheckedAt: new Date() };
    } catch {
      return {
        asset: "USDC",
        chain,
        status: "DEGRADED",
        lastCheckedAt: new Date(),
        notes: "Circle API ping failed",
      };
    }
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatMinorToHuman(minor: bigint, decimals: number): string {
  const divisor = 10n ** BigInt(decimals);
  const whole = minor / divisor;
  const frac = minor % divisor;
  const fracStr = frac.toString().padStart(decimals, "0").replace(/0+$/, "") || "00";
  return `${whole}.${fracStr.slice(0, 2)}`;
}

/** Deterministic fake address for demo/stub mode */
function simulateCircleDepositAddress(subscriptionId: string, chain: SupportedChain): string {
  const prefix = chain === "solana" ? "7DGf" : "0x";
  const body = Buffer.from(subscriptionId).toString("hex").padEnd(38, "0").slice(0, 38);
  return `${prefix}${body}`;
}

/** Deterministic fake tx hash for stub mode */
function simulateTxHash(orderId: string): string {
  return Buffer.from(orderId).toString("hex").padEnd(64, "a").slice(0, 64);
}
