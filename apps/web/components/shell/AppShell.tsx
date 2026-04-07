"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@dignity/ui";

const ADMIN_NAV = [
  { href: "/admin/overview",    label: "Overview" },
  { href: "/admin/securities",  label: "Securities" },
  { href: "/admin/investors",   label: "Investors" },
  { href: "/admin/reserve",     label: "Reserve" },
  { href: "/admin/treasury",    label: "Treasury" },
  { href: "/admin/market-ops",  label: "Market Ops" },
  { href: "/admin/compliance",  label: "Compliance" },
  { href: "/admin/stablecoin",  label: "Stablecoin Rails" },
  { href: "/admin/lp",          label: "LP Dashboard" },
  { href: "/admin/audit",       label: "Audit Log" },
];

const INVESTOR_NAV = [
  { href: "/investor/dashboard",  label: "Dashboard" },
  { href: "/investor/portfolio",  label: "Portfolio" },
  { href: "/investor/subscribe",  label: "Subscribe" },
  { href: "/investor/redeem",     label: "Redeem" },
  { href: "/investor/documents",  label: "Documents" },
];

interface AppShellProps {
  children: React.ReactNode;
  variant: "admin" | "investor";
}

export function AppShell({ children, variant }: AppShellProps) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const nav = variant === "admin" ? ADMIN_NAV : INVESTOR_NAV;

  return (
    <div className="flex min-h-screen bg-obsidian text-white">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 flex flex-col border-r border-white/[0.06] bg-graphite/40">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/[0.06]">
          <div className="h-7 w-7 rounded bg-gold/20 border border-gold/40 flex items-center justify-center">
            <span className="text-gold text-xs font-bold">D</span>
          </div>
          <span className="text-white font-semibold tracking-wide">Dignity</span>
          {variant === "admin" && (
            <span className="ml-auto text-[10px] text-gold/60 uppercase tracking-widest">Issuer</span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                pathname.startsWith(item.href)
                  ? "bg-gold/10 text-gold"
                  : "text-white/50 hover:text-white/80 hover:bg-white/[0.04]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User footer */}
        <div className="border-t border-white/[0.06] px-4 py-4">
          <p className="text-xs text-white/40 truncate mb-3">{session?.user?.email}</p>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-xs text-white/30 hover:text-white/70 transition-colors"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {children}
      </div>
    </div>
  );
}
