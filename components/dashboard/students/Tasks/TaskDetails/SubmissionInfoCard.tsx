"use client";

import React from "react";
import { Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import { StudentTaskSubmission } from "@/types";

// تحديث الـ Props لتستقبل البيانات
export interface SubmissionInfoCardProps {
  status: "completed" | "pending";
  submission: StudentTaskSubmission | null;
  deadline?: string; // تاريخ التسليم النهائي للمهمة (إن وجد)
}

export function SubmissionInfoCard({ status, submission, deadline }: SubmissionInfoCardProps) {
  const t = useTranslations("Dashboard.TaskDetailsPage");
  const isCompleted = status === "completed";

  const formatDate = (dateString?: string) => {
    if (!dateString) return "—";
    try {
      return new Date(dateString).toLocaleString("ar-EG", {
        year: "numeric", month: "long", day: "numeric",
        hour: "2-digit", minute: "2-digit"
      });
    } catch {
      return "—";
    }
  };

  const details = [
    {
      label: t("submission_date"),
      value: formatDate(submission?.created_at),
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
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-sidebar-border shadow-sm flex flex-col gap-6 w-full">
      <div className="flex items-center gap-2">
        <Calendar className="size-5 text-brand-orange" />
        <h4 className="font-bold text-black text-lg">
          {t("submission_info_title")}
        </h4>
      </div>

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