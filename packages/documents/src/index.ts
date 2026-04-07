// @dignity/documents — disclosure and policy document service

import { prisma } from "@dignity/db";

export class DocumentService {
  /** Returns the current active disclosure for a given slug/type. */
  static async getActiveDisclosure(docSlug: string) {
    return prisma.disclosureVersion.findFirst({
      where: { slug: docSlug, isPublic: true },
      orderBy: { createdAt: "desc" },
    });
  }

  /** Returns all public disclosures. */
  static async getAllDisclosures(_programId: string) {
    return prisma.disclosureVersion.findMany({
      where: { isPublic: true },
      orderBy: { slug: "asc" },
    });
  }

  /** Returns policy files for a program. */
  static async getPolicies(programId: string) {
    return prisma.policyFile.findMany({
      where: { programId, status: "ACTIVE" },
      orderBy: { policyType: "asc" },
    });
  }

  /** Returns system alerts that haven't been resolved. */
  static async getActiveAlerts(_programId: string) {
    return prisma.systemAlert.findMany({
      where: { resolvedAt: null },
      orderBy: { occurredAt: "desc" },
    });
  }
}
