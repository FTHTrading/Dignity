// @dignity/stablecoin-rails — Reconciliation service
// Compares expected vs. confirmed deposits and outbound settlements.
// Flags discrepancies for treasury review.

import type { ReconciliationResult } from "../shared-types/index.js";

export interface ReconciliationInput {
  date: Date;
  /** Subscriptions with pending USDC/USDT deposit */
  expectedDeposits: Array<{ subscriptionId: string; amountMinor: bigint }>;
  /** Deposits confirmed on-chain */
  confirmedDeposits: Array<{ subscriptionId: string; amountMinor: bigint }>;
  /** Outbound settlement orders initiated */
  expectedOutbound: Array<{ orderId: string; amountMinor: bigint }>;
  /** Outbound settlements confirmed on-chain */
  confirmedOutbound: Array<{ orderId: string; amountMinor: bigint }>;
}

export class ReconciliationService {
  reconcile(input: ReconciliationInput): ReconciliationResult {
    const discrepancies: string[] = [];

    // ── Check inbound deposits ───────────────────────────────────────────────
    const confirmedDepositIds = new Set(input.confirmedDeposits.map((d) => d.subscriptionId));

    for (const expected of input.expectedDeposits) {
      if (!confirmedDepositIds.has(expected.subscriptionId)) {
        discrepancies.push(
          `INBOUND MISSING: subscription ${expected.subscriptionId} — expected ${formatMinor(expected.amountMinor)} USDC`
        );
      }
    }

    for (const confirmed of input.confirmedDeposits) {
      const exp = input.expectedDeposits.find((e) => e.subscriptionId === confirmed.subscriptionId);
      if (!exp) {
        discrepancies.push(
          `INBOUND UNEXPECTED: deposit for subscription ${confirmed.subscriptionId} not in expected list`
        );
      } else if (exp.amountMinor !== confirmed.amountMinor) {
        discrepancies.push(
          `INBOUND AMOUNT MISMATCH: sub ${confirmed.subscriptionId} — expected ${formatMinor(exp.amountMinor)}, got ${formatMinor(confirmed.amountMinor)}`
        );
      }
    }

    // ── Check outbound settlements ────────────────────────────────────────────
    const confirmedOutboundIds = new Set(input.confirmedOutbound.map((o) => o.orderId));

    for (const expected of input.expectedOutbound) {
      if (!confirmedOutboundIds.has(expected.orderId)) {
        discrepancies.push(
          `OUTBOUND MISSING: order ${expected.orderId} — expected ${formatMinor(expected.amountMinor)} USDC settlement`
        );
      }
    }

    // ── Net position ──────────────────────────────────────────────────────────
    const totalExpectedIn = input.expectedDeposits.reduce((s, d) => s + d.amountMinor, 0n);
    const totalConfirmedIn = input.confirmedDeposits.reduce((s, d) => s + d.amountMinor, 0n);
    const totalExpectedOut = input.expectedOutbound.reduce((s, o) => s + o.amountMinor, 0n);
    const totalConfirmedOut = input.confirmedOutbound.reduce((s, o) => s + o.amountMinor, 0n);

    const netExpected = totalExpectedIn - totalExpectedOut;
    const netConfirmed = totalConfirmedIn - totalConfirmedOut;
    const netDifferenceMinor = netConfirmed - netExpected;

    if (netDifferenceMinor !== 0n) {
      discrepancies.push(
        `NET POSITION MISMATCH: expected ${formatMinor(netExpected)}, confirmed ${formatMinor(netConfirmed)}, difference ${formatMinor(netDifferenceMinor)}`
      );
    }

    return {
      date: input.date,
      expectedDeposits: input.expectedDeposits.length,
      confirmedDeposits: input.confirmedDeposits.length,
      expectedOutbound: input.expectedOutbound.length,
      confirmedOutbound: input.confirmedOutbound.length,
      netDifferenceMinor,
      ok: discrepancies.length === 0,
      discrepancies,
    };
  }
}

function formatMinor(minor: bigint): string {
  const divisor = 1_000_000n;
  return `${(minor / divisor).toString()}.${(minor % divisor).toString().padStart(6, "0")} USDC`;
}
