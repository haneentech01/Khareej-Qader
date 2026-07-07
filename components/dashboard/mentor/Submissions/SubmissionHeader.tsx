"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { User, School, Laptop } from "lucide-react";
import Image from "next/image";

export function SubmissionHeader() {
  const t = useTranslations("MentorSubmissions.student_card");

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 
    border border-sidebar-border shadow-xs 
    flex flex-col lg:flex-row justify-between 
    items-start md:items-center gap-6 w-full">
      {/* Student Avatar & Basic Profile info (in RTL) */}
      <div className="flex flex-row items-center gap-6 text-right rtl:text-right ltr:text-left">
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
        <div className="flex flex-col justify-start items-start gap-2">
          {/* Student Name */}
          <div className="flex justify-start items-start gap-2">
            <User className="size-4 md:size-5 text-brand-muted" />
            <span className="font-bold text-black text-xs md:text-sm">
              {t("name")}
            </span>
          </div>

          {/* University */}
          <div className="flex justify-start items-start gap-2">
            <School className="size-4 md:size-5 text-brand-muted" />
            <span className="text-black text-xs md:text-sm">
              {t("university")}
            </span>
          </div>

          {/* Track */}
          <div className="flex justify-start items-start gap-2">
            <Laptop className="size-4 md:size-5 text-brand-muted" />
            <span className="text-black text-xs md:text-sm">
              {t("track")}
            </span>
          </div>
        </div>
      </div>

      {/* 3-column Metadata summary (in RTL) */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Column 1: Submission Status */}
        <div className="flex flex-col justify-center items-center gap-2 px-2 md:px-4">
          <span className="text-gray-400 text-xs block leading-none text-center">
            {t("status_label")}
          </span>
          <span className="bg-brand-light-orange text-brand-orange 
          text-xs font-bold px-5 py-1.5 rounded-full 
          inline-block shadow-xs text-center whitespace-nowrap">
            {t("status_pending")}
          </span>
        </div>

        {/* Column 2: Date */}
        <div className="flex flex-col justify-center items-center gap-2 px-2 md:px-4">
          <span className="text-gray-400 text-xs block leading-none text-center">
            {t("date_label")}
          </span>
          <span className="text-black font-bold text-xs md:text-sm block text-center">
            {t("date_value")}
          </span>
        </div>

        {/* Column 3: Last Active */}
        <div className="flex flex-col justify-center items-center gap-2 px-2 md:px-4">
          <span className="text-gray-400 text-xs block leading-none text-center">
            {t("activity_label")}
          </span>
          <span className="text-brand-muted font-bold text-xs md:text-sm block text-center">
            {t("activity_value")}
          </span>
        </div>
      </div>
    </div>
  );
}
