import AuthCard from "@/components/auth/AuthCard";
import Footer from "@/components/layout/Footer";
import NoSSR from "@/components/NoSSR";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-zinc-100">
      <NoSSR>
        {/* Centered content */}
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-sm">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold tracking-tight xl:text-3xl">
                Attendance Management System
              </h1>
              <p className="text-lg font-medium text-blue-400 mt-1 xl:text-xl">
                Log in to access Dashboard!
              </p>
            </div>
            <AuthCard />
          </div>
        </main>
        {/* Sticky footer */}
        <Footer />
      </NoSSR>
    </div>
  );
}
