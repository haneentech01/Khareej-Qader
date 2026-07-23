

import { AdminDashboardContent } from "@/components/dashboard/admin/Home/AdminDashboardContent";
import { getTranslations } from "next-intl/server";

interface AdminHomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AdminHomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Admin.dashboard" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function AdminHomePage({ params }: AdminHomePageProps) {
  await params;
  return <AdminDashboardContent />;
}
