// @dignity/treasury — account service, movement recorder, reconciliation

import { prisma } from "@dignity/db";
import type { ITreasurySummary } from "@dignity/shared-types";

export class TreasuryService {
  /** Returns all accounts for a program. */
  static async getAccounts(programId: string) {
    return prisma.treasuryAccount.findMany({
      where: { programId, active: true },
      orderBy: { accountType: "asc" },
    });
  }

  /** Returns aggregate summary across all accounts for a program. */
  static async getSummary(programId: string): Promise<ITreasurySummary> {
    const accounts = await prisma.treasuryAccount.findMany({
      where: { programId, active: true },
    });

    let totalReserveUsd = 0;
    let totalOperatingUsd = 0;
    let totalMmPoolUsd = 0;
    let totalEscrowUsd = 0;

    for (const acc of accounts) {
      switch (acc.accountType) {
        case "RESERVE":
          totalReserveUsd += acc.balance;
          break;
        case "OPERATING":
          totalOperatingUsd += acc.balance;
          break;
        case "MARKET_MAKING":
          totalMmPoolUsd += acc.balance;
          break;
        case "ESCROW":
          totalEscrowUsd += acc.balance;
          break;
      }
    }

    const lastRun = await prisma.reconciliationRun.findFirst({
      orderBy: { ranAt: "desc" },
    });

    return {
      totalReserveUsd,
      totalOperatingUsd,
      totalMmPoolUsd,
      totalEscrowUsd,
      lastReconciled: lastRun?.ranAt ?? undefined,
      hasDiscrepancies: (lastRun?.discrepancies ?? 0) > 0,
    };
  }

  /** Records a treasury movement and updates account balance. */
  static async recordMovement(params: {
    accountId: string;
    movementType: string;
    direction: "IN" | "OUT";
    amount: number;
    currency: string;
    reference?: string;
    counterparty?: string;
    valueDate?: Date;
    description?: string;
  }): Promise<string> {
    const { accountId, direction, amount } = params;

    const [movement] = await prisma.$transaction([
      prisma.treasuryMovement.create({
        data: {
          accountId,
          movementType: params.movementType as import("@dignity/db").MovementType,
          direction,
          amount,
          currency: params.currency,
          reference: params.reference,
          counterparty: params.counterparty,
          valueDate: params.valueDate ?? new Date(),
          description: params.description,
          settledAt: new Date(),
        },
      }),
      prisma.treasuryAccount.update({
        where: { id: accountId },
        data: {
          balance: {
            [direction === "IN" ? "increment" : "decrement"]: amount,
          },
        },
      }),
    ]);

    return movement.id;
  }
}
