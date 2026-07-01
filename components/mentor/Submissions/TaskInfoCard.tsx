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
    <div className="bg-white rounded-3xl p-6 border border-sidebar-border shadow-xs flex flex-col gap-6 w-full h-full">
      {/* Title Header */}
      <div className="flex items-center gap-2 border-b border-slate-50 pb-4">
        <FileText className="size-6 text-brand-orange" />
        <h4 className="font-bold text-black text-lg md:text-xl">
          {t("title")}
        </h4>
      </div>

      {/* Information Grid/List */}
      <div className="flex flex-col gap-5 px-3">
        {infoItems.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center gap-4"
          >
            <span className="text-brand-muted text-sm">
              {item.label}
            </span>
            <span className={`text-black text-sm ${item.isBold ? "font-bold" : "font-normal"}`}>
              {item.value}
            </span>
          </div>
        ))}

        {/* Task Instructions Link */}
        <div className="flex justify-between items-center gap-4">
          <span className="text-brand-muted text-sm">
            {t("instructions_label")}
          </span>
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              console.log("View instructions");
            }}
            className="text-brand-primary hover:underline font-bold text-sm flex items-center gap-1.5 transition-all"
          >
            <Eye className="size-4" />
            {t("instructions_link")}
          </Link>
        </div>
      </div>
    </div>
  );
}
