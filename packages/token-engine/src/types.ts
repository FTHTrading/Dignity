// @dignity/token-engine — shared result types

export interface IssuanceResult {
  subscriptionId: string;
  approved: boolean;
  tokensToMint: number;
  settlementReference?: string;
  blockedReasons: string[];
}

export interface RedemptionResult {
  redemptionId: string;
  approved: boolean;
  tokensToBurn: number;
  settlementReference?: string;
  blockedReasons: string[];
}
