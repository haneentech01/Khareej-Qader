"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { TrendingUp, Users, ClipboardCheck, Clock } from "lucide-react";

export function MentorStats() {
  const t = useTranslations("MentorDashboard.stats");

  const cards = [
    {
      title: t("average_progress"),
      value: "68%",
      desc: t("average_progress_desc"),
      icon: TrendingUp,
      progress: 68,
    },
    {
      title: t("students_count"),
      value: "42",
      desc: t("students_count_desc"),
      descClass: "text-[#34b898] font-bold",
      icon: Users,
    },
    {
      title: t("new_submissions"),
      value: "8",
      desc: t("new_submissions_desc"),
      descClass: "text-[#34b898] font-bold",
      icon: ClipboardCheck,
    },
    {
      title: t("late_students"),
      value: "5",
      desc: t("late_students_desc"),
      descClass: "text-brand-muted/70",
      icon: Clock,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-[20px] p-6 border border-sidebar-border shadow-xs flex flex-col justify-between min-h-[140px] hover:shadow-md transition-shadow duration-300"
          >
            {/* Header Row */}
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-1">
                <span className="text-brand-muted text-sm font-bold block">
                  {card.title}
                </span>
                <span className="text-3xl font-extrabold text-black block tracking-tight">
                  {card.value}
                </span>
              </div>
              <div className="size-11 rounded-xl bg-[#E8FDF2] border border-[#A7F3D0]/60 flex items-center justify-center shrink-0">
                <Icon className="size-5.5 text-[#22b48d]" />
              </div>
            </div>

            {/* Bottom Row / Custom visuals */}
            <div className="mt-4">
              {card.progress !== undefined ? (
                <div className="space-y-2">
                  <div className="w-full bg-sidebar-border h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#22b48d] h-full rounded-full transition-all duration-500"
                      style={{ width: `${card.progress}%` }}
                    />
                  </div>
                  <span className="text-brand-muted/70 text-xs font-semibold block">
                    {card.desc}
                  </span>
                </div>
              ) : (
                <span className={`text-xs font-semibold block ${card.descClass || "text-brand-muted/70"}`}>
                  {card.desc}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
