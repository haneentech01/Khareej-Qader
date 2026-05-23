"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { FileText, Eye } from "lucide-react";
import Link from "next/link";

export function TaskInfoCard() {
  const t = useTranslations("MentorSubmissions.task_card");

  const infoItems = [
    { label: t("task_name_label"), value: t("task_name_value"), isBold: true },
    { label: t("lesson_label"), value: t("lesson_value") },
    { label: t("deadline_label"), value: t("deadline_value") },
  ];

  return (
    <div className="bg-white rounded-[20px] p-6 md:p-8 border border-sidebar-border shadow-xs flex flex-col gap-6 w-full h-full">
      {/* Title Header */}
      <div className="flex items-center gap-2 border-b border-slate-50 pb-4">
        <div className="size-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
          <FileText className="size-4.5 text-amber-600" />
        </div>
        <h4 className="font-extrabold text-black text-lg">
          {t("title")}
        </h4>
      </div>

      {/* Information Grid/List */}
      <div className="flex flex-col gap-4">
        {infoItems.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center py-2 border-b border-slate-50 last:border-b-0"
          >
            <span className="text-brand-muted/70 text-sm font-bold">
              {item.label}
            </span>
            <span className={`text-black text-sm md:text-base ${item.isBold ? "font-extrabold" : "font-semibold"}`}>
              {item.value}
            </span>
          </div>
        ))}

        {/* Task Instructions Link */}
        <div className="flex justify-between items-center py-2">
          <span className="text-brand-muted/70 text-sm font-bold">
            {t("instructions_label")}
          </span>
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              console.log("View instructions");
            }}
            className="text-[#22b48d] hover:underline font-extrabold text-sm flex items-center gap-1.5 transition-all"
          >
            <Eye className="size-4" />
            {t("instructions_link")}
          </Link>
        </div>
      </div>
    </div>
  );
}
