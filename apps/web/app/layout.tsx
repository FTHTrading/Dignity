import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: {
    default: "Dignity | Institutional Gold-Backed Securities",
    template: "%s | Dignity",
  },
  description:
    "Fully-reserved, institutionally-issued digital gold securities with on-chain proof of reserve.",
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? "http://localhost:3300"),
  openGraph: {
    type: "website",
    siteName: "Dignity",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
