import { AppShell } from "@/components/shell";

export default function InvestorLayout({ children }: { children: React.ReactNode }) {
  return <AppShell variant="investor">{children}</AppShell>;
}
