import { getTranslations } from "next-intl/server";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { MyTrackContent } from "@/components/dashboard/MyTrack/MyTrackContent";

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
        <h1 className="text-4xl font-bold text-black">
          {t("title")}
        </h1>
        <p className="text-brand-muted text-lg">
          {t("subtitle")}
        </p>
      </div>

      <div>
        <MyTrackContent />
      </div>
    </div>
  );
}
