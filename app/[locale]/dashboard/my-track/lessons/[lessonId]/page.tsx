import { LessonViewerSidebar } from "@/components/dashboard/students/LessonViewer/LessonViewerSidebar";
import { LessonViewerContent } from "@/components/dashboard/students/LessonViewer/LessonViewerContent";
import { LessonHeader } from "@/components/dashboard/students/LessonViewer/LessonHeader";
import { LessonBreadcrumbs } from "@/components/dashboard/students/LessonViewer/LessonBreadcrumbs";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; lessonId: string }>;
}) {
  const { locale, lessonId } = await params;
  const t = await getTranslations({
    locale,
    namespace: "Dashboard.metadata.student_dashboard.lesson"
  });
  return {
    title: t("title", { lessonId }),
    description: t("description", { lessonId }),
  };
}

export default async function LessonPage({ params }:
  {
    params:
    Promise<{ locale: string; lessonId: string }>;
  }) {
  const { locale, lessonId } = await params;

  console.log("🚀 LessonPage rendered with:", { locale, lessonId });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col gap-3.5">
        <LessonBreadcrumbs locale={locale} />
        <LessonHeader lessonId={lessonId} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8">
          <LessonViewerContent lessonId={lessonId} />
        </div>
        <div className="lg:col-span-4">
          <LessonViewerSidebar lessonId={lessonId} />
        </div>
      </div>
    </div>
  );
}