"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin/overview";
  const error = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(error ? "Invalid credentials." : null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.ok) {
      router.push(callbackUrl);
    } else {
      setErr("Invalid email or password.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-white/50 text-xs mb-1.5 uppercase tracking-wider">
          Email
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#C9A84C]/50 focus:ring-1 focus:ring-[#C9A84C]/30 transition"
          placeholder="admin@dignity.demo"
        />
      </div>

      <div>
        <label className="block text-white/50 text-xs mb-1.5 uppercase tracking-wider">
          Password
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#C9A84C]/50 focus:ring-1 focus:ring-[#C9A84C]/30 transition"
          placeholder="••••••••"
        />
      </div>

      {err && (
        <div className="px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {err}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-2 w-full py-2.5 rounded-lg bg-[#C9A84C] text-black text-sm font-semibold hover:bg-[#C9A84C]/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {loading ? "Signing in…" : "Sign In"}
      </button>
    </form>
  );
}

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-10 w-10 rounded bg-[#C9A84C]/20 border border-[#C9A84C]/40 flex items-center justify-center">
            <span className="text-[#C9A84C] text-sm font-bold tracking-widest">D</span>
          </div>
          <span className="text-white font-semibold tracking-wide text-xl">Dignity</span>
        </div>

        <div className="border border-white/[0.08] rounded-xl p-8 bg-white/[0.03]">
          <h1 className="text-white text-lg font-semibold mb-1">Sign in</h1>
          <p className="text-white/40 text-sm mb-6">Admin &amp; Institutional Portal</p>
          <Suspense fallback={null}>
            <SignInForm />
          </Suspense>
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          Demo: admin@dignity.demo / Demo1234!
        </p>
      </div>
    </main>
  );
}
