"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Zap, Check, Plus } from "lucide-react";
import { useLocale } from "next-intl";

export function LatestActivities() {
  const t = useTranslations("MentorDashboard.activities");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const activities = [
    {
      id: "1",
      time: isRtl ? "قبل ساعة" : "An hour ago",
      text: t("submitted", { name: "محمد خالد", task: "React (الجزء 2)" }),
      iconType: "check",
    },
    {
      id: "2",
      time: isRtl ? "قبل 3 ساعات" : "3 hours ago",
      text: t("submitted", { name: "آية أحمد", task: "تصميم Landing Page" }),
      iconType: "check",
    },
    {
      id: "3",
      time: isRtl ? "قبل 5 ساعات" : "5 hours ago",
      text: t("added_link", { lesson: "HTML Forms" }),
      iconType: "check",
    },
    {
      id: "4",
      time: isRtl ? "أمس" : "Yesterday",
      text: t("created_task", { task: "JavaScript Functions" }),
      iconType: "plus",
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 border border-sidebar-border shadow-sm flex flex-col gap-6 w-full h-full">
      {/* Title Header */}
      <div className="flex items-center gap-2 border-b border-slate-50 pb-4">
        <div className="size-10 bg-brand-light flex items-center justify-center rounded-xl">
          <Zap className="size-5 text-brand-primary" />
        </div>
        <h4 className="font-bold text-black text-lg">
          {t("title")}
        </h4>
      </div>

      {/* Timeline */}
      <div className="relative flex flex-col gap-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0"
          >
            {/* Time Stamp (Takes fixed width on desktop) */}
            <div className="w-[100px] text-right rtl:text-right ltr:text-left shrink-0 text-brand-muted text-xs sm:px-2">
              {activity.time}
            </div>


            {/* Activity Text */}
            <p className="flex-1 text-black text-sm md:text-base leading-relaxed sm:px-2">
              {activity.text}
            </p>

            {/* Icon Container (Aligned exactly in the middle of line) */}
            <div className="flex items-center justify-center shrink-0 w-10 sm:w-10 z-10 rtl:sm:mr-2 ltr:sm:ml-2">
              {activity.iconType === "plus" ? (
                <div className="size-7 rounded-full bg-brand-light-green border border-brand-primary/30 flex items-center justify-center shadow-xs">
                  <Plus className="size-4 text-brand-primary stroke-3" />
                </div>
              ) : (
                <div className="size-7 rounded-full bg-brand-light-green border border-brand-primary/30 flex items-center justify-center shadow-xs">
                  <Check className="size-4 text-brand-primary stroke-3" />
                </div>
              )}
            </div>


          </div>
        ))}
      </div>
    </div>
  );
}
