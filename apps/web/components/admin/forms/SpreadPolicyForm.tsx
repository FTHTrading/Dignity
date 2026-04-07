"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateSpreadPolicy } from "@/lib/actions/lp";

interface SpreadPolicyFormProps {
  marketMakerId: string;
  currentMaxBps?: number;
  currentTargetBps?: number;
}

export function SpreadPolicyForm({
  marketMakerId,
  currentMaxBps,
  currentTargetBps,
}: SpreadPolicyFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const maxSpreadBps = parseFloat(fd.get("maxSpreadBps") as string);
    const targetSpreadBps = parseFloat(fd.get("targetSpreadBps") as string);
    const notes = (fd.get("notes") as string).trim() || undefined;

    if (isNaN(maxSpreadBps) || maxSpreadBps < 1) {
      setStatus("error");
      setMessage("Max spread must be a positive number.");
      return;
    }
    if (isNaN(targetSpreadBps) || targetSpreadBps < 1) {
      setStatus("error");
      setMessage("Target spread must be a positive number.");
      return;
    }
    if (targetSpreadBps > maxSpreadBps) {
      setStatus("error");
      setMessage("Target spread cannot exceed max spread.");
      return;
    }

    startTransition(async () => {
      try {
        await updateSpreadPolicy({ marketMakerId, maxSpreadBps, targetSpreadBps, notes });
        setStatus("success");
        setMessage("Spread policy updated and queued for approval.");
        formRef.current?.reset();
        router.refresh();
      } catch (err) {
        setStatus("error");
        const msg = err instanceof Error ? err.message : "Failed to update policy.";
        setMessage(
          msg === "Unauthenticated"
            ? "Sign in required."
            : msg === "Forbidden"
            ? "Permission denied."
            : msg
        );
      }
    });
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      {(currentMaxBps != null || currentTargetBps != null) && (
        <p className="text-xs text-white/40">
          Current policy — max: <span className="text-white/70">{currentMaxBps ?? "—"} bps</span> /
          target: <span className="text-white/70">{currentTargetBps ?? "—"} bps</span>
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-xs text-white/50 uppercase tracking-wide">
            Max Spread (bps)
          </label>
          <input
            name="maxSpreadBps"
            type="number"
            min="1"
            step="0.5"
            required
            defaultValue={currentMaxBps}
            placeholder="e.g. 50"
            className="w-full rounded-md bg-white/[0.05] border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/40 transition-colors"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-white/50 uppercase tracking-wide">
            Target Spread (bps)
          </label>
          <input
            name="targetSpreadBps"
            type="number"
            min="1"
            step="0.5"
            required
            defaultValue={currentTargetBps}
            placeholder="e.g. 25"
            className="w-full rounded-md bg-white/[0.05] border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/40 transition-colors"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-white/50 uppercase tracking-wide">
            Notes (optional)
          </label>
          <input
            name="notes"
            type="text"
            placeholder="Reason for change"
            className="w-full rounded-md bg-white/[0.05] border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/40 transition-colors"
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-gold hover:bg-gold-light text-black text-sm font-semibold px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? "Updating…" : "Update Spread Policy"}
        </button>
        {status === "success" && <span className="text-sm text-green-400">✓ {message}</span>}
        {status === "error"   && <span className="text-sm text-red-400">✗ {message}</span>}
      </div>
    </form>
  );
}
