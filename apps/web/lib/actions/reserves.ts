"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@dignity/db";
import { requirePermission, enforceSeparationOfDuties, recordAuditEvent } from "@/lib/server";
import { AuditEventCategory } from "@dignity/shared-types";
import type { UserRole } from "@dignity/shared-types";

export async function publishReserveReport(input: {
  reportId: string;
  notes?: string;
}): Promise<void> {
  const session = await requirePermission("reserve:write");
  const { id: actorId, role: actorRole } = session.user;
  enforceSeparationOfDuties(actorRole as UserRole, "reserve:publish_report");

  const report = await prisma.reserveReport.findUnique({
    where: { id: input.reportId },
  });
  if (!report) throw new Error("Report not found");
  if (report.status === "PUBLISHED") throw new Error("Report is already published");

  await prisma.reserveReport.update({
    where: { id: input.reportId },
    data: {
      status: "PUBLISHED",
      publishedAt: new Date(),
      notes: input.notes ?? report.notes,
    },
  });

  await prisma.approvalRequest.create({
    data: {
      requestType: "RESERVE_REPORT_PUBLISH",
      status: "APPROVED",
      title: `Reserve Report Published: ${report.title}`,
      description: input.notes ?? null,
      requestedByRole: actorRole,
      requestedById: actorId,
      requestedAt: new Date(),
      decidedAt: new Date(),
      payload: { reportId: input.reportId },
    },
  });

  await recordAuditEvent({
    category: AuditEventCategory.RESERVE,
    action: "RESERVE_REPORT_PUBLISHED",
    actorId,
    actorRole,
    description: `Published reserve report: ${report.title}`,
    entityType: "ReserveReport",
    entityId: input.reportId,
  });

  revalidatePath("/admin/reserve");
  revalidatePath(`/admin/reports/${input.reportId}`);
  revalidatePath("/public/proof-center");
}
