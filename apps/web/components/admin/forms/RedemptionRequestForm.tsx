"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createRedemptionRequest } from "@/lib/actions/stablecoin";

export function RedemptionRequestForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const investorId = (fd.get("investorId") as string).trim();
    const units = parseFloat(fd.get("units") as string);
    const notes = (fd.get("notes") as string).trim() || undefined;

    if (!investorId) {
      setStatus("error");
      setMessage("Investor ID is required.");
      return;
    }
    if (isNaN(units) || units < 1) {
      setStatus("error");
      setMessage("Units must be a positive number.");
      return;
    }

    startTransition(async () => {
      try {
        await createRedemptionRequest({ investorId, units, notes });
        setStatus("success");
        setMessage("Redemption request submitted and queued for approval.");
        formRef.current?.reset();
        router.refresh();
      } catch (err) {
        setStatus("error");
        const msg = err instanceof Error ? err.message : "Failed to submit request.";
        setMessage(
          msg === "Unauthenticated"
            ? "You must be signed in."
            : msg === "Forbidden"
            ? "You do not have permission for this action."
            : msg
        );
      }
    });
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-xs text-white/50 uppercase tracking-wide">
            Investor ID
          </label>
          <input
            name="investorId"
            type="text"
            required
            placeholder="inv_..."
            className="w-full rounded-md bg-white/[0.05] border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/40 transition-colors"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-white/50 uppercase tracking-wide">
            Units (DIGAU)
          </label>
          <input
            name="units"
            type="number"
            min="1"
            step="1"
            required
            placeholder="e.g. 500"
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
            placeholder="Reason or reference"
            className="w-full rounded-md bg-white/[0.05] border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/40 transition-colors"
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-white/10 hover:bg-white/15 text-white text-sm font-semibold px-4 py-2 border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? "Submitting…" : "Submit Redemption Request"}
        </button>
        {status === "success" && (
          <span className="text-sm text-green-400">✓ {message}</span>
        )}
        {status === "error" && (
          <span className="text-sm text-red-400">✗ {message}</span>
        )}
      </div>
    </form>
  );
}
