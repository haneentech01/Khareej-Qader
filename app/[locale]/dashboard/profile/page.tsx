import { StudentProfileContent } from "@/components/dashboard/students/Profile/StudentProfileContent";
import { PageHeader } from "@/components/dashboard/Layout/PageHeader";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getTranslations } from "next-intl/server";

interface ProfilePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ProfilePageProps) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "Dashboard.ProfilePage",
  });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { locale } = await params;
  const t = await getTranslations("Dashboard.ProfilePage");

  const breadcrumbItems = [
    { label: t("breadcrumb_home"), href: "/dashboard" },
    { label: t("breadcrumb_profile") },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col gap-3.5">
        <Breadcrumbs items={breadcrumbItems} locale={locale} />
        <PageHeader
          title={t("title")}
          subtitle={t("subtitle")}
        />
      </div>

      <div>
        <StudentProfileContent />
      </div>
    </div>
  );
}
