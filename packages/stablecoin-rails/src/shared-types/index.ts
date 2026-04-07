// @dignity/stablecoin-rails — shared types

export type StablecoinAsset = "USDC" | "USDT";

export type SupportedChain =
  | "ethereum"
  | "polygon"
  | "base"
  | "solana"
  | "tron";

export type RailStatus = "HEALTHY" | "DEGRADED" | "OFFLINE";
export type SettlementStatus = "PENDING" | "CONFIRMED" | "FAILED" | "EXPIRED";

export interface DepositInstruction {
  subscriptionId: string;
  investorId: string;
  asset: StablecoinAsset;
  chain: SupportedChain;
  /** Wallet address to send funds to */
  address: string;
  /** Memo / reference tag (not all chains support memos) */
  memo: string;
  /** Amount in human-readable units (e.g. "50000.00" USDC = $50,000) */
  amount: string;
  /** Amount in minor units (6 decimals for USDC/USDT) */
  amountMinor: bigint;
  expiresAt: Date;
  createdAt: Date;
}

export interface DepositConfirmation {
  subscriptionId: string;
  investorId: string;
  asset: StablecoinAsset;
  chain: SupportedChain;
  /** On-chain transaction hash */
  txHash: string;
  /** Amount confirmed (minor units) */
  amountMinor: bigint;
  /** Amount human-readable */
  amountHuman: string;
  confirmedAt: Date;
  blockNumber?: number;
}

export interface SettlementOrder {
  id: string;
  /** "REDEMPTION" | "MM_RELOAD" | "SUBSCRIPTION_REFUND" */
  type: "REDEMPTION" | "MM_RELOAD" | "SUBSCRIPTION_REFUND";
  referenceId: string;
  asset: StablecoinAsset;
  chain: SupportedChain;
  toAddress: string;
  /** Amount in minor units */
  amountMinor: bigint;
  amountHuman: string;
  status: SettlementStatus;
  txHash?: string;
  initiatedAt: Date;
  confirmedAt?: Date;
  failureReason?: string;
}

export interface RailHealth {
  asset: StablecoinAsset;
  chain: SupportedChain;
  status: RailStatus;
  latencyMs?: number;
  lastCheckedAt: Date;
  notes?: string;
}

export interface ReconciliationResult {
  date: Date;
  expectedDeposits: number;
  confirmedDeposits: number;
  expectedOutbound: number;
  confirmedOutbound: number;
  /** Net difference in minor units */
  netDifferenceMinor: bigint;
  ok: boolean;
  discrepancies: string[];
}

export interface StablecoinAdapter {
  asset: StablecoinAsset;
  supportedChains: SupportedChain[];
  /** Generate a deposit address for this subscription */
  generateDepositInstruction(
    subscriptionId: string,
    investorId: string,
    chain: SupportedChain,
    amountMinor: bigint
  ): Promise<DepositInstruction>;
  /** Check for an inbound deposit matching this instruction */
  checkDeposit(instruction: DepositInstruction): Promise<DepositConfirmation | null>;
  /** Initiate an outbound payment */
  initiateSettlement(order: SettlementOrder): Promise<{ txHash: string }>;
  /** Check health of this rail/chain combination */
  healthCheck(chain: SupportedChain): Promise<RailHealth>;
}
