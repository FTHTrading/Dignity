"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { publishReserveReport } from "@/lib/actions/reserves";

interface PublishReportButtonProps {
  reportId: string;
  reportTitle: string;
  currentStatus: string;
}

export function PublishReportButton({
  reportId,
  reportTitle,
  currentStatus,
}: PublishReportButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  if (currentStatus === "PUBLISHED") {
    return <p className="text-xs text-green-400/80">✓ Published</p>;
  }

  function handlePublish() {
    startTransition(async () => {
      try {
        await publishReserveReport({ reportId, notes: notes.trim() || undefined });
        setResult("success");
        setMessage("Report published successfully.");
        router.refresh();
      } catch (err) {
        setResult("error");
        const msg = err instanceof Error ? err.message : "Failed to publish.";
        setMessage(
          msg === "Unauthenticated"
            ? "Sign in required."
            : msg === "Forbidden" || msg.includes("SoD")
            ? "You do not have permission to publish this report."
            : msg
        );
      }
    });
  }

  if (result === "success") {
    return <p className="text-sm text-green-400">✓ {message}</p>;
  }

  return (
    <div className="space-y-3">
      {!showConfirm ? (
        <button
          onClick={() => setShowConfirm(true)}
          className="rounded-md bg-gold hover:bg-gold-light text-black text-sm font-semibold px-4 py-2 transition-colors"
        >
          Publish Report
        </button>
      ) : (
        <div className="space-y-3 p-4 rounded-md border border-gold/20 bg-gold/[0.04]">
          <p className="text-sm text-white/80">
            Publish <span className="font-medium text-white">{reportTitle}</span>? This makes it visible on the public proof center.
          </p>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Publication notes (optional)"
            rows={2}
            className="w-full rounded bg-white/[0.04] border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/30 resize-none transition-colors"
          />
          <div className="flex gap-2">
            <button
              onClick={handlePublish}
              disabled={isPending}
              className="rounded-md bg-gold hover:bg-gold-light text-black text-sm font-semibold px-4 py-2 disabled:opacity-50 transition-colors"
            >
              {isPending ? "Publishing…" : "Confirm Publish"}
            </button>
            <button
              onClick={() => { setShowConfirm(false); setNotes(""); }}
              disabled={isPending}
              className="rounded-md bg-white/[0.06] hover:bg-white/[0.10] text-white/60 text-sm px-4 py-2 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {result === "error" && <p className="text-sm text-red-400">✗ {message}</p>}
    </div>
  );
}
