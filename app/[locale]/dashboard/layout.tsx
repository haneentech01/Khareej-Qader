import React from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNav } from "@/components/dashboard/TopNav";
import { DashboardMain } from "@/components/dashboard/DashboardMain";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dashboard.metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-[#F6FBFA] flex overflow-x-hidden w-full">
        <Sidebar />
        <DashboardMain>
          <TopNav />
          <div className="p-4 md:p-8">
            {children}
          </div>
        </DashboardMain>
      </div>
    </SidebarProvider>
  );
}
