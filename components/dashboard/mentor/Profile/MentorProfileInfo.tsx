"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { User, Mail, BookOpen, Code2 } from "lucide-react";
import { MentorProfile, MentorDashboardData } from "@/types";

interface MentorProfileInfoProps {
  mentor: MentorProfile | null;
  dashboard: MentorDashboardData | null;
  loading?: boolean;
}

export function MentorProfileInfo({ mentor, dashboard, loading }: MentorProfileInfoProps) {
  const t = useTranslations("MentorProfilePage");

  // Resolve course name: could be string[] or string
  const courseName = (() => {
    const raw = dashboard?.course_name;
    if (!raw) return "—";
    if (Array.isArray(raw)) return raw.join("، ");
    return String(raw);
  })();

  const fields = [
    {
      label: t("info.full_name"),
      value: mentor?.name || "—",
      icon: User,
    },
    {
      label: t("info.email"),
      value: mentor?.email || "—",
      icon: Mail,
    },
    {
      label: t("info.major"),
      value: mentor?.major || mentor?.role || "—",
      icon: BookOpen,
    },
    {
      label: t("info.track"),
      value: courseName,
      icon: Code2,
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.015)] p-6 h-full flex flex-col gap-5">
      {/* Card Title */}
      <div className="flex items-center gap-2.5">
        <div className="size-9 rounded-xl bg-brand-light-green flex items-center justify-center shrink-0">
          <User className="size-4.5 text-brand-primary" />
        </div>
        <h2 className="text-slate-800 font-extrabold text-base md:text-lg">
          {t("info.title")}
        </h2>
      </div>

      {/* Fields */}
      <div className="flex flex-col divide-y divide-slate-50">
        {fields.map((field) => {
          const Icon = field.icon;
          return (
            <div
              key={field.label}
              className="flex items-center justify-between py-3.5 gap-4"
            >
              {/* Value on the right (RTL) */}
              {loading ? (
                <div className="h-4 bg-slate-100 animate-pulse rounded-md w-1/2" />
              ) : (
                <span className="text-slate-800 font-bold text-sm truncate max-w-[55%] text-right rtl:text-right ltr:text-left">
                  {field.value}
                </span>
              )}
              {/* Label + icon on the left (RTL) */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-slate-400 font-semibold text-xs md:text-sm">
                  {field.label}
                </span>
                <div className="size-7 rounded-lg bg-slate-50 flex items-center justify-center">
                  <Icon className="size-3.5 text-slate-400" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
