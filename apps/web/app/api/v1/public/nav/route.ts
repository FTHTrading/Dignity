import { NextResponse } from "next/server";
import { getDemoReserveSummary } from "@/lib/adapters";

export async function GET() {
  const data = getDemoReserveSummary();
  return NextResponse.json({
    symbol: "DIGAU",
    navPerToken: data.navPerToken,
    totalSupply: data.totalIssuedTokens,
    currency: "USD",
    asOf: new Date().toISOString(),
    dataSource: "DEMO",
  });
}
