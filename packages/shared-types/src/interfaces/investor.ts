// @dignity/shared-types — investor interfaces

import type { KycStatus, AttestationStatus } from "../enums";

export interface IInvestorProfile {
  id: string;
  userId: string;
  investorType: string;
  entityName?: string | null;
  countryCode: string;
  kycStatus: KycStatus;
  accreditationStatus: string;
  walletAddress?: string | null;
  whitelisted: boolean;
  sanctionsCleared: boolean;
  totalInvested: number;
  totalRedeemed: number;
}

export interface ISubscriptionRequest {
  id: string;
  investorId: string;
  securityId: string;
  offeringId?: string | null;
  status: string;
  tokenAmount: string;
  currency: string;
  amountFiat: number;
  submittedAt?: Date | null;
  approvedAt?: Date | null;
  settledAt?: Date | null;
}

export interface IRedemptionRequest {
  id: string;
  investorId: string;
  securityId: string;
  status: string;
  tokenAmount: string;
  expectedFiat?: number | null;
  actualFiat?: number | null;
  currency: string;
  requestedAt: Date;
  settledAt?: Date | null;
}

export interface IWalletAllowlist {
  id: string;
  investorId: string;
  address: string;
  chainId: number;
  addedAt: Date;
  active: boolean;
}
