// @dignity/compliance-engine — jurisdiction rule checker

import { prisma } from "@dignity/db";

export class JurisdictionChecker {
  /**
   * Returns whether a given jurisdiction is allowed for investment,
   * and what conditions apply.
   */
  static async check(jurisdiction: string): Promise<{
    allowed: boolean;
    requiresAccreditation: boolean;
    lockupDays: number;
    notes?: string | null;
  }> {
    const rule = await prisma.jurisdictionRule.findFirst({
      where: {
        countryCode: jurisdiction.toUpperCase(),
        effectiveDate: { lte: new Date() },
      },
      orderBy: { effectiveDate: "desc" },
    });

    if (!rule) {
      // Default: deny unlisted jurisdictions
      return {
        allowed: false,
        requiresAccreditation: true,
        lockupDays: 0,
        notes: "Jurisdiction not in approved list",
      };
    }

    return {
      allowed: rule.allowed,
      requiresAccreditation: rule.accreditationRequired,
      lockupDays: 0,
      notes: rule.notes ?? null,
    };
  }

  /** Returns the full list of allowed jurisdictions. */
  static async allowedList(): Promise<string[]> {
    const rules = await prisma.jurisdictionRule.findMany({
      where: {
        allowed: true,
        effectiveDate: { lte: new Date() },
      },
      select: { countryCode: true },
    });
    return rules.map((r: { countryCode: string }) => r.countryCode);
  }
}
