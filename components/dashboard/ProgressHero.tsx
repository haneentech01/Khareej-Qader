"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { useTranslations } from "next-intl";

interface ProgressHeroProps {
  userName: string;
  trackName: string;
  currentLesson: string;
  progressValue: number;
  totalLessons: number;
  completedLessons: number;
}

export function ProgressHero({
  userName,
  trackName,
  currentLesson,
  progressValue,
  totalLessons,
  completedLessons,
}: ProgressHeroProps) {
  const t = useTranslations("Dashboard.hero");

  return (
    <div className="mb-10">
      <div className="flex items-center gap-4 mb-2">
        <h1 className="text-4xl font-bold text-gray-900">{t("welcome", { name: userName })}</h1>
      </div>
      <p className="text-brand-muted mb-8">{t("subtitle")}</p>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-brand-surface text-brand-base text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <span className="size-1.5 bg-brand-base rounded-full animate-pulse"></span>
              {t("educational_track")}
            </span>
          </div>

          <h2 className="text-4xl font-bold text-gray-900 mb-6">{trackName}</h2>

          <div className="flex justify-between items-center mb-3">
            <p className="text-sm font-medium text-gray-500">
              {t("lessons_completed", { completed: completedLessons, total: totalLessons })}
            </p>
            <p className="text-brand-base font-bold">{t("percent_completed", { value: progressValue })}</p>
          </div>

          <Progress value={progressValue} className="h-3 bg-gray-100 rounded-full" />
        </div>

        {/* Next Lesson Box */}
        <div className="md:w-72 bg-brand-surface/30 rounded-2xl p-6 border border-brand-surface/50 flex flex-col justify-between">
          <div>
            <p className="text-brand-base text-xs font-semibold mb-3">{t("next_lesson")}</p>
            <p className="text-gray-900 font-bold text-lg leading-snug">
              {currentLesson}
            </p>
          </div>

          <Button className="mt-6 bg-brand-base hover:bg-brand-hover text-white rounded-xl h-12 flex items-center gap-2 font-bold w-full">
            <PlayCircle className="size-5" />
            {t("continue_learning")}
          </Button>
        </div>
      </div>
    </div>
  );
}
