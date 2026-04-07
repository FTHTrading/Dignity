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
  if (!hasPermission(session.user.role as UserRole, "treasury:write")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const { units, reserveLotId, notes } = body as {
    units?: number;
    reserveLotId?: string;
    notes?: string;
  };

  if (!units || units <= 0) {
    return NextResponse.json({ error: "units must be a positive number" }, { status: 400 });
  }

  const request = await prisma.approvalRequest.create({
    data: {
      requestType: "MINT_REQUEST",
      status: "PENDING",
      requestedById: session.user.id ?? undefined,
      requestedByRole: session.user.role,
      title: `Mint ${units.toLocaleString()} DIGAU`,
      description: notes ?? undefined,
      payload: { units, reserveLotId },
    },
  });

  await recordAuditEvent({
    category: AuditEventCategory.TOKEN_ACTION,
    action: "mint_request_submitted",
    actorId: session.user.id ?? undefined,
    actorRole: session.user.role,
    entityType: "ApprovalRequest",
    entityId: request.id,
    after: { units, reserveLotId },
    description: `Mint request for ${units} DIGAU submitted, pending approval`,
  });

  return NextResponse.json({ success: true, requestId: request.id }, { status: 201 });
}
