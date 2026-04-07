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
  if (!hasPermission(session.user.role as UserRole, "reserve:write")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const { reportId, notes } = body as { reportId?: string; notes?: string };

  if (!reportId) {
    return NextResponse.json({ error: "reportId is required" }, { status: 400 });
  }

  const report = await prisma.reserveReport.findUnique({ where: { id: reportId } });
  if (!report) {
    return NextResponse.json({ error: "Reserve report not found" }, { status: 404 });
  }
  if (report.status === "PUBLISHED") {
    return NextResponse.json({ error: "Report is already published" }, { status: 409 });
  }

  const request = await prisma.approvalRequest.create({
    data: {
      requestType: "RESERVE_REPORT_PUBLISH",
      status: "PENDING",
      requestedById: session.user.id ?? undefined,
      requestedByRole: session.user.role,
      title: `Publish reserve report: ${report.title}`,
      description: notes ?? undefined,
      payload: { reportId, currentStatus: report.status },
    },
  });

  await recordAuditEvent({
    category: AuditEventCategory.RESERVE,
    action: "reserve_report_publish_requested",
    actorId: session.user.id ?? undefined,
    actorRole: session.user.role,
    entityType: "ReserveReport",
    entityId: reportId,
    before: { status: report.status },
    after: { status: "PUBLISHED" },
    description: `Publication requested for reserve report: ${report.title}`,
  });

  return NextResponse.json({ success: true, requestId: request.id }, { status: 201 });
}
