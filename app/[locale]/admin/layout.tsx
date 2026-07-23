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

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>{children}</div>
    );
}
