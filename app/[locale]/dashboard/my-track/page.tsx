import { getTranslations } from "next-intl/server";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { MyTrackContent } from "@/components/dashboard/MyTrack/MyTrackContent";
import { PageHeader } from "@/components/dashboard/Layout/PageHeader";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dashboard.metadata.student_dashboard.my_track" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function MyTrackPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Dashboard.MyTrack");

  const breadcrumbItems = [
    { label: t("breadcrumb_home"), href: "/dashboard" },
    { label: t("breadcrumb_track") },
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
        <MyTrackContent />
      </div>
    </div>
  );
}
