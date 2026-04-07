// @dignity/stablecoin-rails — public API

export * from "./shared-types/index.js";
export { CircleAdapter } from "./adapters/circle/index.js";
export { TetherAdapter } from "./adapters/tether/index.js";
export { LocalAdapter } from "./adapters/local/index.js";
export { SettlementEngine } from "./settlement/engine.js";
export { ReconciliationService } from "./settlement/reconciliation.js";
export type { ReconciliationInput } from "./settlement/reconciliation.js";
export { WalletRouter } from "./treasury/wallet-router.js";
export type { WalletPurpose, WalletAddress } from "./treasury/wallet-router.js";
export { DepositInstructionService } from "./treasury/deposit-instructions.js";
export type { DepositInstructionRequest } from "./treasury/deposit-instructions.js";
export { PriceFeed } from "./monitoring/price-feed.js";
export type { StablecoinPrice } from "./monitoring/price-feed.js";
export { HealthMonitor } from "./monitoring/health.js";
export type { RailHealthSummary } from "./monitoring/health.js";
