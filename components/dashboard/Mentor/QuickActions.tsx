"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Zap, FilePlus, Link2, Mail } from "lucide-react";

export function QuickActions() {
  const t = useTranslations("MentorDashboard.quick_actions");

  const actions = [
    {
      title: t("add_task"),
      icon: FilePlus,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
      hoverColor: "hover:border-emerald-300 hover:shadow-emerald-50",
      onClick: () => console.log("Add task"),
    },
    {
      title: t("add_link"),
      icon: Link2,
      color: "text-teal-600 bg-teal-50 border-teal-100",
      hoverColor: "hover:border-teal-300 hover:shadow-teal-50",
      onClick: () => console.log("Add link"),
    },
    {
      title: t("send_email"),
      icon: Mail,
      color: "text-blue-600 bg-blue-50 border-blue-100",
      hoverColor: "hover:border-blue-300 hover:shadow-blue-50",
      onClick: () => console.log("Send email"),
    },
  ];

  return (
    <div className="bg-white rounded-[20px] p-6 md:p-8 border border-sidebar-border shadow-sm flex flex-col gap-6 w-full h-full justify-between">
      {/* Title Header */}
      <div className="flex items-center gap-2 border-b border-slate-50 pb-4">
        <Zap className="size-5 text-[#22b48d] fill-[#22b48d]/20" />
        <h4 className="font-bold text-black text-lg">
          {t("title")}
        </h4>
      </div>

      {/* Grid of Actions */}
      <div className="grid grid-cols-3 gap-4 my-auto py-2">
        {actions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <button
              key={idx}
              onClick={action.onClick}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border bg-slate-50/50 hover:bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer h-[130px] group ${action.hoverColor}`}
            >
              {/* Centered Icon with circular wrapper */}
              <div className={`size-11 rounded-full flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${action.color}`}>
                <Icon className="size-5.5" />
              </div>
              {/* Centered Title */}
              <span className="text-black font-extrabold text-xs md:text-sm text-center line-clamp-2 leading-tight group-hover:text-[#22b48d] transition-colors">
                {action.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
