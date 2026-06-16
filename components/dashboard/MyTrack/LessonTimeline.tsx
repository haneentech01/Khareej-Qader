"use client";

import { LessonItem } from "./LessonItem";
import { useTranslations } from "next-intl";
import { LessonStatus, PathVideo } from "@/types";

interface LessonTimelineProps {
  videos: PathVideo[];
  currentVideoId: number;
}

export function LessonTimeline({ videos, currentVideoId }: LessonTimelineProps) {
  const t = useTranslations("Dashboard.MyTrack");

  const getStatus = (video: PathVideo): LessonStatus => {
    if (video.id === currentVideoId)
      return "current";
    if (video.completed)
      return "completed";
    return "locked";
  };

  return (
    <div className="bg-white rounded-[20px] p-4 md:p-10 border border-slate-100 shadow-sm">
      <h3 className="text-2xl font-bold text-black mb-10">
        {t("lessons_title")}
      </h3>

      <div className="relative">
        {videos.map((video, index) => (
          <LessonItem
            key={video.id}
            video={video}
            status={getStatus(video)}
            isLast={index === videos.length - 1}
            variant="timeline"
          />
        ))}
      </div>
    </div>
  );
}
