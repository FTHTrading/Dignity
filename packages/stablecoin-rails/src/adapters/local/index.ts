// @dignity/stablecoin-rails — Local (test/dev) adapter
// Deterministic mock for development and testing. No external calls.

import type {
  StablecoinAdapter,
  StablecoinAsset,
  DepositInstruction,
  DepositConfirmation,
  SettlementOrder,
  RailHealth,
  SupportedChain,
} from "../../shared-types/index.js";

export class LocalAdapter implements StablecoinAdapter {
  readonly asset: StablecoinAsset;
  readonly supportedChains: SupportedChain[] = [
    "ethereum",
    "polygon",
    "base",
    "solana",
    "tron",
  ];

  /** Set confirmDeposits=true to auto-confirm deposits in tests */
  private readonly confirmDeposits: boolean;
  private readonly pendingDeposits = new Map<string, DepositInstruction>();

  constructor(asset: StablecoinAsset = "USDC", confirmDeposits = false) {
    this.asset = asset;
    this.confirmDeposits = confirmDeposits;
  }

  async generateDepositInstruction(
    subscriptionId: string,
    investorId: string,
    chain: SupportedChain,
    amountMinor: bigint
  ): Promise<DepositInstruction> {
    const amountHuman = formatMinorToHuman(amountMinor, 6);
    const instruction: DepositInstruction = {
      subscriptionId,
      investorId,
      asset: this.asset,
      chain,
      address: `0xLOCAL_${subscriptionId.slice(0, 8).toUpperCase()}`,
      memo: `DIG-SUB-${subscriptionId}`,
      amount: amountHuman,
      amountMinor,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      createdAt: new Date(),
    };
    this.pendingDeposits.set(subscriptionId, instruction);
    return instruction;
  }

  async checkDeposit(instruction: DepositInstruction): Promise<DepositConfirmation | null> {
    if (!this.confirmDeposits) return null;

    return {
      subscriptionId: instruction.subscriptionId,
      investorId: instruction.investorId,
      asset: instruction.asset,
      chain: instruction.chain,
      txHash: `0xLOCAL_TX_${instruction.subscriptionId.slice(0, 8)}`,
      amountMinor: instruction.amountMinor,
      amountHuman: instruction.amount,
      confirmedAt: new Date(),
      blockNumber: 99_999_999,
    };
  }

  async initiateSettlement(order: SettlementOrder): Promise<{ txHash: string }> {
    return { txHash: `0xLOCAL_SETTLE_${order.id.slice(0, 8)}` };
  }

  async healthCheck(chain: SupportedChain): Promise<RailHealth> {
    return {
      asset: this.asset,
      chain,
      status: "HEALTHY",
      latencyMs: 1,
      lastCheckedAt: new Date(),
      notes: "Local adapter — always healthy",
    };
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
