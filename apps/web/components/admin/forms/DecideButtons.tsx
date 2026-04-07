"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { decideApproval } from "@/lib/actions/approvals";

interface DecideButtonsProps {
  requestId: string;
  requestTitle: string;
}

export function DecideButtons({ requestId, requestTitle }: DecideButtonsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeDecision, setActiveDecision] = useState<"APPROVED" | "REJECTED" | null>(null);
  const [showRejectNote, setShowRejectNote] = useState(false);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function decide(decision: "APPROVED" | "REJECTED") {
    setActiveDecision(decision);
    startTransition(async () => {
      try {
        await decideApproval({ requestId, decision, note: note.trim() || undefined });
        setStatus("success");
        setMessage(`Request ${decision.toLowerCase()}.`);
        router.refresh();
      } catch (err) {
        setStatus("error");
        const msg = err instanceof Error ? err.message : "Failed.";
        setMessage(
          msg === "Unauthenticated"
            ? "Sign in required."
            : msg === "Forbidden"
            ? "You do not have permission to decide on approvals."
            : msg
        );
        setActiveDecision(null);
      }
    });
  }

  if (status === "success") {
    return <p className="text-sm text-green-400">✓ {message}</p>;
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => decide("APPROVED")}
          disabled={isPending}
          className="rounded-md bg-green-700/80 hover:bg-green-600 text-white text-sm font-medium px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending && activeDecision === "APPROVED" ? "Approving…" : "Approve"}
        </button>
        <button
          onClick={() => setShowRejectNote(true)}
          disabled={isPending}
          className="rounded-md bg-red-800/70 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Reject
        </button>
      </div>

      {showRejectNote && (
        <div className="space-y-2 p-3 rounded-md border border-red-900/40 bg-red-950/20">
          <p className="text-xs text-white/60">Rejecting: <span className="text-white/80">{requestTitle}</span></p>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Rejection reason (recommended)"
            rows={2}
            className="w-full rounded bg-white/[0.04] border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-red-500/40 resize-none transition-colors"
          />
          <div className="flex gap-2">
            <button
              onClick={() => decide("REJECTED")}
              disabled={isPending}
              className="rounded bg-red-700/80 hover:bg-red-600 text-white text-sm font-medium px-3 py-1.5 disabled:opacity-50 transition-colors"
            >
              {isPending && activeDecision === "REJECTED" ? "Rejecting…" : "Confirm Reject"}
            </button>
            <button
              onClick={() => { setShowRejectNote(false); setNote(""); }}
              disabled={isPending}
              className="rounded bg-white/[0.06] hover:bg-white/[0.10] text-white/60 text-sm px-3 py-1.5 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {status === "error" && <p className="text-sm text-red-400">✗ {message}</p>}
    </div>
  );
}
