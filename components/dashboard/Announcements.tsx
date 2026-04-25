"use client";

import React from "react";
import { Megaphone, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

export function Announcements() {
  const t = useTranslations("Dashboard.announcements");

  const announcements = [
    {
      id: 1,
      title: t("item1_title"),
      description: t("item1_desc"),
      date: "21",
      month: t("october"),
    },
    {
      id: 2,
      title: t("item2_title"),
      description: t("item2_desc"),
      date: "15",
      month: t("october"),
    },
  ];

  return (
    <div className="bg-white rounded-[30px] p-8 border border-slate-100
     shadow-sm flex flex-col justify-between h-full">
      {/* title and view all button */}
      <div className="flex justify-between items-center mb-8">
        {/* title */}
        <div className="flex items-center gap-2 text-brand-primary">
          <Megaphone className="size-5" />
          <h3 className="text-xl font-bold">
            {t("title")}
          </h3>
        </div>
        {/* view all button */}
        <button className="text-black text-sm hover:text-brand-base 
        transition-colors cursor-pointer">
          {t("view_all")}
        </button>
      </div>

      {/* announcements list */}
      <div className="space-y-5 flex-1">
        {announcements.map((item) => (
          <div key={item.id} className="flex items-center gap-4 group cursor-pointer">

            {/* date */}
            <div className="bg-[#D9EAFF] rounded-lg p-2 min-w-[40px] flex flex-col 
            items-center justify-center border border-brand-surface/20 gap-1
            group-hover:bg-brand-base group-hover:text-white transition-all">
              <span className="text-[#004335] text-xs font-bold leading-none">
                {item.date}
              </span>
              <span className="text-[#004335] text-xs font-bold">
                {item.month}
              </span>
            </div>

            {/* title and description */}
            <div className="flex-1">
              <div className="flex justify-between ">
                <h4 className="font-bold text-black 
                group-hover:text-brand-base transition-colors">
                  {item.title}
                </h4>
                <button className="group-hover:cursor-pointer hover:bg-gray-50 
                text-gray-400 group-hover:text-black transition-all">
                  <ChevronLeft className="size-5" />
                </button>
              </div>
              <p className="text-xs text-brand-muted line-clamp-1">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
