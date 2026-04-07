// @dignity/stablecoin-rails — Tether USDT adapter
// Monitors ERC-20 Transfer events for USDT on Ethereum, Polygon, and TRC-20 on Tron.
// No native Tether Payments API — uses on-chain monitoring via RPC.

import type {
  StablecoinAdapter,
  DepositInstruction,
  DepositConfirmation,
  SettlementOrder,
  RailHealth,
  SupportedChain,
} from "../../shared-types/index.js";

// USDT contract addresses per chain
const USDT_CONTRACTS: Partial<Record<SupportedChain, string>> = {
  ethereum: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  polygon: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
  // Tron: TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t (TRC-20, handled via TronGrid)
  tron: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
};

const RPC_URLS: Partial<Record<SupportedChain, string>> = {
  ethereum: process.env.ETH_RPC_URL ?? "https://eth.llamarpc.com",
  polygon: process.env.POLYGON_RPC_URL ?? "https://polygon.llamarpc.com",
  tron: process.env.TRON_GRID_URL ?? "https://api.trongrid.io",
};

export class TetherAdapter implements StablecoinAdapter {
  readonly asset = "USDT" as const;
  readonly supportedChains: SupportedChain[] = ["ethereum", "polygon", "tron"];

  async generateDepositInstruction(
    subscriptionId: string,
    investorId: string,
    chain: SupportedChain,
    amountMinor: bigint
  ): Promise<DepositInstruction> {
    if (!this.supportedChains.includes(chain)) {
      throw new Error(`TetherAdapter: chain ${chain} not supported`);
    }

    // Production: derive a unique deposit HD wallet address per subscription
    // using ethers.js HDNodeWallet.fromMnemonic or similar
    // For EVM chains: derive a unique child address from ISSUER_HD_MNEMONIC
    // For Tron: derive from TRON_HD_MNEMONIC via tronweb
    const address = simulateTetherDepositAddress(subscriptionId, chain);
    const amountHuman = formatMinorToHuman(amountMinor, 6);
    const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000); // 48h for USDT (slower)

    return {
      subscriptionId,
      investorId,
      asset: "USDT",
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
    const contract = USDT_CONTRACTS[instruction.chain];
    const rpc = RPC_URLS[instruction.chain];
    if (!contract || !rpc) return null;

    // Production (EVM chains):
    // 1. Use ethers.js to query Transfer events from USDT contract to instruction.address
    // 2. Filter by block range from instruction.createdAt to now
    // 3. Sum transfer amounts; if >= instruction.amountMinor, return confirmation
    //
    // const provider = new ethers.JsonRpcProvider(rpc);
    // const usdt = new ethers.Contract(contract, ERC20_ABI, provider);
    // const filter = usdt.filters.Transfer(null, instruction.address);
    // const events = await usdt.queryFilter(filter, fromBlock, "latest");
    // ...

    // For Tron: poll TronGrid API
    // GET https://api.trongrid.io/v1/contracts/{contract}/events?event_name=Transfer&only_confirmed=true

    // Stub: no deposit found in demo mode
    return null;
  }

  async initiateSettlement(order: SettlementOrder): Promise<{ txHash: string }> {
    const contract = USDT_CONTRACTS[order.chain];
    if (!contract) {
      throw new Error(`TetherAdapter: no USDT contract for chain ${order.chain}`);
    }

    // Production (EVM):
    // 1. Load private key from vault (NEVER from env directly in production)
    // 2. Create ethers.Wallet instance
    // 3. Call USDT.transfer(order.toAddress, order.amountMinor)
    //
    // const wallet = new ethers.Wallet(process.env.TREASURY_PRIVATE_KEY!, provider);
    // const usdt = new ethers.Contract(contract, ERC20_ABI, wallet);
    // const tx = await usdt.transfer(order.toAddress, order.amountMinor);
    // return { txHash: tx.hash };

    // Stub:
    return { txHash: `0x${simulateTxHash(order.id)}` };
  }

  async healthCheck(chain: SupportedChain): Promise<RailHealth> {
    if (!this.supportedChains.includes(chain)) {
      return {
        asset: "USDT",
        chain,
        status: "OFFLINE",
        lastCheckedAt: new Date(),
        notes: "Chain not supported by TetherAdapter",
      };
    }

    const rpc = RPC_URLS[chain];
    if (!rpc) {
      return { asset: "USDT", chain, status: "OFFLINE", lastCheckedAt: new Date() };
    }

    try {
      // Production: call eth_blockNumber or equivalent to check RPC liveness
      // For now: return HEALTHY in stub mode
      return { asset: "USDT", chain, status: "HEALTHY", latencyMs: 0, lastCheckedAt: new Date() };
    } catch {
      return {
        asset: "USDT",
        chain,
        status: "DEGRADED",
        lastCheckedAt: new Date(),
        notes: "RPC health check failed",
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

function simulateTetherDepositAddress(subscriptionId: string, chain: SupportedChain): string {
  const prefix = chain === "tron" ? "T" : "0x";
  const body = Buffer.from(subscriptionId + "usdt").toString("hex").padEnd(38, "f").slice(0, 38);
  return `${prefix}${body}`;
}

function simulateTxHash(orderId: string): string {
  return Buffer.from(orderId + "usdt").toString("hex").padEnd(64, "b").slice(0, 64);
}
