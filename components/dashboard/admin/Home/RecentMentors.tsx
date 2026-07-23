"use client";

import React from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Users2, ChevronLeft, ChevronRight, UserCheck } from "lucide-react";
import type { AdminMentor } from "@/types";

interface Props {
  mentors: AdminMentor[];
}

export default function RecentMentors({ mentors }: Props) {
  const t = useTranslations("Admin.dashboard.recent_mentors");
  const locale = useLocale();
  const Chevron = locale === "ar" ? ChevronLeft : ChevronRight;

  const displayMentors = mentors.slice(0, 5);

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.015)] p-6 h-full flex flex-col justify-between gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="size-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
            <Users2 className="size-4.5 text-blue-600" />
          </div>
          <h2 className="text-slate-800 font-extrabold text-base md:text-lg">
            {t("title")}
          </h2>
        </div>

        <Link
          href="/admin/mentors"
          className="text-brand-muted hover:text-brand-primary text-xs md:text-sm font-semibold flex items-center gap-1 transition-colors"
        >
          {t("view_all")}
          <Chevron className="size-4" />
        </Link>
      </div>

      {/* List / Content */}
      <div className="flex-1">
        {displayMentors.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
            <div className="size-14 rounded-2xl bg-slate-50 flex items-center justify-center">
              <UserCheck className="size-6 text-slate-300" />
            </div>
            <p className="text-slate-400 text-sm font-medium">
              {t("empty")}
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {displayMentors.map((mentor) => {
              const initial = mentor.name
                ? mentor.name.charAt(0).toUpperCase()
                : "M";

              return (
                <div
                  key={mentor.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/60 border border-slate-100/80 hover:bg-slate-100/70 transition-all duration-200"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="size-10 rounded-xl bg-blue-50 text-blue-600 font-bold text-sm flex items-center justify-center shrink-0">
                      {initial}
                    </div>
                    <div className="min-w-0 text-right rtl:text-right ltr:text-left">
                      <p className="text-slate-800 font-bold text-xs md:text-sm truncate">
                        {mentor.name}
                      </p>
                      <p className="text-slate-400 text-xs truncate dir-ltr">
                        {mentor.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {mentor.students_count !== undefined && (
                      <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100/60">
                        {t("students_count", { count: mentor.students_count })}
                      </span>
                    )}
                    {mentor.account_status && (
                      <span
                        className="size-2 rounded-full bg-emerald-500"
                        title={t("active")}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}