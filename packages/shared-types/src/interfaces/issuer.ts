// @dignity/shared-types — issuer interfaces

import type { TokenStatus } from "../enums";

export interface IIssuerProgram {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISecurityClass {
  id: string;
  programId: string;
  symbol: string;
  name: string;
  description?: string | null;
  status: TokenStatus;
  totalSupplyCap?: string | null;
  circulatingSupply: string;
  decimals: number;
  contractAddress?: string | null;
  chainId?: number | null;
  reserveRatio?: number | null;
  navPerToken?: number | null;
  navUpdatedAt?: Date | null;
  issuedAt?: Date | null;
}

export interface IOfferingRound {
  id: string;
  programId: string;
  securityId: string;
  name: string;
  status: string;
  minInvestment?: number | null;
  maxInvestment?: number | null;
  targetRaise?: number | null;
  totalRaised: number;
  currency: string;
  openAt?: Date | null;
  closeAt?: Date | null;
}

export interface INavReference {
  id: string;
  securityId: string;
  navPerToken: number;
  currency: string;
  methodology?: string | null;
  calculatedAt: Date;
  effectiveDate: Date;
  source: string;
}
