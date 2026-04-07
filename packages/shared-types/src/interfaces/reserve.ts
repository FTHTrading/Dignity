// @dignity/shared-types — reserve interfaces

import type { ReserveAssetClass, AttestationStatus } from "../enums";

export interface IReserveAsset {
  id: string;
  programId: string;
  assetClass: ReserveAssetClass;
  name: string;
  symbol?: string | null;
  custodian?: string | null;
  active: boolean;
}

export interface IReserveLot {
  id: string;
  assetId: string;
  lotNumber: string;
  status: string;
  quantity: number;
  unit: string;
  acquiredAt: Date;
  acquiredPrice: number;
  custodianRef?: string | null;
  locationVault?: string | null;
}

export interface IReserveValuation {
  id: string;
  assetId: string;
  valuedAt: Date;
  pricePerUnit: number;
  currency: string;
  totalValue: number;
  source: string;
  methodology?: string | null;
}

export interface IReserveAttestation {
  id: string;
  type: string;
  status: AttestationStatus;
  attestor: string;
  attestorType: string;
  periodStart: Date;
  periodEnd: Date;
  verifiedAt?: Date | null;
  summary?: string | null;
  totalReserveValue?: number | null;
  coverageRatio?: number | null;
  anchorTxHash?: string | null;
}

export interface IReserveCoverageSnapshot {
  id: string;
  snapshotAt: Date;
  totalReserveUsd: number;
  totalTokenSupply: string;
  coverageRatio: number;
  navPerToken: number;
  netAssetValue: number;
}

export interface IProofAnchor {
  id: string;
  dataHash: string;
  dataType: string;
  refId: string;
  txHash: string;
  chainId: number;
  blockNumber?: number | null;
  anchoredAt: Date;
}
