"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleVenueStatus } from "@/lib/actions/lp";

type VenueStatus = "ACTIVE" | "SUSPENDED" | "PENDING_APPROVAL" | "UNDER_REVIEW" | "TERMINATED";

const TRANSITIONS: Record<VenueStatus, { label: string; target: VenueStatus }[]> = {
  ACTIVE:           [{ label: "Suspend", target: "SUSPENDED" }],
  SUSPENDED:        [{ label: "Reactivate", target: "ACTIVE" }],
  PENDING_APPROVAL: [{ label: "Activate", target: "ACTIVE" }, { label: "Reject", target: "SUSPENDED" }],
  UNDER_REVIEW:     [{ label: "Activate", target: "ACTIVE" }, { label: "Suspend", target: "SUSPENDED" }],
  TERMINATED:       [],
};

interface VenueToggleButtonProps {
  venueId: string;
  venueName: string;
  currentStatus: string;
}

export function VenueToggleButton({ venueId, venueName, currentStatus }: VenueToggleButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeTarget, setActiveTarget] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [reason, setReason] = useState("");

  const transitions = TRANSITIONS[currentStatus as VenueStatus] ?? [];

  if (transitions.length === 0) return null;

  function handleToggle(targetStatus: string) {
    setActiveTarget(targetStatus);
    startTransition(async () => {
      try {
        await toggleVenueStatus({ venueId, targetStatus, reason: reason.trim() || undefined });
        setStatus("success");
        setMessage(`Toggle request queued: → ${targetStatus}`);
        setReason("");
        setActiveTarget(null);
        router.refresh();
      } catch (err) {
        setStatus("error");
        const msg = err instanceof Error ? err.message : "Failed.";
        setMessage(
          msg === "Unauthenticated"
            ? "Sign in required."
            : msg === "Forbidden"
            ? "Permission denied."
            : msg
        );
        setActiveTarget(null);
      }
    });
  }

  return (
    <div className="space-y-2 pt-2 border-t border-white/[0.06]">
      <div className="flex flex-wrap gap-2">
        {transitions.map(({ label, target }) => (
          <button
            key={target}
            onClick={() => handleToggle(target)}
            disabled={isPending}
            className="rounded text-xs font-medium px-3 py-1.5 border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-white/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isPending && activeTarget === target ? "Requesting…" : label}
          </button>
        ))}
      </div>
      <input
        type="text"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Reason (optional)"
        className="w-full rounded bg-white/[0.03] border border-white/[0.07] px-2 py-1 text-xs text-white/70 placeholder:text-white/25 focus:outline-none focus:border-gold/30 transition-colors"
      />
      {status === "success" && <p className="text-xs text-green-400">✓ {message}</p>}
      {status === "error"   && <p className="text-xs text-red-400">✗ {message}</p>}
    </div>
  );
}
