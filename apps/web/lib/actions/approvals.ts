"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@dignity/db";
import { requirePermission, recordAuditEvent } from "@/lib/server";
import { AuditEventCategory } from "@dignity/shared-types";

export async function decideApproval(input: {
  requestId: string;
  decision: "APPROVED" | "REJECTED";
  note?: string;
}): Promise<void> {
  const session = await requirePermission("compliance:write");
  const { id: actorId, role: actorRole } = session.user;

  const request = await prisma.approvalRequest.findUnique({
    where: { id: input.requestId },
  });
  if (!request) throw new Error("Approval request not found");
  if (request.status !== "PENDING") {
    throw new Error(`Request is already ${request.status.toLowerCase()}`);
  }

  await prisma.approvalRequest.update({
    where: { id: input.requestId },
    data: {
      status: input.decision,
      decidedAt: new Date(),
      decisionNote: input.note ?? null,
      approvedById: input.decision === "APPROVED" ? actorId : null,
      rejectedById: input.decision === "REJECTED" ? actorId : null,
    },
  });

  await recordAuditEvent({
    category: AuditEventCategory.COMPLIANCE,
    action: `APPROVAL_${input.decision}`,
    actorId,
    actorRole,
    description: `${input.decision} — "${request.title}"${input.note ? `: ${input.note}` : ""}`,
    entityType: "ApprovalRequest",
    entityId: input.requestId,
  });

  revalidatePath("/admin/stablecoin");
  revalidatePath("/admin/lp");
  revalidatePath(`/admin/approvals/${input.requestId}`);
}
