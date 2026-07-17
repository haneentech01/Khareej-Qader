import React from "react";
import { TopNav } from "@/components/dashboard/Layout/TopNav";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getTranslations } from "next-intl/server";
import { StudentSidebar } from "@/components/dashboard/students/Layout/StudentSidebar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dashboard.metadata.student_dashboard.home" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Awaiting params ensures this layout is fully resolved as a Server Component
  // and never falls back to client-side rendering outside NextIntlClientProvider.
  await params;

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-[#F6FBFA] flex overflow-x-hidden w-full">
        <StudentSidebar />
        <div className="flex-1 transition-all duration-300 ease-in-out min-h-screen">
          <TopNav />
          <div className="p-4 md:p-8">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
