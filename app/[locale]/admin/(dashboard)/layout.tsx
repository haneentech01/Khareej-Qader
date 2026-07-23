import React from "react";
import { AdminSidebar } from "@/components/dashboard/admin/Layout/AdminSidebar";
import { AdminTopNav } from "@/components/dashboard/admin/Layout/AdminTopNav";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "Admin.metadata",
  });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function AdminDashbordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-[#F6FBFA] flex overflow-x-hidden w-full">
        <AdminSidebar />
        <div className="flex-1 transition-all duration-300 ease-in-out min-h-screen">
          <AdminTopNav />
          <div className="p-4 md:p-8">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}
