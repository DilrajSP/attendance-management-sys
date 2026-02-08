import { ReactNode } from "react";
import Navbar from "./components/Navbar";
import NoSSR from "@/components/NoSSR";

export default function TeacherDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      <NoSSR>
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
      </NoSSR>
    </div>
  );
}
