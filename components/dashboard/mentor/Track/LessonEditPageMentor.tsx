"use client";

import { useTranslations, useLocale } from "next-intl";
import { Clock, Calendar } from "lucide-react";
import { ProfilePageLayout } from "../../profile";
import { useVideoDetails } from "@/hooks/dashboard/layout/useVideoDetails";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";


interface LessonEditPageMentorProps {
  lessonId: string;
}

// videos/details/{id} لجلب الفيديو الحقيقي والوصف.

export function LessonEditPageMentor({ lessonId }: LessonEditPageMentorProps) {
  const t = useTranslations("MentorTrack");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const { video, loading, error, refetch } = useVideoDetails(lessonId);

  const breadcrumbsItem = [
    { label: t("breadcrumbs.home"), href: "/mentor" },
    { label: t("breadcrumbs.track"), href: "/mentor/track" },
    { label: video?.title ?? t("breadcrumbs.lesson") },
  ];

  return (
    <ProfilePageLayout
      loading={loading}
      error={error}
      onRetry={refetch}
      retryLabel={t("retry")}
    >
      {video && (
        <div className="max-w-5xl mx-auto space-y-6">
          <Breadcrumbs items={breadcrumbsItem} locale={locale} />

          {/* Lesson Video Player (YouTube Iframe) */}
          <div className="bg-black aspect-video rounded-3xl overflow-hidden shadow-lg flex items-center justify-center">
            {video.youtube_id ? (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${video.youtube_id}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="text-center text-white/70 p-8">
                <p className="text-sm">{t("video_unavailable")}</p>
              </div>
            )}
          </div>

          {/* Lesson Info & Details */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6 pb-6 border-b border-slate-100">
              <div>
                <h1 className="text-2xl font-bold text-black mb-2">
                  {video.title}
                </h1>
                <div className="flex flex-wrap gap-4 text-sm text-brand-muted">
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-4" />
                    {video.duration}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="size-4" />
                    {new Date(video.created_at).toLocaleDateString(isRtl ? "ar-EG" : "en-US")}
                  </span>
                </div>
              </div>
            </div>

            {/* Lesson Description */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-black">
                {t("lesson_overview")}
              </h3>
              <div className="text-brand-muted leading-relaxed text-sm whitespace-pre-line">
                {video.description.replace(/\n\n/g, "\n") || t("no_description")}
              </div>
            </div>
          </div>
        </div>
      )}
    </ProfilePageLayout>
  );
}
