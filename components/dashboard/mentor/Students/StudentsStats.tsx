"use client";

import { useTranslations } from "next-intl";
import { Users, Loader2 } from "lucide-react";

interface StudentsStatsProps {
  totalStudentsCount: number;
  loading?: boolean;
  error?: string | null;
}

export const StudentsStats = ({
  totalStudentsCount,
  loading = false,
  error = null,
}: StudentsStatsProps) => {
  const t = useTranslations("MentorStudents.stats");

  return (
    <div className="grid grid-cols-12 gap-4 mb-6">
      <div
        className="col-span-6 bg-white rounded-2xl py-4
        border border-sidebar-border shadow-xs
        flex flex-col items-center justify-between
       transition-shadow duration-300"
      >
        <div className="flex flex-col items-center gap-2 px-3 w-full">
          {/* Header Row */}
          <div className="flex justify-center items-center gap-2.5 w-full">
            <div className="size-10 rounded-xl bg-brand-light-green 
            border border-brand-light flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-blue-500" />
            </div>

            <div>
              <span className="text-black text-base font-bold block">
                {t("total_students")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Value */}
            {loading ? (
              <Loader2 className="w-6 h-6 text-brand-muted animate-spin" />
            ) : error ? (
              <span className="text-sm font-medium text-red-500">—</span>
            ) : (
              <span className="text-3xl font-extrabold text-black block tracking-tight">
                {totalStudentsCount}
              </span>
            )}

            {!loading && !error && (
              <span className="text-xs md:text-sm font-extrabold block">
                {t("students")}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
