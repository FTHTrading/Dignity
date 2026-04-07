"use client";

import { useState } from "react";
import { TopBar } from "@/components/shell";
import { Card, CardContent } from "@dignity/ui";

export default function RedeemPage() {
  const [tokenAmount, setTokenAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const navPerToken = 62.4;
  const estimatedUsd = tokenAmount ? (parseFloat(tokenAmount) * navPerToken).toLocaleString(undefined, { maximumFractionDigits: 2 }) : "—";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await fetch("/api/v1/investor/redeem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tokenAmount: parseFloat(tokenAmount) }),
    });
    setDone(true);
    setSubmitting(false);
  }

  if (done) {
    return (
      <>
        <TopBar title="Redeem" />
        <div className="flex-1 flex items-center justify-center p-8">
          <Card>
            <CardContent className="py-12 text-center space-y-3">
              <p className="text-2xl font-semibold text-white">Redemption Requested</p>
              <p className="text-sm text-white/50">Your tokens are in escrow. Settlement proceeds upon issuer confirmation.</p>
              <a href="/investor/dashboard" className="inline-block mt-4 text-sm text-gold hover:text-gold-light">← Back to Dashboard</a>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <TopBar title="Redeem" subtitle="Convert DIGAU tokens back to USD" />
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-lg mx-auto">
          <Card>
            <CardContent className="py-8 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-sm text-white/60">DIGAU Tokens to Redeem</label>
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    required
                    value={tokenAmount}
                    onChange={(e) => setTokenAmount(e.target.value)}
                    placeholder="e.g. 100"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/40"
                  />
                </div>

                <div className="flex justify-between py-3 border-t border-white/[0.06]">
                  <span className="text-sm text-white/40">Estimated USD redemption</span>
                  <span className="text-sm font-medium text-white">${estimatedUsd}</span>
                </div>

                <button
                  type="submit"
                  disabled={submitting || !tokenAmount || parseFloat(tokenAmount) <= 0}
                  className="w-full py-3 rounded-lg border border-white/20 text-white text-sm hover:bg-white/[0.05] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {submitting ? "Submitting…" : "Submit Redemption Request"}
                </button>
              </form>

              <p className="text-xs text-white/25 text-center">
                Redemption terms as per your subscription agreement. Tokens enter escrow on submission.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
