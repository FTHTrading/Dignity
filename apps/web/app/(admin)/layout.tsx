import { AppShell } from "@/components/shell";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AppShell variant="admin">{children}</AppShell>;
}
