"use client";

import React from "react";
import { Eye, FileCode2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface PreviousTaskItemProps {
  title: string;
  date: string;
  status: string;
}

export function PreviousTaskItem({ title, date }: PreviousTaskItemProps) {
  const t = useTranslations("Dashboard.TasksPage.previous_tasks");

  return (
    <div className="bg-white rounded-[30px] p-5 flex items-center justify-between border border-transparent hover:border-brand-surface transition-all group">
      <div className="flex items-center gap-4">
        <div className="size-12 bg-brand-surface rounded-full flex items-center justify-center">
          <FileCode2 className="size-6 text-brand-base" />
        </div>
        <div>
          <h5 className="font-bold text-black">{title}</h5>
          <p className="text-xs text-brand-muted">{t("submitted_on", { date })}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <span className="bg-[#D1FAE5] text-[#34B898] text-xs font-bold px-3 py-1 rounded-full">
          {t("completed_status")}
        </span>
        <button className="text-brand-muted hover:text-brand-base transition-colors">
          <Eye className="size-5" />
        </button>
      </div>
    </div>
  );
}
