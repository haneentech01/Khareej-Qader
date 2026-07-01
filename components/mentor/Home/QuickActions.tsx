"use client";

import { useTranslations } from "next-intl";
import { Zap, FilePlus } from "lucide-react";

export function QuickActions() {
  const t = useTranslations("MentorDashboard.quick_actions");

  const actions = [
    {
      title: t("add_task"),
      icon: FilePlus,
      color: "text-brand-primary bg-white border border-gray-100",
      hoverColor: "hover:border-brand-primary hover:shadow-emerald-50",
      onClick: () => console.log("Add task"),
    },
    // {
    //   title: t("send_email"),
    //   icon: Mail,
    //   color: "text-brand-primary bg-white border border-gray-100",
    //   hoverColor: "hover:border-brand-primary hover:shadow-blue-50",
    //   onClick: () => console.log("Send email"),
    // },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 border border-sidebar-border shadow-sm flex flex-col w-full h-full justify-between">
      {/* Title Header */}
      <div className="flex items-center gap-2 pb-4">
        <div className="size-10 bg-brand-light flex items-center justify-center rounded-xl">
          <Zap className="size-5 text-brand-primary" />
        </div>
        <h4 className="font-bold text-black text-lg">
          {t("title")}
        </h4>
      </div>

      {/* Grid of Actions */}
      <div className="grid grid-cols-1 gap-3 md:gap-7 my-auto">
        {actions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <button
              key={idx}
              onClick={action.onClick}
              className={`flex flex-col items-center justify-center 
                p-4 rounded-2xl border bg-slate-50 hover:bg-white 
                transition-all duration-300 hover:-translate-y-1 
                hover:shadow-md cursor-pointer h-[160px] group 
                ${action.hoverColor}`}
            >
              {/* Centered Icon with circular wrapper */}
              <div className={`size-14 rounded-2xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${action.color}`}>
                <Icon className="size-6" />
              </div>
              {/* Centered Title */}
              <span className="text-black font-bold text-xs md:text-sm text-center leading-tight group-hover:text-brand-primary transition-colors">
                {action.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
