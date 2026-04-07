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
  if (!hasPermission(session.user.role as UserRole, "redemption:approve")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const { investorId, units, navAtRequest, notes } = body as {
    investorId?: string;
    units?: number;
    navAtRequest?: number;
    notes?: string;
  };

  if (!investorId || !units || units <= 0) {
    return NextResponse.json(
      { error: "investorId and positive units are required" },
      { status: 400 }
    );
  }

  const request = await prisma.approvalRequest.create({
    data: {
      requestType: "REDEMPTION_APPROVE",
      status: "PENDING",
      requestedById: session.user.id ?? undefined,
      requestedByRole: session.user.role,
      title: `Redemption — ${investorId} / ${units} DIGAU`,
      description: notes ?? undefined,
      payload: { investorId, units, navAtRequest },
    },
  });

  await recordAuditEvent({
    category: AuditEventCategory.TOKEN_ACTION,
    action: "redemption_request_submitted",
    actorId: session.user.id ?? undefined,
    actorRole: session.user.role,
    entityType: "ApprovalRequest",
    entityId: request.id,
    after: { investorId, units, navAtRequest },
    description: `Redemption request for investor ${investorId}: ${units} DIGAU`,
  });

  return NextResponse.json({ success: true, requestId: request.id }, { status: 201 });
}
