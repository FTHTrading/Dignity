#!/usr/bin/env node
// scripts/validate-env.js — validates required environment variables at startup

const required = [
  "DATABASE_URL",
  "NEXTAUTH_SECRET",
  "NEXTAUTH_URL",
  "REDIS_URL",
];

const recommended = [
  "ETH_RPC_URL",
  "KYC_PROVIDER_KEY",
  "STORAGE_PROVIDER",
];

let hasError = false;

console.log("\n  Dignity — Environment Validation\n  ─────────────────────────────────");

for (const key of required) {
  if (!process.env[key]) {
    console.error(`  [MISSING] ${key} is required`);
    hasError = true;
  } else {
    console.log(`  [OK]      ${key}`);
  }
}

for (const key of recommended) {
  if (!process.env[key]) {
    console.warn(`  [WARN]    ${key} not set (optional but recommended)`);
  }
}

console.log("  ─────────────────────────────────\n");

if (hasError) {
  console.error("  Environment validation FAILED. See .env.example for required values.\n");
  process.exit(1);
}

console.log("  Environment validation passed.\n");
