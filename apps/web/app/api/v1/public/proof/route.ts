import { NextResponse } from "next/server";
import { getDemoReserveSummary } from "@/lib/adapters";

export async function GET() {
  const data = getDemoReserveSummary();
  return NextResponse.json({
    coverageRatio: data.coverageRatio,
    totalReserveUsd: data.totalReserveUsd,
    totalIssuedTokens: data.totalIssuedTokens,
    navPerToken: data.navPerToken,
    lastAuditDate: data.lastAuditDate,
    lots: data.lots,
    dataSource: "DEMO",
  });
}
