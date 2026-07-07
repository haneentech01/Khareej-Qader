import { getTranslations } from "next-intl/server";
import { DashboardContent } from "@/components/dashboard/students/Home/DashboardContent";

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

export default async function DashboardPage() {

  return (
    <div className="space-y-6">
      <DashboardContent />
    </div>
  );
}