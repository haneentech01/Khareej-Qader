"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Users, Video } from "lucide-react";

interface MentorProfileStatsProps {
  studentsCount: number;
  courseVideoCount: number;
  loading?: boolean;
}

export function MentorProfileStats({
  studentsCount,
  courseVideoCount,
  loading = false,
}: MentorProfileStatsProps) {
  const t = useTranslations("MentorProfilePage.stats");

  const cards = [
    {
      key: "students",
      title: t("students_count"),
      value: loading ? "—" : studentsCount,
      sub: t("students_unit"),
      icon: Users,
      iconBg: "bg-brand-light-green",
      iconColor: "text-brand-primary",
      accent: "border-brand-primary/10",
    },
    {
      key: "lessons",
      title: t("track_lessons"),
      value: loading ? "—" : courseVideoCount,
      sub: t("lessons_unit"),
      icon: Video,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-500",
      accent: "border-purple-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.key}
            className={`bg-white rounded-3xl p-5 border ${card.accent} shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-md transition-all duration-300 flex items-center gap-4`}
          >
            <div
              className={`size-12 rounded-2xl ${card.iconBg} flex items-center justify-center shrink-0`}
            >
              <Icon className={`size-5 ${card.iconColor}`} />
            </div>
            <div className="flex-1 text-right rtl:text-right ltr:text-left">
              <p className="text-slate-400 text-xs font-bold leading-none mb-1">
                {card.title}
              </p>
              <p className="text-black font-extrabold text-2xl leading-tight">
                {card.value}
              </p>
              <p className="text-slate-400 text-xs font-semibold mt-0.5">
                {card.sub}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
