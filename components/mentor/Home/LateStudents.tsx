"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";

export function LateStudents() {
  const t = useTranslations("MentorDashboard.late_students_list");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const lateStudents = [
    {
      id: "1",
      name: "أحمد سامر",
      task: "مهمة React (الجزء 2)",
      days: 2,
      tag: isRtl ? t("late_days_2") : "Late 2 days",
    },
    {
      id: "2",
      name: "سارة خالد",
      task: "تصميم Landing Page",
      days: 5,
      tag: isRtl ? t("late_days_plural", { days: 5 }) : "Late 5 days",
    },
    {
      id: "3",
      name: "يوسف إبراهيم",
      task: "ربط API بالمشروع",
      days: 1,
      tag: isRtl ? t("late_days_1") : "Late 1 day",
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 border border-sidebar-border shadow-sm flex flex-col gap-6 w-full h-full">
      {/* Title Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <div className="size-9 flex items-center justify-center rounded-xl bg-red-bg">
            <Clock className="size-5 text-light-red" />
          </div>
          <h4 className="font-bold text-black text-sm md:text-base">
            {t("title")}
          </h4>
        </div>
        <Link
          href="/mentor/late-students"
          className="text-brand-muted hover:text-black text-xs md:text-sm flex items-center gap-1 transition-colors"
        >
          {t("view_all")}
          {isRtl ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}
        </Link>
      </div>

      {/* Students List */}
      <div className="flex flex-col divide-y divide-slate-50">
        {lateStudents.map((student) => (
          <div key={student.id} className="flex justify-between items-center py-4 first:pt-0 last:pb-0 gap-4">
            <div className="space-y-1">
              <span className="font-semibold text-black text-sm md:text-base block">
                {student.name}
              </span>
              <span className="text-brand-muted text-xs block">
                {student.task}
              </span>
            </div>
            {/* Red Warning Tag */}
            <span className="bg-red-bg text-light-red text-xs font-extrabold px-3 py-1.5 rounded-lg border border-[#FCA5A5]/20 shrink-0 shadow-xs">
              {student.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
