"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useLessonPath } from "./LessonPathProvider";
import { LessonItem } from "../MyTrack/LessonItem";
import { LessonStatus } from "@/types";

interface LessonViewerSidebarProps {
  lessonId?: string;
}

export function LessonViewerSidebar({ lessonId }: LessonViewerSidebarProps) {
  const t = useTranslations("Dashboard.LessonViewer");
  const { data, loading, error } = useLessonPath();

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


  const { videos, current_video } = data;

  const getStatus = (video: { id: number; completed: boolean }): LessonStatus => {
    if (video.completed) return "completed";
    if (video.id === current_video.id) return "current";
    return "locked";
  };

  return (
    <div className="bg-white rounded-[20px] border border-slate-100 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between p-6">
        <h3 className="text-xl font-bold text-black">
          {t("sidebar_title")}
        </h3>
        <div className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-sm font-medium">
          {t("lessons_count", { count: videos.length })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
        {videos.map((video) => (
          <LessonItem
            key={video.id}
            video={video}
            status={getStatus(video)}
            variant="sidebar"
            isActive={String(video.id) === lessonId}
          />
        ))}
      </div>
    </div>
  );
}