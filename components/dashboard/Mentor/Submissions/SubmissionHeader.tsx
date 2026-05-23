"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { User, School, Laptop } from "lucide-react";
import Image from "next/image";

export function SubmissionHeader() {
  const t = useTranslations("MentorSubmissions.student_card");

  return (
    <div className="bg-white rounded-[20px] p-6 md:p-8 border border-sidebar-border shadow-xs flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-6 w-full">
      {/* Right Section: Student Avatar & Basic Profile info (in RTL) */}
      <div className="flex flex-col sm:flex-row items-center gap-6 text-right rtl:text-right ltr:text-left">
        {/* Avatar */}
        <div className="relative size-18 rounded-full overflow-hidden border border-slate-100 shrink-0">
          <Image
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120"
            alt={t("name")}
            fill
            className="object-cover"
          />
        </div>

        {/* Profile Info Details */}
        <div className="space-y-2.5">
          <h3 className="font-extrabold text-black text-lg md:text-xl flex items-center justify-center sm:justify-start gap-2">
            <User className="size-5 text-[#22b48d]" />
            {t("name")}
          </h3>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-brand-muted/80 text-sm font-bold">
            <div className="flex items-center justify-center sm:justify-start gap-1.5">
              <School className="size-4 text-brand-muted/60" />
              <span>{t("university")}</span>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-1.5">
              <Laptop className="size-4 text-brand-muted/60" />
              <span>{t("track")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Left Section: 3-column Metadata summary (in RTL) */}
      <div className="grid grid-cols-3 gap-2 sm:gap-6 border-t lg:border-t-0 lg:border-r rtl:lg:border-r-0 rtl:lg:border-l border-slate-100 pt-6 lg:pt-0 lg:px-8 shrink-0 items-center justify-items-center sm:justify-items-start">
        {/* Column 1: Submission Status */}
        <div className="space-y-1 text-center sm:text-right rtl:sm:text-right ltr:sm:text-left">
          <span className="text-brand-muted/70 text-xs font-bold block leading-none">
            {t("status_label")}
          </span>
          <span className="bg-[#FEF3C7] text-[#D97706] text-xs font-extrabold px-3 py-1.5 rounded-full inline-block border border-[#FEF08A]/30 shadow-xs mt-1">
            {t("status_pending")}
          </span>
        </div>

        {/* Column 2: Date */}
        <div className="space-y-1 text-center sm:text-right rtl:sm:text-right ltr:sm:text-left">
          <span className="text-brand-muted/70 text-xs font-bold block leading-none">
            {t("date_label")}
          </span>
          <span className="text-black font-extrabold text-xs md:text-sm block mt-1">
            {t("date_value")}
          </span>
        </div>

        {/* Column 3: Last Active */}
        <div className="space-y-1 text-center sm:text-right rtl:sm:text-right ltr:sm:text-left">
          <span className="text-brand-muted/70 text-xs font-bold block leading-none">
            {t("activity_label")}
          </span>
          <span className="text-brand-muted font-bold text-xs md:text-sm block mt-1">
            {t("activity_value")}
          </span>
        </div>
      </div>
    </div>
  );
}
