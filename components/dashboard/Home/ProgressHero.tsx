"use client";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PlayCircle, Route } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useParams } from "next/navigation";

interface ProgressHeroProps {
  userName?: string;
  trackName: string;
  currentLesson?: string;
  currentLessonId?: string | number;
  progressValue: number;
  totalLessons: number;
  completedLessons: number;
  variant?: "dashboard" | "standalone";
}

export function ProgressHero({
  userName,
  trackName,
  currentLesson,
  currentLessonId,
  progressValue,
  totalLessons,
  completedLessons,
  variant = "dashboard",
}: ProgressHeroProps) {
  const t = useTranslations("Dashboard.hero");
  const isStandalone = variant === "standalone";


  return (
    <div className={isStandalone ? "" : "mb-10"}>
      {!isStandalone && userName && (
        <>
          <div className="flex items-center mb-2">
            {/* title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-black">
              {t("welcome", { name: userName })}
            </h1>
          </div>

          {/* subtitle */}
          <p className="text-brand-muted lg:text-lg mb-8">
            {t("subtitle")}
          </p>
        </>
      )}

      {/* progress hero */}
      <div
        className={`bg-white rounded-[20px] 
          ${isStandalone
            ? "p-10 border border-slate-100 shadow-sm"
            : "p-8 shadow-[0_8px_40px_0_#22B48D0F] relative overflow-hidden flex flex-col md:flex-row gap-20"
          }`}
      >
        {/* Educational Track Box */}
        <div className={isStandalone ? "flex flex-col gap-6 w-full" : "flex-1"}>
          {/* educational track */}
          <div className={`flex items-center gap-2 ${isStandalone ? "" : "mb-4"}`}>
            <span className="bg-brand-surface text-brand-base text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 w-fit">
              <Route className="size-4 rotate-90" />
              {t("educational_track")}
            </span>
          </div>

          {/* track name */}
          <h2 className={`text-4xl font-bold text-black ${isStandalone ? "" : "mb-5"}`}>
            {trackName}
          </h2>

          {/* stats & progress */}
          <div className={isStandalone ? "w-full max-w-[600px]" : ""}>
            <div className="flex gap-4 items-center mb-5">
              <p
                className={
                  isStandalone
                    ? "text-base text-brand-muted"
                    : "text-sm lg:text-base text-brand-muted"
                }
              >
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

            {/* progress bar */}
            <Progress
              value={progressValue}
              aria-label={t("lessons_completed", {
                completed: completedLessons,
                total: totalLessons,
              })}
              className={`h-3 bg-[#E6E9E7] [&>div]:bg-linear-to-l [&>div]:from-brand-primary [&>div]:to-brand-base/20 rounded-full rtl:rotate-180 w-full ${isStandalone ? "" : "max-w-[555px]"
                }`}
            />

          </div>
        </div>

        {/* Next Lesson Box */}
        {!isStandalone && currentLesson && (
          <Link
            href={`/dashboard/my-track/lessons/${currentLessonId}`}
            className="md:w-80 bg-[#F4F7F5] rounded-4xl p-7 flex flex-col justify-between">
            <div>
              <p className="text-brand-primary text-sm font-semibold mb-4">
                {t("next_lesson")}
              </p>
              <p className="text-[#191C1B] font-semibold leading-snug">
                {currentLesson}
              </p>
            </div>

            <Button className="mt-4 bg-brand-primary hover:bg-brand-hover/90 text-white rounded-[10px] h-12 flex items-center gap-2 font-bold w-full cursor-pointer">
              <PlayCircle className="size-5" />
              {t("continue_learning")}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
