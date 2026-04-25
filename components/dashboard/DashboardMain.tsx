import React from "react";

export function DashboardMain({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 transition-all duration-300 ease-in-out min-h-screen">
      {children}
    </main>
  );
}
