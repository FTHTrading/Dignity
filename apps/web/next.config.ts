import type { NextConfig } from "next";

const config: NextConfig = {
  transpilePackages: [
    "@dignity/ui",
    "@dignity/shared-types",
    "@dignity/auth",
    "@dignity/db",
    "@dignity/analytics",
    "@dignity/attestation",
    "@dignity/audit",
    "@dignity/compliance-engine",
    "@dignity/documents",
    "@dignity/market-ops",
    "@dignity/reserve-registry",
    "@dignity/token-engine",
    "@dignity/treasury",
  ],
  experimental: {
    serverActions: { allowedOrigins: ["localhost:3300"] },
  },
  images: {
    domains: [],
  },
};

export default config;
