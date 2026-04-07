// @dignity/stablecoin-rails — Wallet router
// Maps asset + chain + purpose to the correct issuer wallet address.
// In production, wallet addresses come from a vault (Fireblocks / Gnosis Safe).
// Never store private keys here.

import type { StablecoinAsset, SupportedChain } from "../shared-types/index.js";

export type WalletPurpose =
  | "SUBSCRIPTION_RECEIPT"
  | "REDEMPTION_POOL"
  | "MARKET_MAKING"
  | "OPERATING_RESERVE";

export interface WalletAddress {
  address: string;
  purpose: WalletPurpose;
  asset: StablecoinAsset;
  chain: SupportedChain;
  /** Fireblocks vault account ID (if applicable) */
  fireblocksVaultId?: string;
  /** Gnosis Safe address (if applicable) */
  gnosisSafeAddress?: string;
}

/**
 * WalletRouter — resolves the correct wallet address for a given operation.
 *
 * In production:
 * 1. Load addresses from environment variables or a secrets vault
 * 2. Multi-sig wallets (Gnosis Safe) for treasury-level movements
 * 3. Hot wallets (Fireblocks) for fast subscription receipts
 *
 * In demo mode: returns placeholder addresses
 */
export class WalletRouter {
  private readonly wallets: WalletAddress[];

  constructor() {
    // Load from env in production; demo placeholders here
    this.wallets = buildWalletConfig();
  }

  resolve(
    purpose: WalletPurpose,
    asset: StablecoinAsset,
    chain: SupportedChain
  ): WalletAddress | null {
    return (
      this.wallets.find(
        (w) => w.purpose === purpose && w.asset === asset && w.chain === chain
      ) ?? null
    );
  }

  resolveOrThrow(purpose: WalletPurpose, asset: StablecoinAsset, chain: SupportedChain): WalletAddress {
    const wallet = this.resolve(purpose, asset, chain);
    if (!wallet) {
      throw new Error(`No wallet configured for ${purpose} / ${asset} / ${chain}`);
    }
    return wallet;
  }

  /** List all configured wallets (addresses only — no keys) */
  listAll(): WalletAddress[] {
    return [...this.wallets];
  }
}

// ─── Config builder ───────────────────────────────────────────────────────────

function buildWalletConfig(): WalletAddress[] {
  const addresses: WalletAddress[] = [];

  // SUBSCRIPTION_RECEIPT — hot wallet for incoming USDC/USDT
  const subReceiptEth = process.env.WALLET_SUB_RECEIPT_ETH;
  if (subReceiptEth) {
    addresses.push({ address: subReceiptEth, purpose: "SUBSCRIPTION_RECEIPT", asset: "USDC", chain: "ethereum" });
    addresses.push({ address: subReceiptEth, purpose: "SUBSCRIPTION_RECEIPT", asset: "USDT", chain: "ethereum" });
  } else {
    addresses.push({ address: "0xSUB_RECEIPT_ETH_PLACEHOLDER", purpose: "SUBSCRIPTION_RECEIPT", asset: "USDC", chain: "ethereum" });
    addresses.push({ address: "0xSUB_RECEIPT_ETH_PLACEHOLDER", purpose: "SUBSCRIPTION_RECEIPT", asset: "USDT", chain: "ethereum" });
  }

  // REDEMPTION_POOL — multi-sig wallet (Gnosis Safe)
  const redemptionPool = process.env.WALLET_REDEMPTION_POOL_ETH;
  if (redemptionPool) {
    addresses.push({ address: redemptionPool, purpose: "REDEMPTION_POOL", asset: "USDC", chain: "ethereum" });
  } else {
    addresses.push({ address: "0xREDEMPTION_POOL_PLACEHOLDER", purpose: "REDEMPTION_POOL", asset: "USDC", chain: "ethereum" });
  }

  // MARKET_MAKING — LP/MM inventory wallet
  const mmWallet = process.env.WALLET_MARKET_MAKING_ETH;
  if (mmWallet) {
    addresses.push({ address: mmWallet, purpose: "MARKET_MAKING", asset: "USDC", chain: "ethereum" });
  } else {
    addresses.push({ address: "0xMARKET_MAKING_PLACEHOLDER", purpose: "MARKET_MAKING", asset: "USDC", chain: "ethereum" });
  }

  return addresses;
}
