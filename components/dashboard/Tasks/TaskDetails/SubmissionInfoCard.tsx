"use client";

import React from "react";
import { Calendar, ClipboardList } from "lucide-react";
import { useTranslations } from "next-intl";
import { SubmissionInfoCardProps } from "@/types";

export function SubmissionInfoCard({ status }: SubmissionInfoCardProps) {
  const t = useTranslations("Dashboard.TaskDetailsPage");
  const isCompleted = status === "completed";

  const details = [
    {
      label: t("submission_date"),
      value: "25 أبريل 2024, 11:59 م",
    },
    {
      label: t("deadline_date"),
      value: "25 أبريل 2024, 11:59 م",
    },
    {
      label: t("submission_status"),
      value: isCompleted ? (
        <span className="bg-brand-light text-brand-base text-xs md:text-sm font-medium px-4 py-1.5 rounded-full inline-flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-brand-base"></span>
          {t("review_status_completed")}
        </span>
      ) : (
        <span className="bg-brand-light text-brand-orange text-xs md:text-sm font-medium px-4 py-1.5 rounded-full inline-flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-brand-orange animate-pulse"></span>
          {t("review_status_waiting")}
        </span>
      ),
    },
    {
      label: t("attempts_count"),
      value: "1",
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-sidebar-border shadow-sm flex flex-col gap-6 w-full">
      {/* Card Title */}
      <div className="flex items-center gap-2">
        <Calendar className="size-5 text-brand-orange" />
        <h4 className="font-bold text-black text-lg">
          {t("submission_info_title")}
        </h4>
      </div>

      {/* Details List */}
      <div className="flex flex-col divide-y divide-gray-50">
        {details.map((detail, idx) => (
          <div key={idx} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
            <span className="text-brand-muted text-xs md:text-sm">
              {detail.label}
            </span>
            <span className="text-black font-medium text-xs md:text-sm">
              {detail.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
