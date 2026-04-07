// @dignity/shared-types — treasury interfaces

export interface ITreasuryAccount {
  id: string;
  programId: string;
  name: string;
  accountType: string;
  currency: string;
  balance: number;
  institution?: string | null;
  active: boolean;
}

export interface ITreasuryMovement {
  id: string;
  accountId: string;
  movementType: string;
  direction: "IN" | "OUT";
  amount: number;
  currency: string;
  reference?: string | null;
  counterparty?: string | null;
  settledAt?: Date | null;
  valueDate: Date;
  description?: string | null;
}

export interface IReconciliationRun {
  id: string;
  ranAt: Date;
  periodStart: Date;
  periodEnd: Date;
  status: string;
  discrepancies: number;
}

export interface ITreasurySummary {
  totalReserveUsd: number;
  totalOperatingUsd: number;
  totalMmPoolUsd: number;
  totalEscrowUsd: number;
  lastReconciled?: Date | null;
  hasDiscrepancies: boolean;
}
