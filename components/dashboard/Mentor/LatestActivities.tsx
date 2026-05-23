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
    <div className="bg-white rounded-[20px] p-6 md:p-8 border border-sidebar-border shadow-sm flex flex-col gap-6 w-full h-full">
      {/* Title Header */}
      <div className="flex items-center gap-2 border-b border-slate-50 pb-4">
        <Zap className="size-5 text-[#22b48d] fill-[#22b48d]/20" />
        <h4 className="font-bold text-black text-lg">
          {t("title")}
        </h4>
      </div>

      {/* Timeline */}
      <div className="relative flex flex-col gap-6 pl-2 pr-2">
        {/* Vertical Linking Line */}
        <div className="absolute top-3 bottom-3 w-0.5 bg-slate-100 rtl:right-[119px] ltr:left-[119px] hidden sm:block"></div>

        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0"
          >
            {/* Time Stamp (Takes fixed width on desktop) */}
            <div className="w-[100px] text-right rtl:text-right ltr:text-left shrink-0 text-brand-muted/70 text-xs md:text-sm font-bold sm:px-2">
              {activity.time}
            </div>

            {/* Icon Container (Aligned exactly in the middle of line) */}
            <div className="flex items-center justify-center shrink-0 w-10 sm:w-10 z-10 rtl:sm:mr-2 ltr:sm:ml-2">
              {activity.iconType === "plus" ? (
                <div className="size-8 rounded-full bg-[#E8FDF2] border border-[#A7F3D0] flex items-center justify-center shadow-xs">
                  <Plus className="size-4 text-[#22b48d] stroke-3" />
                </div>
              ) : (
                <div className="size-8 rounded-full bg-[#E8FDF2] border border-[#A7F3D0] flex items-center justify-center shadow-xs">
                  <Check className="size-4 text-[#22b48d] stroke-3" />
                </div>
              )}
            </div>

            {/* Activity Text */}
            <p className="flex-1 text-black font-extrabold text-sm md:text-base leading-relaxed sm:px-4">
              {activity.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
