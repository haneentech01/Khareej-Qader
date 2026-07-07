import React from "react";
import { MentorSidebar } from "@/components/dashboard/mentor/Layout/MentorSidebar";
import { TopNav } from "@/components/dashboard/Layout/TopNav";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dashboard.metadata.mentor_dashboard.home" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function MentorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-[#F6FBFA] flex overflow-x-hidden w-full">
        <MentorSidebar />
        <div className="flex-1 transition-all duration-300 ease-in-out min-h-screen">
          <TopNav variant="mentor" />
          <div className="p-4 md:p-8">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
