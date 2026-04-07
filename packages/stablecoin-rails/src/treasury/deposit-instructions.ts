// @dignity/stablecoin-rails — Deposit instruction service
// Generates and tracks deposit instructions per subscription per investor.
// In production, stores instructions in DB for monitoring loop to poll.

import type { StablecoinAsset, SupportedChain, DepositInstruction } from "../shared-types/index.js";
import { SettlementEngine } from "../settlement/engine.js";

export interface DepositInstructionRequest {
  subscriptionId: string;
  investorId: string;
  asset: StablecoinAsset;
  chain: SupportedChain;
  /** Subscription amount in USD (e.g. 50000 = $50,000) */
  amountUsd: number;
}

export class DepositInstructionService {
  private readonly engine: SettlementEngine;
  /** In-memory store for demo mode — replace with DB in production */
  private readonly store = new Map<string, DepositInstruction>();

  constructor(engine: SettlementEngine) {
    this.engine = engine;
  }

  async generate(req: DepositInstructionRequest): Promise<DepositInstruction> {
    const cacheKey = `${req.subscriptionId}:${req.asset}:${req.chain}`;
    const existing = this.store.get(cacheKey);
    if (existing && existing.expiresAt > new Date()) {
      return existing;
    }

    // Convert USD amount to minor units (6 decimals for USDC/USDT)
    const amountMinor = BigInt(Math.round(req.amountUsd * 1_000_000));

    const instruction = await this.engine.generateDepositInstruction(
      req.subscriptionId,
      req.investorId,
      req.asset,
      req.chain,
      amountMinor
    );

    this.store.set(cacheKey, instruction);
    return instruction;
  }

  /** Retrieve a previously generated instruction */
  get(subscriptionId: string, asset: StablecoinAsset, chain: SupportedChain): DepositInstruction | null {
    return this.store.get(`${subscriptionId}:${asset}:${chain}`) ?? null;
  }

  /** Expire any instructions past their ExpiresAt without confirmation */
  listExpired(): DepositInstruction[] {
    const now = new Date();
    const expired: DepositInstruction[] = [];
    for (const instruction of this.store.values()) {
      if (instruction.expiresAt < now) {
        expired.push(instruction);
      }
    }
    return expired;
  }

  /** Format deposit instruction for investor display */
  static formatForInvestor(instruction: DepositInstruction): string {
    return [
      `Send ${instruction.amount} ${instruction.asset} to:`,
      `Network: ${instruction.chain.toUpperCase()}`,
      `Address: ${instruction.address}`,
      instruction.memo ? `Memo / Reference: ${instruction.memo}` : "",
      `Expires: ${instruction.expiresAt.toISOString()}`,
      ``,
      `IMPORTANT: Include the memo/reference exactly as shown.`,
      `Do not send from an exchange wallet — use a self-custodied wallet.`,
    ]
      .filter(Boolean)
      .join("\n");
  }
}
