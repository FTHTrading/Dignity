"use client";

import { useState } from "react";
import { TopBar } from "@/components/shell";
import { Card, CardContent } from "@dignity/ui";

export default function SubscribePage() {
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const navPerToken = 62.4;
  const estimatedTokens = amount ? (parseFloat(amount) / navPerToken).toFixed(4) : "—";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await fetch("/api/v1/investor/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ investmentAmountUsd: parseFloat(amount) }),
    });
    setDone(true);
    setSubmitting(false);
  }

  if (done) {
    return (
      <>
        <TopBar title="Subscribe" />
        <div className="flex-1 flex items-center justify-center p-8">
          <Card>
            <CardContent className="py-12 text-center space-y-3">
              <p className="text-2xl font-semibold text-gold">Request Submitted</p>
              <p className="text-sm text-white/50">Your subscription is pending compliance review and issuance confirmation.</p>
              <a href="/investor/dashboard" className="inline-block mt-4 text-sm text-gold hover:text-gold-light">← Back to Dashboard</a>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <TopBar title="Subscribe" subtitle="Purchase DIGAU gold-backed securities" />
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-lg mx-auto">
          <Card>
            <CardContent className="py-8 space-y-6">
              <div>
                <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Current NAV</p>
                <p className="text-2xl font-semibold text-white">$62.40 <span className="text-sm font-normal text-white/40">per DIGAU</span></p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-sm text-white/60">Investment Amount (USD)</label>
                  <input
                    type="number"
                    min="5000"
                    step="100"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="e.g. 50000"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/40"
                  />
                  <p className="text-xs text-white/30">Minimum subscription: $5,000 USD</p>
                </div>

                <div className="flex justify-between py-3 border-t border-white/[0.06]">
                  <span className="text-sm text-white/40">Estimated DIGAU tokens</span>
                  <span className="text-sm font-medium text-gold">{estimatedTokens}</span>
                </div>

                <button
                  type="submit"
                  disabled={submitting || !amount || parseFloat(amount) < 5000}
                  className="w-full py-3 rounded-lg bg-gold text-obsidian font-semibold text-sm hover:bg-gold-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {submitting ? "Submitting…" : "Submit Subscription Request"}
                </button>
              </form>

              <p className="text-xs text-white/25 text-center">
                Subscriptions are subject to KYC/AML review. Tokens are issued after compliance confirmation.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
