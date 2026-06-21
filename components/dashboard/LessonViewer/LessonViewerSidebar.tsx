"use client";

import { useTranslations } from "next-intl";
import { useLessonPath } from "@/providers/LessonPathProvider";
import { LessonItem } from "../MyTrack/LessonItem";
import { LessonStatus } from "@/types";

interface LessonViewerSidebarProps {
  lessonId?: string;
}

export function LessonViewerSidebar({ lessonId }: LessonViewerSidebarProps) {
  const t = useTranslations("Dashboard.LessonViewer");
  const { data, loading } = useLessonPath();

  if (loading) {
    return (
      <div className="bg-white rounded-[20px] border border-slate-100 shadow-sm p-6 animate-pulse">
        <div className="h-6 w-32 bg-slate-200 rounded mb-4" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-14 bg-slate-100 rounded-xl mb-2" />
        ))}
      </div>
    );
  }

  if (!data) return null;

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