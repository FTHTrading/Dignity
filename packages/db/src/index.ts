// @dignity/db — main export
// Re-exports Prisma client as singleton

import { PrismaClient } from "./generated/client";

declare global {
  // eslint-disable-next-line no-var
  var __dignityPrisma: PrismaClient | undefined;
}

export const prisma =
  globalThis.__dignityPrisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.__dignityPrisma = prisma;
}

export * from "./generated/client";
