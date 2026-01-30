import { ReactNode } from "react";
import ClientNavbar from "./components/ClientNavbar";

export default function StudentDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white">
      <ClientNavbar />
      <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
