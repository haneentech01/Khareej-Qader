"use client";

import { useTranslations } from "next-intl";
import { Users, ClipboardCheck } from "lucide-react";
import { MentorDashboardLastSubmission } from "@/types";

interface MentorStatsProps {
  studentCount?: string | number;
  lastTaskSubmissionsCount?: MentorDashboardLastSubmission[];
}

export function MentorStats({
  studentCount,
  lastTaskSubmissionsCount,
}: MentorStatsProps) {
  const t = useTranslations("MentorDashboard.stats");

  const studentsCount = studentCount ?? "0";
  const newSubmissionsCount = lastTaskSubmissionsCount?.length ?? 0;

  const cards = [
    {
      title: t("students_count"),
      value: studentsCount,
      desc: t("students_count_desc"),
      descClass: "text-brand-primary",
      subDesc: t("student"),
      subDescClass: "text-brand-muted",
      icon: Users,
    },
    {
      title: t("new_submissions"),
      value: newSubmissionsCount,
      desc: t("new_submissions_desc"),
      descClass: "text-brand-primary",
      subDesc: t("submissions"),
      icon: ClipboardCheck,
    },
  ];

  return (
    <div className="grid grid-cols-1 justify-evenly sm:grid-cols-2 gap-2 lg:gap-10">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-3xl py-4
            border border-sidebar-border shadow-xs
            flex flex-col items-center justify-between min-h-[150px]"
          >
            <div className="flex flex-col items-center gap-2 px-6 w-full">
              {/* Header Row */}
              <div className="flex justify-center items-center gap-2.5 w-full">
                <div className="size-11 rounded-xl bg-brand-light-green border border-[#A7F3D0]/60 flex items-center justify-center shrink-0">
                  <Icon className="size-5.5 text-brand-primary" />
                </div>

                <div>
                  <span className="text-black text-base md:text-lg font-bold block">
                    {card.title}
                  </span>
                </div>
              </div>

              {/* Value */}
              <span className="text-3xl font-extrabold text-black block tracking-tight">
                {card.value}
              </span>

              {/* Bottom Row / Custom visuals */}
              <div className="text-center">
                <div className="space-y-2">
                  <span className={`text-xs md:text-sm font-medium block ${card.subDescClass}`}>
                    {card.subDesc}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}