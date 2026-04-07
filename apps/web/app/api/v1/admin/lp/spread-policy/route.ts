import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { hasPermission } from "@dignity/auth";
import type { UserRole } from "@dignity/shared-types";
import { prisma } from "@dignity/db";
import { recordAuditEvent } from "@/lib/server";
import { AuditEventCategory } from "@dignity/shared-types";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }
  if (!hasPermission(session.user.role as UserRole, "market_ops:write")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const { marketMakerId, bidSpreadBps, askSpreadBps, maxInventoryUsd, notes } = body as {
    marketMakerId?: string;
    bidSpreadBps?: number;
    askSpreadBps?: number;
    maxInventoryUsd?: number;
    notes?: string;
  };

  if (!marketMakerId || bidSpreadBps == null || askSpreadBps == null) {
    return NextResponse.json(
      { error: "marketMakerId, bidSpreadBps, and askSpreadBps are required" },
      { status: 400 }
    );
  }

  const existing = await prisma.spreadPolicy.findFirst({
    where: { marketMakerId, active: true },
    orderBy: { effectiveFrom: "desc" },
  });

  const request = await prisma.approvalRequest.create({
    data: {
      requestType: "SPREAD_POLICY_CHANGE",
      status: "PENDING",
      requestedById: session.user.id ?? undefined,
      requestedByRole: session.user.role,
      title: `Spread policy update — MM ${marketMakerId}`,
      description: notes ?? undefined,
      payload: { marketMakerId, bidSpreadBps, askSpreadBps, maxInventoryUsd },
    },
  });

  await recordAuditEvent({
    category: AuditEventCategory.MARKET_OPS,
    action: "spread_policy_change_requested",
    actorId: session.user.id ?? undefined,
    actorRole: session.user.role,
    entityType: "SpreadPolicy",
    entityId: existing?.id,
    before: existing
      ? { maxSpreadBps: existing.maxSpreadBps, targetSpreadBps: existing.targetSpreadBps }
      : undefined,
    after: { maxSpreadBps: bidSpreadBps, targetSpreadBps: askSpreadBps, maxInventoryUsd },
    description: `Spread policy change requested for market maker ${marketMakerId}`,
  });

  return NextResponse.json({ success: true, requestId: request.id }, { status: 201 });
}
