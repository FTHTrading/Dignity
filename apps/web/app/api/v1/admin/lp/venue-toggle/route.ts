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
  const { venueId, targetStatus, reason } = body as {
    venueId?: string;
    targetStatus?: string;
    reason?: string;
  };

  if (!venueId || !targetStatus) {
    return NextResponse.json(
      { error: "venueId and targetStatus are required" },
      { status: 400 }
    );
  }

  const venue = await prisma.venue.findUnique({ where: { id: venueId } });
  if (!venue) {
    return NextResponse.json({ error: "Venue not found" }, { status: 404 });
  }

  const request = await prisma.approvalRequest.create({
    data: {
      requestType: "VENUE_TOGGLE",
      status: "PENDING",
      requestedById: session.user.id ?? undefined,
      requestedByRole: session.user.role,
      title: `Toggle venue: ${venue.name} → ${targetStatus}`,
      description: reason ?? undefined,
      payload: { venueId, targetStatus, currentStatus: venue.status },
    },
  });

  await recordAuditEvent({
    category: AuditEventCategory.MARKET_OPS,
    action: "venue_toggle_requested",
    actorId: session.user.id ?? undefined,
    actorRole: session.user.role,
    entityType: "Venue",
    entityId: venueId,
    before: { status: venue.status },
    after: { status: targetStatus },
    description: `Venue toggle request: ${venue.name} from ${venue.status} to ${targetStatus}`,
  });

  return NextResponse.json({ success: true, requestId: request.id }, { status: 201 });
}
