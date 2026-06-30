"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Users, ClipboardCheck } from "lucide-react";

export function MentorStats() {
  const t = useTranslations("MentorDashboard.stats");

  const cards = [
    // {
    //   title: t("average_progress"),
    //   value: "68%",
    //   desc: t("average_progress_desc"),
    //   icon: TrendingUp,
    //   progress: 68,
    // },
    {
      title: t("students_count"),
      value: "42",
      desc: t("students_count_desc"),
      descClass: "text-brand-primary",
      subDesc: t("student"),
      subDescClass: "text-brand-muted",
      icon: Users,
    },
    {
      title: t("new_submissions"),
      value: "8",
      desc: t("new_submissions_desc"),
      descClass: "text-brand-primary",
      subDesc: t("submissions"),
      icon: ClipboardCheck,
    },
    // {
    //   title: t("late_students"),
    //   value: "5",
    //   desc: t("late_students_desc"),
    //   descClass: "text-brand-primary",
    //   subDesc: t("student"),
    //   icon: Clock,
    // },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-[24px] py-4
            border border-sidebar-border shadow-xs 
            flex flex-col items-center justify-between min-h-[140px] 
            hover:shadow-md transition-shadow duration-300"
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
                {/* {card.progress !== undefined ? (
                  <div className="space-y-4">
                    <span className={`text-xs md:text-sm font-medium block ${card.descClass}`}>
                      {card.desc}
                    </span>
                    <div className="w-full bg-sidebar-border h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-brand-primary h-full rounded-full transition-all duration-500"
                        style={{ width: `${card.progress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                )} */}

                <div className="space-y-2">
                  <span className={`text-xs md:text-sm font-medium block ${card.subDescClass}`}>
                    {card.subDesc}
                  </span>
                  {/* <span className={`text-xs md:text-sm font-medium block ${card.descClass}`}>
                    {card.desc}
                  </span> */}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
