import { ReactNode } from "react";
import ClientNavbar from "./components/ClientNavbar";
import NoSSR from "@/components/NoSSR";

export default function StudentDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      <NoSSR>
        <ClientNavbar />
        <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
      </NoSSR>
    </div>
  );
}
