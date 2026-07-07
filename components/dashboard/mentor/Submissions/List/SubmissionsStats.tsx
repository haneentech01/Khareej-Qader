"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Clock, Calendar, Check, User } from "lucide-react";

interface SubmissionsStatsProps {
  stats: {
    pending: number;
    late: number;
    evaluated: number;
    notSubmitted: number;
  };
}

export function SubmissionsStats({ stats }: SubmissionsStatsProps) {
  const t = useTranslations("MentorSubmissionsList");

  const cards = [
    {
      title: t("stats.awaiting_evaluation"),
      value: stats.pending,
      unit: t("stats.submissions_unit"),
      icon: Clock,
      colorClass: "text-[#d97706]",
      bgClass: "bg-[#fef3c7]",
      borderColorClass: "border-amber-100/50",
    },
    {
      title: t("stats.late"),
      value: stats.late,
      unit: t("stats.submissions_plural"),
      icon: Calendar,
      colorClass: "text-red-500",
      bgClass: "bg-red-50",
      borderColorClass: "border-red-100/50",
    },
    {
      title: t("stats.evaluated"),
      value: stats.evaluated,
      unit: t("stats.submissions_unit"),
      icon: Check,
      colorClass: "text-brand-primary",
      bgClass: "bg-brand-light",
      borderColorClass: "border-emerald-100/50",
    },
    {
      title: t("stats.not_submitted"),
      value: stats.notSubmitted,
      unit: t("stats.students_unit"),
      icon: User,
      colorClass: "text-slate-500",
      bgClass: "bg-slate-100",
      borderColorClass: "border-slate-200/50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 w-full">
      {cards.map((card, idx) => {
        const IconComponent = card.icon;
        return (
          <div
            key={idx}
            className={`bg-white border ${card.borderColorClass} p-5 rounded-3xl flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-md transition-all duration-300`}
          >
            {/* Value & Label */}
            <div className="space-y-1 text-right rtl:text-right ltr:text-left">
              <span className="text-slate-400 text-xs md:text-sm font-bold block leading-none">
                {card.title}
              </span>
              <div className="flex items-baseline gap-1 justify-start rtl:flex-row ltr:flex-row-reverse">
                <span className="text-slate-400 text-xs md:text-sm font-semibold">
                  {card.unit}
                </span>
                <span className="text-black font-extrabold text-2xl md:text-3xl block">
                  {card.value}
                </span>
              </div>
            </div>

            {/* Icon Circle */}
            <div className={`size-14 rounded-2xl ${card.bgClass} flex items-center justify-center shrink-0`}>
              <IconComponent className={`size-6 ${card.colorClass}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
