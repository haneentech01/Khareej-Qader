"use client";

import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  LockKeyholeIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { VideoPlayer } from "./VideoPlayer";
import { LessonQuestions } from "./LessonQuestions";
import { Link } from "@/i18n/routing";
import { useLessonPath } from "@/providers/LessonPathProvider";
import { notFound } from "next/navigation";

interface LessonViewerContentProps {
  lessonId?: string;
}

export function LessonViewerContent({ lessonId }: LessonViewerContentProps) {
  const t = useTranslations("Dashboard.LessonViewer");
  const [activeTab, setActiveTab] = useState("about");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const { data, loading, error, refetch, markVideoCompleted } = useLessonPath();

  // ★ أضف هذه
  console.log("📺 LessonViewerContent state:", {
    lessonId,
    loading,
    error,
    hasData: !!data,
    videosCount: data?.videos?.length
  });

  // ─── Loading/Error ────────────────────────────
  if (loading) {
    console.log("⏳ LessonViewerContent: loading...");  // ★
    return (
      <div className="flex flex-col gap-6 animate-pulse">
        <div className="aspect-video bg-slate-200 rounded-t-4xl" />
        <div className="flex justify-between gap-4">
          <div className="h-12 flex-1 bg-slate-200 rounded-2xl" />
          <div className="h-12 flex-1 bg-slate-200 rounded-2xl" />
        </div>
        <div className="bg-white rounded-[20px] p-6 border border-slate-100 h-48" />
      </div>
    );
  }

  if (error) {
    console.error("💥 LessonViewerContent error:", error);  // ★
    return (
      <div className="text-center py-20">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!data) {
    console.warn("⚠️ LessonViewerContent: no data, returning null");  // ★
    return null;
  }

  console.log("✅ LessonViewerContent: rendering VideoPlayer");  // ★

  const { videos, current_video } = data;
  const currentIndex = videos.findIndex((v) => String(v.id) === lessonId);

  if (currentIndex === -1) {
    notFound();
  }

  const currentVideo = videos[currentIndex];
  const prevVideo = currentIndex > 0 ? videos[currentIndex - 1] : null;
  const nextVideo = currentIndex < videos.length - 1 ? videos[currentIndex + 1] : null;

  const isCurrentCompleted = currentVideo?.completed === true;
  const isNextAccessible =
    !!nextVideo &&
    (isCurrentCompleted || nextVideo.id === current_video.id);

  const handleVideoCompleted = () => {
    if (!lessonId) return;
    markVideoCompleted(lessonId);
    setTimeout(() => refetch(), 1500);
  };

  const tabs = [
    { id: "about", label: t("tab_about") },
    { id: "notes", label: t("tab_notes") },
    { id: "attachments", label: t("tab_attachments") },
    { id: "questions", label: t("tab_questions") },
  ];

  return (
    <div className="flex flex-col gap-6 mx-auto">
      {/* ─── Video Player ─────────────────────── */}
      <div className="bg-slate-900 rounded-t-4xl overflow-hidden relative aspect-video shadow-sm">
        {currentVideo && (
          <VideoPlayer
            key={currentVideo.id}
            lessonId={currentVideo.id}
            videoUrl={currentVideo.video_url}
            thumbnailUrl={currentVideo.thumbnail_url}
            onVideoCompleted={handleVideoCompleted}
          />
        )}
      </div>

      {/* ─── Navigation Buttons ───────────────── */}
      <div className="flex items-center justify-between gap-4 
      bg-[#F2F4F280] py-6 shadow-[0px_1px_2px_0px_#0000000D]
      
      ">
        {prevVideo ? (
          <Link
            href={`/dashboard/my-track/lessons/${prevVideo.id}`}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-100 px-3 py-3 rounded-2xl text-black font-bold hover:scale-[1.02] active:scale-[0.98] hover:bg-slate-50 transition-all shadow-sm"
          >
            <ArrowRight className={cn("w-5 h-5", isRtl ? "" : "rotate-180")} />
            <span className="truncate max-w-[300px]">{prevVideo.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {nextVideo ? (
          isNextAccessible ? (
            <Link
              href={`/dashboard/my-track/lessons/${nextVideo.id}`}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-brand-primary px-3 py-3 rounded-2xl text-white font-bold hover:scale-[1.02] active:scale-[0.98] hover:bg-brand-dark/80 transition-all shadow-sm"
            >
              <span className="truncate max-w-[300px]">{nextVideo.title}</span>
              <ArrowLeft className={cn("w-5 h-5", isRtl ? "" : "rotate-180")} />
            </Link>
          ) : (
            <div className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-200/70 px-3 py-3 rounded-2xl text-slate-400 font-bold cursor-not-allowed select-none">
              <LockKeyholeIcon className="w-5 h-5" />
              <span className="truncate max-w-[300px]">{nextVideo.title}</span>
              <ArrowLeft className={cn("w-5 h-5 opacity-40", isRtl ? "" : "rotate-180")} />
            </div>
          )
        ) : (
          <div />
        )}
      </div>

      {/* ─── Tabs ─────────────────────────────── */}
      <div className="bg-white rounded-[20px] p-6 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-center gap-8 border-b border-slate-100 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "pb-4 text-base font-bold transition-colors relative",
                activeTab === tab.id
                  ? "text-brand-primary"
                  : "text-brand-muted hover:text-brand-primary",
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {activeTab === "about" && (
          <div className="flex flex-col gap-8 max-w-3xl">
            <div>
              <h3 className="text-xl font-bold text-black mb-4">{t("about_title")}</h3>
              <p className="text-slate-500 text-lg leading-relaxed">{t("about_description")}</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-black mb-4">{t("objectives_title")}</h3>
              <ul className="space-y-4">
                {[t("objective_1"), t("objective_2"), t("objective_3")].map((obj, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 fill-brand-primary text-white shrink-0" />
                    <span className="text-brand-muted">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "questions" && <LessonQuestions />}
      </div>
    </div>
  );
}