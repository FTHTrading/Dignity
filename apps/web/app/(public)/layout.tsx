import Link from "next/link";
import type { ReactNode } from "react";

const NAV = [
  { href: "/evolution",        label: "Evolution"        },
  { href: "/platform",         label: "Platform"         },
  { href: "/status",           label: "Status"           },
  { href: "/economics",        label: "Economics"        },
  { href: "/path-forward",     label: "Path Forward"     },
  { href: "/investor-pathway", label: "Investor Pathway" },
  { href: "/data-room",        label: "Data Room"        },
  { href: "/contact",          label: "Contact"          },
];

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-obsidian text-white flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-obsidian/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="h-8 w-8 rounded border border-gold/40 bg-gold/10 flex items-center justify-center">
              <span className="text-gold text-xs font-bold tracking-widest">D</span>
            </div>
            <span className="font-semibold text-white tracking-wide text-base">Dignity</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="px-3 py-1.5 text-sm text-white/50 hover:text-white/90 hover:bg-white/[0.04] rounded-lg transition-colors"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Right CTA */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/contact"
              className="hidden md:inline-flex text-xs px-4 py-2 rounded-lg border border-gold/30 text-gold hover:bg-gold/10 transition-colors tracking-wide uppercase font-medium"
            >
              Institutional Inquiry
            </Link>
            <Link
              href="/sign-in"
              className="text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              Platform Access
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] mt-24">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="space-y-3 max-w-xs">
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded border border-gold/40 bg-gold/10 flex items-center justify-center">
                  <span className="text-gold text-xs font-bold">D</span>
                </div>
                <span className="text-white font-semibold text-sm tracking-wide">Dignity</span>
              </div>
              <p className="text-xs text-white/30 leading-relaxed">
                Institutional gold-backed digital securities platform. Validated operating
                infrastructure supporting serious capital markets participation.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              <div className="space-y-2">
                <p className="text-white/20 text-xs uppercase tracking-widest font-medium">Platform</p>
                <Link href="/platform"    className="block text-white/40 hover:text-white/70 transition-colors">Overview</Link>
                <Link href="/controls"    className="block text-white/40 hover:text-white/70 transition-colors">Controls</Link>
                <Link href="/proof"       className="block text-white/40 hover:text-white/70 transition-colors">Proof Center</Link>
              </div>
              <div className="space-y-2">
                <p className="text-white/20 text-xs uppercase tracking-widest font-medium">Company</p>
                <Link href="/evolution"   className="block text-white/40 hover:text-white/70 transition-colors">Evolution</Link>
                <Link href="/leadership"  className="block text-white/40 hover:text-white/70 transition-colors">Leadership</Link>
                <Link href="/roadmap"     className="block text-white/40 hover:text-white/70 transition-colors">Roadmap</Link>
                <Link href="/status"      className="block text-white/40 hover:text-white/70 transition-colors">Platform Status</Link>
              </div>
              <div className="space-y-2">
                <p className="text-white/20 text-xs uppercase tracking-widest font-medium">On-Chain</p>
                <Link href="/governance"  className="block text-white/40 hover:text-white/70 transition-colors">Governance</Link>
                <Link href="/supply"      className="block text-white/40 hover:text-white/70 transition-colors">Supply</Link>
                <Link href="/reserve"     className="block text-white/40 hover:text-white/70 transition-colors">Reserve</Link>
              </div>
              <div className="space-y-2">
                <p className="text-white/20 text-xs uppercase tracking-widest font-medium">Investors</p>
                <Link href="/fundability"      className="block text-white/40 hover:text-white/70 transition-colors">Fundability</Link>
                <Link href="/economics"        className="block text-white/40 hover:text-white/70 transition-colors">Economics</Link>
                <Link href="/path-forward"     className="block text-white/40 hover:text-white/70 transition-colors">Path Forward</Link>
                <Link href="/investor-pathway" className="block text-white/40 hover:text-white/70 transition-colors">Investor Pathway</Link>
                <Link href="/disclosures"      className="block text-white/40 hover:text-white/70 transition-colors">Disclosures</Link>
                <Link href="/data-room"        className="block text-white/40 hover:text-white/70 transition-colors">Data Room</Link>
                <Link href="/contact"          className="block text-white/40 hover:text-white/70 transition-colors">Contact</Link>
              </div>
              <div className="space-y-2">
                <p className="text-white/20 text-xs uppercase tracking-widest font-medium">Legal</p>
                <Link href="/disclosures" className="block text-white/40 hover:text-white/70 transition-colors">Terms</Link>
                <Link href="/disclosures" className="block text-white/40 hover:text-white/70 transition-colors">Privacy</Link>
              </div>
            </div>
          </div>
          <div className="gold-rule mt-10 mb-6" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/25">
            <span>© {new Date().getFullYear()} Dignity. All rights reserved.</span>
            <span>This site is for qualified institutional investors only. Not a public solicitation.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
