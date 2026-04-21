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
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col h-full">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2 text-brand-base">
          <Megaphone className="size-5" />
          <h3 className="text-xl font-bold">{t("title")}</h3>
        </div>
        <button className="text-gray-400 text-sm hover:text-brand-base transition-colors">{t("view_all")}</button>
      </div>

      <div className="space-y-6 flex-1">
        {announcements.map((item) => (
          <div key={item.id} className="flex items-center gap-4 group cursor-pointer">
            <div className="bg-brand-surface rounded-xl p-2 min-w-[56px] flex flex-col items-center justify-center border border-brand-surface/20 group-hover:bg-brand-base group-hover:text-white transition-all">
              <span className="text-lg font-bold leading-none">{item.date}</span>
              <span className="text-[10px] font-medium opacity-80">{item.month}</span>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 group-hover:text-brand-base transition-colors">{item.title}</h4>
              <p className="text-xs text-gray-500 line-clamp-1">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-8">
        <button className="p-2 border border-gray-100 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-900 transition-all">
          <ChevronRight className="size-5" />
        </button>
        <button className="p-2 border border-gray-100 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-900 transition-all">
          <ChevronLeft className="size-5" />
        </button>
      </div>
    </div>
  );
}
