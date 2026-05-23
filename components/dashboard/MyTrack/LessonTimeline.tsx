"use client";

import React from "react";
import { LessonItem } from "./LessonItem";
import { useTranslations } from "next-intl";
import { LessonTimelineProps } from "@/types";

export function LessonTimeline({ lessons }: LessonTimelineProps) {
  const t = useTranslations("Dashboard.MyTrack");

  return (
    <div className="bg-white rounded-[20px] p-10 border border-slate-100 shadow-sm">
      <h3 className="text-2xl font-bold text-black mb-10">
        {t("lessons_title")}
      </h3>

      <div className="relative">
        {lessons.map((lesson, index) => (
          <LessonItem
            key={lesson.id}
            id={lesson.id}
            number={lesson.number}
            title={lesson.title}
            duration={lesson.duration}
            status={lesson.status}
            isLast={index === lessons.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
