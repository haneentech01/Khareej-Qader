import { LessonViewerSidebar } from "@/components/dashboard/LessonViewer/LessonViewerSidebar";
import { LessonViewerContent } from "@/components/dashboard/LessonViewer/LessonViewerContent";
import { LessonHeader } from "@/components/dashboard/LessonViewer/LessonHeader";
import { LessonBreadcrumbs } from "@/components/dashboard/LessonViewer/LessonBreadcrumbs";

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