"use client";


import { useTranslations, useLocale } from "next-intl";
import { Users, ChevronLeft, ChevronRight, GraduationCap } from "lucide-react";
import type { AdminStudent } from "@/types";
import { Link } from "@/i18n/routing";

interface Props {
  students: AdminStudent[];
}

export default function RecentStudents({ students }: Props) {
  const t = useTranslations("Admin.dashboard.recent_students");
  const locale = useLocale();
  const Chevron = locale === "ar" ? ChevronLeft : ChevronRight;

  const displayStudents = students.slice(0, 5);

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.015)] p-6 h-full flex flex-col justify-between gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="size-9 rounded-xl bg-brand-light-green flex items-center justify-center shrink-0">
            <GraduationCap className="size-4.5 text-brand-primary" />
          </div>
          <h2 className="text-slate-800 font-extrabold text-base md:text-lg">
            {t("title")}
          </h2>
        </div>

        <Link
          href="/admin/students"
          className="text-brand-muted hover:text-brand-primary text-xs md:text-sm font-semibold flex items-center gap-1 transition-colors"
        >
          {t("view_all")}
          <Chevron className="size-4" />
        </Link>
      </div>

      {/* List / Content */}
      <div className="flex-1">
        {displayStudents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
            <div className="size-14 rounded-2xl bg-slate-50 flex items-center justify-center">
              <Users className="size-6 text-slate-300" />
            </div>
            <p className="text-slate-400 text-sm font-medium">
              {t("empty")}
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {displayStudents.map((student) => {
              const initial = student.full_name
                ? student.full_name.charAt(0).toUpperCase()
                : "S";

              return (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/60 border border-slate-100/80 hover:bg-slate-100/70 transition-all duration-200"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="size-10 rounded-xl bg-brand-light-green text-brand-primary font-bold text-sm flex items-center justify-center shrink-0">
                      {initial}
                    </div>
                    <div className="min-w-0 text-right rtl:text-right ltr:text-left">
                      <p className="text-slate-800 font-bold text-xs md:text-sm truncate">
                        {student.full_name}
                      </p>
                      <p className="text-slate-400 text-xs truncate dir-ltr">
                        {student.email}
                      </p>
                    </div>
                  </div>

                  {student.created_at && (
                    <span className="text-[11px] font-medium text-slate-400 bg-white px-2.5 py-1 rounded-lg border border-slate-100 shrink-0">
                      {new Date(student.created_at).toLocaleDateString(locale)}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
