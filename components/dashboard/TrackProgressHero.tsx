"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";
import { Route } from "lucide-react";
import { useTranslations } from "next-intl";

interface TrackProgressHeroProps {
  trackName: string;
  progressValue: number;
  totalLessons: number;
  completedLessons: number;
}

export function TrackProgressHero({
  trackName,
  progressValue,
  totalLessons,
  completedLessons,
}: TrackProgressHeroProps) {
  const t = useTranslations("Dashboard.hero");

  return (
    <div className="bg-white rounded-[20px] p-8 shadow-[0_8px_40px_0_#22B48D0F] border border-gray-50 relative overflow-hidden">
      <div className="flex flex-col gap-6">
        {/* Badge */}
        <div className="flex items-center gap-2">
          <span className="bg-brand-surface text-brand-base text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <Route className="size-4 rotate-90" />
            {t("educational_track")}
          </span>
        </div>

        {/* Track Title */}
        <h2 className="text-4xl font-bold text-black">{trackName}</h2>

        {/* Stats & Progress */}
        <div className="w-full max-w-[600px]">
          <div className="flex gap-4 items-center mb-5">
            <p className="text-base text-brand-muted">
              {t("lessons_completed", {
                completed: completedLessons,
                total: totalLessons,
              })}
            </p>
            <span className="h-5 w-0.5 bg-[#BCCAC3]"></span>
            <p className="text-brand-base font-bold">
              {t("percent_completed", { value: progressValue })}
            </p>
          </div>

          <Progress
            value={progressValue}
            className="h-3 bg-[#E6E9E7] 
            [&>div]:bg-linear-to-l 
            [&>div]:from-brand-primary 
            [&>div]:to-brand-base/20
            rounded-full rtl:rotate-180 w-full"
          />
        </div>
      </div>
    </div>
  );
}
