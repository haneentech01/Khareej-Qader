"use client";

import React from "react";
import { Megaphone } from "lucide-react";
import { useTranslations } from "next-intl";
import { DashboardAnnouncement } from "@/types";

interface AnnouncementsProps {
  announcements?: DashboardAnnouncement[];
}

export function Announcements({ announcements = [] }: AnnouncementsProps) {
  const t = useTranslations("Dashboard.announcements");

  return (
    <div className="bg-white rounded-[30px] p-8 border border-slate-100
     shadow-sm flex flex-col justify-between h-full">
      {/* title and view all button */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2 text-brand-primary">
          <Megaphone className="size-5" />
          <h3 className="text-xl font-bold">
            {t("title")}
          </h3>
        </div>
        <button className="text-black text-sm hover:text-brand-base
        transition-colors cursor-pointer">
          {t("view_all")}
        </button>
      </div>

      {/* announcements list */}
      <div className="space-y-5 flex-1">
        {announcements.length > 0 ? (
          announcements.map((item) => {
            const dateObj = new Date(item.date);
            const day = dateObj.getDate().toString();
            const month = dateObj.toLocaleDateString("ar", { month: "short" });

            return (
              <div key={item.id} className="flex items-center gap-4 group cursor-pointer">
                {/* date */}
                <div className="bg-[#D9EAFF] rounded-lg p-2 min-w-[40px] flex flex-col
                items-center justify-center border border-brand-surface/20 gap-1
                group-hover:bg-brand-base group-hover:text-white transition-all">
                  <span className="text-[#004335] text-xs font-bold leading-none group-hover:text-white">
                    {day}
                  </span>
                  <span className="text-[#004335] text-xs font-bold group-hover:text-white">
                    {month}
                  </span>
                </div>

                {/* title and description */}
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-bold text-black
                    group-hover:text-brand-base transition-colors">
                      {item.title}
                    </h4>
                    <button className="group-hover:cursor-pointer hover:bg-gray-50
                    text-gray-400 group-hover:text-black transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl:rotate-180"><path d="m9 18 6-6-6-6" /></svg>
                    </button>
                  </div>
                  <p className="text-xs text-brand-muted line-clamp-1">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center py-8">
            <p className="text-brand-muted text-sm">{t("view_all")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
