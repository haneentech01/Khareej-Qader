import { getTranslations } from "next-intl/server";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { LessonViewerSidebar } from "@/components/dashboard/LessonViewer/LessonViewerSidebar";
import { LessonViewerContent } from "@/components/dashboard/LessonViewer/LessonViewerContent";
import { PlayCircleIcon } from "lucide-react";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ locale: string; lessonId: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Dashboard.LessonViewer");

  const breadcrumbItems = [
    { label: t("breadcrumb_home"), href: "/dashboard" },
    { label: t("breadcrumb_track"), href: "/dashboard/my-track" },
    { label: t("breadcrumb_lesson") },
  ];

  const { lessonId } = await params;
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col gap-3.5">
        <Breadcrumbs items={breadcrumbItems} locale={locale} />
        {/* TODO: fetch lesson data from api  */}
        <div className="flex flex-col items-start gap-2.5">
          <h1 className="text-3xl md:text-4xl font-bold text-black">
            {t("title")}
          </h1>
          <p className="flex items-center gap-2">
            <span>
              <PlayCircleIcon className="w-5 h-5 text-brand-primary" />
            </span>
            <span className="text-brand-muted">
              {t("subtitle", { lessonName: t("video_title") })}
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Content (Video & Tabs) */}
        <div className="lg:col-span-8">
          <LessonViewerContent lessonId={lessonId} />
        </div>

        {/* Left Sidebar (Lesson List) */}
        <div className="lg:col-span-4">
          <LessonViewerSidebar lessonId={lessonId} />
        </div>
      </div>
    </div>
  );
}
