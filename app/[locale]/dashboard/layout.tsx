import React from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNav } from "@/components/dashboard/TopNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Dynamic Main Content based on Sidebar placement */}
      <main className="flex-1 pr-64 transition-all duration-300">
        <TopNav />
        <div className="p-8">
          {children}
        </div>
      </main>

      <Sidebar />
    </div>
  );
}
