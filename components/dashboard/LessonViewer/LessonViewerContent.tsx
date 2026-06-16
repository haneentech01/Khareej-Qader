"use client";

import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { VideoPlayer } from "./VideoPlayer";
import { LessonQuestions } from "./LessonQuestions";
import { useLessonPath } from "./LessonPathProvider";
import { Link } from "@/i18n/routing";


interface LessonViewerContentProps {
  lessonId?: string;
}

export function LessonViewerContent({ lessonId }: LessonViewerContentProps) {
  const t = useTranslations("Dashboard.LessonViewer");
  const [activeTab, setActiveTab] = useState("about");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const { data, loading, error, refetch } = useLessonPath();

  useEffect(() => {
    refetch();
  }, [lessonId]);

  // ─── Loading ─────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin size-10 border-4 border-brand-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  // ─── Error ───────────────────────────
  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  // ─── No data ─────────────────────────
  if (!data || typeof data !== "object") {
    return null;
  }

  const { path, videos } = data;

  // ─── إيجاد الفيديو الحالي ─────────────
  const currentIndex = videos.findIndex((v) => String(v.id) === lessonId);
  const currentVideo = videos[currentIndex];

  // ─── إيجاد الفيديو السابق والتالي ────
  const prevVideo = currentIndex > 0 ? videos[currentIndex - 1] : null;
  const nextVideo =
    currentIndex < videos.length - 1 ? videos[currentIndex + 1] : null;



  const tabs = [
    { id: "about", label: t("tab_about") },
    { id: "notes", label: t("tab_notes") },
    { id: "attachments", label: t("tab_attachments") },
    { id: "questions", label: t("tab_questions") },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* ─── Video Player ─────────────── */}
      <div className="bg-slate-900 rounded-t-4xl overflow-hidden relative aspect-video shadow-sm">
        <VideoPlayer
          lessonId={lessonId}
          videoUrl={currentVideo?.video_url}
          thumbnailUrl={currentVideo?.thumbnail_url}
        />
      </div>

      {/* ─── Navigation Buttons ───────── */}
      <div className="flex items-center justify-between gap-4 bg-[#F2F4F280] py-6 shadow-[0px_1px_2px_0px_#0000000D]">
        {prevVideo ? (
          <Link
            href={`/dashboard/my-track/lessons/${prevVideo.id}`}
            // onClick={() => refetch()}
            className="flex-1 md:flex-none flex items-center justify-center 
            gap-2 bg-white border border-slate-100 px-3 py-3 rounded-2xl 
            text-black font-bold hover:scale-[1.02] active:scale-[0.98] 
            hover:bg-slate-50 transition-all shadow-sm"
          >
            <ArrowRight
              className={cn("w-5 h-5", isRtl ? "" : "rotate-180")}
            />
            <span className="truncate max-w-[300px]">
              {prevVideo.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {nextVideo ? (
          <Link
            href={`/dashboard/my-track/lessons/${nextVideo.id}`}
            // onClick={() => refetch()}
            className="flex-1 md:flex-none flex items-center justify-center 
            gap-2 bg-brand-primary px-3 py-3 rounded-2xl text-white 
            font-bold hover:scale-[1.02] active:scale-[0.98] 
            hover:bg-brand-dark/80 transition-all shadow-sm"
          >
            <span className="truncate max-w-[300px]">
              {nextVideo.title}
            </span>
            <ArrowLeft
              className={cn("w-5 h-5", isRtl ? "" : "rotate-180")}
            />
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-[20px] p-6 border border-slate-100 shadow-sm flex-1">
        <div className="flex items-center justify-center gap-8 border-b border-slate-100 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "pb-4 text-base font-bold transition-colors relative",
                activeTab === tab.id
                  ? "text-brand-primary"
                  : "text-brand-muted hover:text-brand-primary"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "about" && (
          <div className="flex flex-col gap-8 max-w-3xl">
            <div>
              <h3 className="text-xl font-bold text-black mb-4">{t("about_title")}</h3>
              <p className="text-slate-500 text-lg leading-relaxed">
                {t("about_description")}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black mb-4">{t("objectives_title")}</h3>
              <ul className="space-y-4">
                {[
                  t("objective_1"),
                  t("objective_2"),
                  t("objective_3")
                ].map((obj, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 fill-brand-primary text-white shrink-0" />
                    <span className="text-brand-muted">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "questions" && (
          <LessonQuestions />
        )}
      </div>
    </div>
  );
}
