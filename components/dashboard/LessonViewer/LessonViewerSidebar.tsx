"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, LockKeyhole, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface LessonItemProps {
  id: string;
  title: string;
  duration?: string;
  status: "completed" | "current" | "locked";
  isActive?: boolean;
}

const LessonItem = ({ title, duration, status, isActive }: LessonItemProps) => {
  const t = useTranslations("Dashboard.LessonViewer");

  return (
    <div
      className={cn(
        "flex flex-col gap-1 p-4 transition-colors cursor-pointer",
        isActive ? "border-r-4 border-b border-brand-primary bg-brand-50 bg-[#0068570D]" : "hover:bg-slate-50",
        status === "locked" && "opacity-70 cursor-not-allowed"
      )}
    >
      <div className="flex items-start gap-2">
        <div className="shrink-0">
          {status === "completed" && (
            <div className="w-10 h-10 rounded-full bg-[#E8FDF2] flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 fill-brand-primary text-white" />
            </div>
          )}
          {status === "current" && (
            <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center">
              <Play className="w-6 h-6 text-white" />
            </div>
          )}
          {status === "locked" && (
            <div className="w-8 h-8 rounded-full bg-[#E6E9E7] flex items-center justify-center">
              <LockKeyhole className="w-4 h-4 text-brand-muted" />
            </div>
          )}
        </div>


        <div className="flex flex-col">
          <span
            className={cn(
              "text-base font-bold",
              isActive ? "text-brand-primary" : "text-[#8C8D8D] "
            )}
          >
            {title}
          </span>
          {status === "current" && isActive && (
            <span className="text-sm text-brand-400 font-medium">
              {t("playing_now")}
            </span>
          )}
          {duration && status !== "current" && (
            <span className="text-sm text-[#3D4945]">{duration}</span>
          )}
        </div>
      </div >

    </div >
  );
};

export function LessonViewerSidebar({}: { lessonId?: string }) {
  const t = useTranslations("Dashboard.LessonViewer");

  const lessons = [
    {
      id: "1",
      title: t("lesson_1_title"),
      duration: t("duration", { minutes: "05:20" }),
      status: "completed" as const,
    },
    {
      id: "2",
      title: t("lesson_2_title"),
      duration: t("duration", { minutes: "08:45" }),
      status: "completed" as const,
    },
    {
      id: "3",
      title: t("lesson_3_title"),
      status: "current" as const,
      isActive: true,
    },
    {
      id: "4",
      title: t("lesson_4_title"),
      duration: t("duration", { minutes: "12:30" }),
      status: "locked" as const,
    },
    {
      id: "5",
      title: t("lesson_5_title"),
      duration: t("duration", { minutes: "10:15" }),
      status: "locked" as const,
    },
    {
      id: "6",
      title: t("lesson_4_title"),
      duration: t("duration", { minutes: "12:30" }),
      status: "locked" as const,
    },
    {
      id: "7",
      title: t("lesson_5_title"),
      duration: t("duration", { minutes: "10:15" }),
      status: "locked" as const,
    },
    {
      id: "8",
      title: t("lesson_4_title"),
      duration: t("duration", { minutes: "12:30" }),
      status: "locked" as const,
    },
    {
      id: "9",
      title: t("lesson_5_title"),
      duration: t("duration", { minutes: "10:15" }),
      status: "locked" as const,
    },
    {
      id: "10",
      title: t("lesson_4_title"),
      duration: t("duration", { minutes: "12:30" }),
      status: "locked" as const,
    },
    {
      id: "11",
      title: t("lesson_5_title"),
      duration: t("duration", { minutes: "10:15" }),
      status: "locked" as const,
    },
  ];

  return (
    <div className="bg-white rounded-[20px] border border-slate-100 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between p-6">
        <h3 className="text-xl font-bold text-black">
          {t("sidebar_title")}
        </h3>
        <div className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-sm font-medium">
          {t("lessons_count", { count: 12 })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
        {lessons.map((lesson) => (
          <LessonItem key={lesson.id} {...lesson} />
        ))}
      </div>
    </div>
  );
}
