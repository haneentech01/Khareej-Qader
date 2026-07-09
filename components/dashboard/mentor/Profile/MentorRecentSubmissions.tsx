"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { ClipboardList, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { Link } from "@/i18n/routing";
import { MentorDashboardLastSubmission } from "@/types";

interface MentorRecentSubmissionsProps {
  submissions: MentorDashboardLastSubmission[];
  loading?: boolean;
}

// ─── Helper ─────────────────────────────────────────────────────────────────────
function formatRelativeTime(sqlDate: string, locale: string): string {
  if (!sqlDate) return "—";
  const normalized = sqlDate.includes("T") ? sqlDate : sqlDate.replace(" ", "T");
  const isoStr = normalized.endsWith("Z") ? normalized : `${normalized}Z`;
  const date = new Date(isoStr);
  if (Number.isNaN(date.getTime())) return sqlDate;

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.round(diffMs / 60000);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);
  const isAr = locale === "ar";

  if (diffMin < 60) return isAr ? `قبل ${diffMin} دقيقة` : `${diffMin}m ago`;
  if (diffHour < 24) return isAr ? `قبل ${diffHour} ساعة` : `${diffHour}h ago`;
  if (diffDay === 1) return isAr ? "أمس" : "Yesterday";
  if (diffDay < 7) return isAr ? `قبل ${diffDay} أيام` : `${diffDay}d ago`;

  try {
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  } catch {
    return sqlDate;
  }
}

// ─── Skeleton Row ────────────────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <div className="flex items-center justify-between py-4 gap-4 border-b border-slate-50 last:border-0 animate-pulse">
      <div className="size-9 rounded-full bg-slate-100 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3.5 bg-slate-100 rounded-md w-3/4" />
        <div className="h-3 bg-slate-50 rounded-md w-1/2" />
      </div>
      <div className="h-6 w-20 bg-slate-100 rounded-lg" />
    </div>
  );
}

export function MentorRecentSubmissions({ submissions, loading }: MentorRecentSubmissionsProps) {
  const t = useTranslations("MentorProfilePage");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const Chevron = isRtl ? ChevronLeft : ChevronRight;

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.015)] p-6 h-full flex flex-col gap-5">
      {/* Card Title */}
      <div className="flex items-center justify-between">
        <Link
          href="/mentor/submissions"
          className="text-brand-muted hover:text-brand-primary text-xs md:text-sm flex items-center gap-1 transition-colors"
        >
          {t("recent_submissions.view_all")}
          <Chevron className="size-3.5" />
        </Link>
        <div className="flex items-center gap-2.5">
          <h2 className="text-slate-800 font-extrabold text-base md:text-lg">
            {t("recent_submissions.title")}
          </h2>
          <div className="size-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
            <ClipboardList className="size-4.5 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => <SkeletonRow key={i} />)
        ) : submissions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
            <div className="size-14 rounded-2xl bg-slate-50 flex items-center justify-center">
              <ClipboardList className="size-6 text-slate-300" />
            </div>
            <p className="text-slate-400 text-sm font-medium">
              {t("recent_submissions.empty")}
            </p>
          </div>
        ) : (
          submissions.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 py-4 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 -mx-2 px-2 rounded-xl transition-colors"
            >
              {/* Avatar placeholder */}
              <div className="size-9 rounded-full bg-brand-light-green flex items-center justify-center shrink-0 text-brand-primary font-bold text-sm">
                {item.student_name?.[0] || "؟"}
              </div>

              {/* Info */}
              <div className="flex-1 text-right rtl:text-right ltr:text-left overflow-hidden">
                <p className="text-slate-800 font-bold text-sm truncate">
                  {item.student_name || "—"}
                </p>
                <p className="text-slate-400 text-xs font-medium truncate">
                  {item.task_title || "—"}
                </p>
              </div>

              {/* Time */}
              <div className="flex items-center gap-1 text-slate-400 shrink-0">
                <span className="text-xs font-medium">
                  {formatRelativeTime(item.submitted_at, locale)}
                </span>
                <Clock className="size-3.5" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
