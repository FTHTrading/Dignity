// @dignity/attestation — reserve attestation and proof-anchor service

import { prisma } from "@dignity/db";
import { createHash } from "crypto";

export interface ProofPayload {
  attestationId: string;
  coverageRatio: number;
  reserveValueUsd: number;
  totalTokenSupply: string;
  verifiedAt: Date | null;
  attestor: string;
}

export class AttestationService {
  /** Returns the most recent verified attestation. */
  static async getLatest() {
    return prisma.reserveAttestation.findFirst({
      where: { status: "VERIFIED" },
      orderBy: { verifiedAt: "desc" },
      include: { evidence: true },
    });
  }

  /** Returns all attestations ordered newest first. */
  static async getHistory() {
    return prisma.reserveAttestation.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        evidence: { select: { id: true, fileName: true, uploadedAt: true } },
      },
    });
  }

  /**
   * Creates a proof anchor on-chain hash for a given attestation.
   * In demo mode this logs a deterministic hash locally.
   * In production this would be submitted to chain via the ReserveProofAnchor contract.
   */
  static async anchorProof(attestationId: string): Promise<{
    txHash: string;
    proofHash: string;
    anchoredAt: Date;
  }> {
    const attestation = await prisma.reserveAttestation.findUniqueOrThrow({
      where: { id: attestationId },
    });

    const payload: ProofPayload = {
      attestationId,
      coverageRatio: attestation.coverageRatio ?? 0,
      reserveValueUsd: attestation.totalReserveValue ?? 0,
      totalTokenSupply: attestation.totalTokenSupply ?? "0",
      verifiedAt: attestation.verifiedAt,
      attestor: attestation.attestor,
    };

    const proofHash =
      "0x" + createHash("sha256").update(JSON.stringify(payload)).digest("hex");
    const txHash =
      "0x" +
      createHash("sha256")
        .update(proofHash + attestationId)
        .digest("hex");
    const anchoredAt = new Date();

    await prisma.proofAnchor.upsert({
      where: { dataHash: proofHash },
      create: {
        dataHash: proofHash,
        dataType: "attestation",
        refId: attestationId,
        txHash,
        chainId: 84532,
        anchoredAt,
      },
      update: {
        txHash,
        anchoredAt,
      },
    });

    return { txHash, proofHash, anchoredAt };
  }
}
