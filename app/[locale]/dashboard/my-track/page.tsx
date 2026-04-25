import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TrackProgressHero } from "@/components/dashboard/TrackProgressHero";
import { LessonTimeline } from "@/components/dashboard/LessonTimeline";

export default async function MyTrackPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Dashboard.MyTrack");
  const dashboardT = await getTranslations("Dashboard");

  const breadcrumbItems = [
    { label: t("breadcrumb_home"), href: "/dashboard" },
    { label: t("breadcrumb_track") },
  ];

  const lessons = [
    {
      id: "1",
      number: 1,
      title: "أساسيات HTML5",
      status: "completed" as const,
    },
    {
      id: "2",
      number: 2,
      title: "هيكل صفحة HTML",
      duration: "15:20 دقيقة",
      status: "current" as const,
    },
    {
      id: "3",
      number: 3,
      title: "التنسيق باستخدام CSS",
      status: "locked" as const,
    },
    {
      id: "4",
      number: 4,
      title: "أساسيات التصميم المتجاوب",
      status: "locked" as const,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col gap-2">
        <Breadcrumbs items={breadcrumbItems} locale={locale} />
        <h1 className="text-4xl font-bold text-black">{t("title")}</h1>
        <p className="text-brand-muted text-lg">{t("subtitle")}</p>
      </div>

      <TrackProgressHero
        trackName={dashboardT("hero.track_name")}
        progressValue={45}
        totalLessons={12}
        completedLessons={6}
      />

      <div className="mt-10">
        <LessonTimeline lessons={lessons} />
      </div>
    </div>
  );
}
