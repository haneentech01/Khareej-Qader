"use client";

import React from "react";
import { Clock, Check } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { StudentTaskSubmission } from "@/types";

interface ReviewStatusCardProps {
  status: "pending" | "completed";
  submission?: StudentTaskSubmission | null;
}

export function ReviewStatusCard({ status, submission }: ReviewStatusCardProps) {
  const t = useTranslations("Dashboard.TaskDetailsPage");
  const locale = useLocale();
  const isCompleted = status === "completed";


  const formatDateTime = (isoDate: string | null | undefined) => {
    if (!isoDate) return "—";
    try {
      const d = new Date(isoDate);
      return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }).format(d);
    } catch {
      return isoDate;
    }
  };

  const displayDate = isCompleted
    ? formatDateTime(submission?.reviewed_at)
    : formatDateTime(submission?.created_at);

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 
    border border-sidebar-border shadow-sm 
    flex flex-col md:flex-row justify-between
    items-start md:items-center gap-6">

      {/* Mentor Info */}
      <div className="flex items-center gap-4 shrink-0">
        <div className="space-y-1 text-right md:text-right">
          <span className="text-brand-muted text-xs md:text-sm block">
            {isCompleted
              ? t("mentor_review_title")
              : t("mentor_pending_review_title")}
          </span>
          <h5 className="font-bold text-black text-lg md:text-xl">
            {submission?.reviewer?.name}
          </h5>
          <span className="text-brand-base text-xs md:text-sm font-medium block">
            {t("mentor_role")}
          </span>
        </div>
      </div>

      {/* Status Details */}
      <div className="flex items-center gap-4">
        {isCompleted ? (
          <div className="size-12 rounded-full bg-brand-light flex items-center justify-center shrink-0">
            <Check className="size-6 text-brand-base stroke-3" />
          </div>
        ) : (
          <div className="size-12 rounded-full bg-brand-light-orange flex items-center justify-center shrink-0">
            <Clock className="size-6 text-brand-orange" />
          </div>
        )}

        <div className="space-y-1.5">
          <h4 className={`font-bold text-lg md:text-xl 
            ${isCompleted ? "text-brand-base" : "text-brand-orange"}`}>
            {isCompleted ? t("review_status_completed") : t("review_status_waiting")}
          </h4>
          <p className="text-brand-muted text-xs md:text-sm">
            {isCompleted ? t("review_status_completed_desc") : t("review_status_desc")}
          </p>
          <p className="text-brand-muted/70 text-xs">
            {isCompleted
              ? t("reviewed_on", { date: displayDate })
              : t("submitted_on", { date: displayDate })
            }
          </p>
        </div>
      </div>
    </div>
  );
}