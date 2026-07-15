"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { ChevronLeft, ChevronRight, Clock, Calendar, Lock, Unlock } from "lucide-react";
import { useMentorCourses } from "@/hooks/mentor/useMentorCourses";
import { ProfilePageLayout } from "../../profile";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";


interface LessonEditPageMentorProps {
  lessonId: string;
}

export function LessonEditPageMentor({ lessonId }: LessonEditPageMentorProps) {
  const t = useTranslations("MentorTrack");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const Chevron = isRtl ? ChevronLeft : ChevronRight;

  const { courses, loading, error } = useMentorCourses();

  const lesson = courses.find((c) => c.id === Number(lessonId));

  const breadcrumbs = [
    { label: t("breadcrumbs.home"), href: "/mentor" },
    { label: t("breadcrumbs.track"), href: "/mentor/track" },
    { label: lesson?.video_title ?? t("breadcrumbs.lesson") },
  ];

  return (
    <ProfilePageLayout
      loading={loading}
      error={error}
      retryLabel={t("retry")}
    >
      {lesson && (
        <div className="max-w-5xl mx-auto space-y-6">
          <Breadcrumbs items={breadcrumbs} locale={locale} />

          <div className="bg-black aspect-video rounded-3xl flex items-center justify-center shadow-lg">
            <div className="text-center text-white/70">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 opacity-50"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              <p className="text-sm">{t("video_placeholder", { defaultValue: "مشغل الفيديو" })}</p>
            </div>
          </div>

          {/* Lesson Info & Details */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6 pb-6 border-b border-slate-100">
              <div>
                <h1 className="text-2xl font-bold text-black mb-2">
                  {lesson.video_title}
                </h1>
                <div className="flex flex-wrap gap-4 text-sm text-brand-muted">
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-4" />
                    {Math.floor(lesson.video_duration / 60)}:{(lesson.video_duration % 60).toString().padStart(2, "0")} {t("minutes", { defaultValue: "دقيقة" })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="size-4" />
                    {new Date(lesson.created_at).toLocaleDateString(isRtl ? "ar-EG" : "en-US")}
                  </span>
                </div>
              </div>
            </div>

            {/* Lesson Description (Placeholder) */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-black">
                {t("lesson_overview")}
              </h3>
              <p className="text-brand-muted leading-relaxed text-sm">
                {t("lesson_description_placeholder")}
              </p>
            </div>
          </div>
        </div>
      )}
    </ProfilePageLayout>
  );
}