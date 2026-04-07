import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { hasPermission } from "@dignity/auth";
import type { UserRole } from "@dignity/shared-types";
import { getDemoLiquiditySummary, getDemoVenues, getDemoMarketMakers } from "@/lib/adapters";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  if (!hasPermission(session.user.role as UserRole, "market_ops:read")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({
    liquidity: getDemoLiquiditySummary(),
    venues: getDemoVenues(),
    marketMakers: getDemoMarketMakers(),
  });
}
