"use client";

import React from "react";
import { Clock, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface ReviewStatusCardProps {
  status: "pending" | "completed";
}

export function ReviewStatusCard({ status }: ReviewStatusCardProps) {
  const t = useTranslations("Dashboard.TaskDetailsPage");
  const isCompleted = status === "completed";

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 
    border border-sidebar-border shadow-sm 
    flex flex-col md:flex-row justify-between
    items-start md:items-center gap-6">
      {/* Mentor Info */}
      <div className="flex items-center gap-4 shrink-0">
        {/* Image Of Mentor */}
        <div className="relative size-14 rounded-full overflow-hidden shrink-0">
          <Image
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150"
            alt={t("mentor_name")}
            fill
            className="object-cover"
          />
        </div>

        {/* Mentor Name and Role */}
        <div className="space-y-1 text-right md:text-right">
          <span className="text-brand-muted text-xs md:text-sm block">
            {t("mentor_review_title")}
          </span>
          <h5 className="font-bold text-black text-lg md:text-xl">
            {t("mentor_name")}
          </h5>
          <span className="text-brand-base text-xs md:text-sm font-medium block">
            {t("mentor_role")}
          </span>
        </div>
      </div>

      {/* Status Details */}
      <div className="flex items-center gap-4">
        {/* Icon Of Status */}
        {isCompleted ? (
          <div className="size-12 rounded-full bg-brand-light flex items-center justify-center shrink-0">
            <Check className="size-6 text-brand-base stroke-3" />
          </div>
        ) : (
          <div className="size-12 rounded-full bg-brand-light-orange flex items-center justify-center shrink-0">
            <Clock className="size-6 text-brand-orange" />
          </div>
        )}

        {/* Status Text and Date */}
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
              ? t("reviewed_on", { date: "25 أبريل 2024, 11:59 م" })
              : t("submitted_on", { date: "25 أبريل 2024, 11:59 م" })
            }
          </p>
        </div>
      </div>
    </div>
  );
}
