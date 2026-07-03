"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { TrendingUp, BookOpen, ClipboardList, Star } from "lucide-react";
import { StudentProfileData } from "@/types";

interface StudentProfileStatsProps {
  student: StudentProfileData;
}

export function StudentProfileStats({ student }: StudentProfileStatsProps) {
  const t = useTranslations("MentorStudentProfile");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
      {/* Track Progress */}
      <div className="bg-white border border-slate-100/80 rounded-3xl p-5 
      shadow-[0_4px_20px_rgba(0,0,0,0.015)] flex flex-col gap-3">
        <div className="flex items-center justify-center gap-5">
          <div className="size-12 rounded-2xl bg-brand-light flex items-center justify-center shrink-0">
            <TrendingUp className="size-5 text-brand-primary" />
          </div>
          <div className="text-start">
            <p className="text-slate-400 text-xs font-bold">{t("stats.track_progress")}</p>
            <p className="text-black font-extrabold text-2xl md:text-3xl leading-tight">
              {student.trackProgress}
              <span className="text-base font-bold text-slate-400 ms-0.5">%</span>
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-primary rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${student.trackProgress}%` }}
          />
        </div>
      </div>

      {/* Completed Lessons */}
      <div className="bg-white border border-slate-100/80 rounded-3xl p-5 
      shadow-[0_4px_20px_rgba(0,0,0,0.015)] flex items-center justify-center gap-8">
        <div className="size-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
          <BookOpen className="size-5 text-blue-500" />
        </div>
        <div className="text-right">
          <p className="text-slate-400 text-xs font-bold">
            {t("stats.completed_lessons")}
          </p>
          <p className="text-black font-extrabold text-2xl md:text-3xl leading-tight">
            {student.completedLessons}
            <span className="text-base font-bold text-slate-300 mx-1">/</span>
            <span className="text-base font-bold text-slate-400">
              {student.totalLessons}
            </span>
          </p>
          <p className="text-slate-400 text-xs font-semibold">{t("stats.lesson")}</p>
        </div>
      </div>

      {/* Completed Tasks */}
      <div className="bg-white border border-slate-100/80 rounded-3xl p-5 
      shadow-[0_4px_20px_rgba(0,0,0,0.015)] flex items-center justify-center gap-8">
        <div className="size-12 rounded-2xl bg-purple-50 flex items-center justify-center shrink-0">
          <ClipboardList className="size-5 text-purple-500" />
        </div>
        <div className="text-right">
          <p className="text-slate-400 text-xs font-bold">
            {t("stats.completed_tasks")}
          </p>
          <p className="text-black font-extrabold text-2xl md:text-3xl leading-tight">
            {student.completedTasks}
            <span className="text-base font-bold text-slate-300 mx-1">/</span>
            <span className="text-base font-bold text-slate-400">
              {student.totalTasks}
            </span>
          </p>
          <p className="text-slate-400 text-xs font-semibold">{t("stats.task")}</p>
        </div>
      </div>

      {/* Average Rating */}
      {/* <div className="bg-white border border-slate-100/80 rounded-3xl p-5 
      shadow-[0_4px_20px_rgba(0,0,0,0.015)] flex items-center justify-center gap-3">
        <div className="size-12 rounded-2xl bg-amber-50 flex items-center justify-center shrink-0">
          <Star className="size-5 text-amber-400 fill-amber-400" />
        </div>
        <div className="text-right">
          <p className="text-slate-400 text-xs font-bold">{t("stats.avg_rating")}</p>
          <p className="text-black font-extrabold text-xl md:text-2xl leading-tight">
            {student.averageRating}
          </p>
        </div>
      </div> */}
    </div>
  );
}
