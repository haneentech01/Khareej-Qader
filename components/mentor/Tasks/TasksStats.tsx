"use client";

import { useTranslations } from "next-intl";
import { FileText, Loader2 } from "lucide-react";

interface TasksStatsProps {
  /**
   * إجمالي عدد المهام (يأتي من endpoint /tasks/count).
   * لو null => الـ data لسه بتنزل، نعرض skeleton.
   */
  totalTasksCount: number;
  /** هل الـ request لسه شغّال؟ */
  loading?: boolean;
  /** نص الخطأ لو فشل الـ request */
  error?: string | null;
}

/**
 * كارد "إجمالي المهام" في صفحة /mentor/tasks.
 *
 * البيانات تأتي من endpoint /tasks/count عبر hook ‏useMentorTasksCount.
 * المكوّن presentational فقط — لا يجيب الداتا بنفسه (فصل المسؤوليات).
 *
 * لو `loading` نعرض spinner، ولو `error` نعرض رسالة خطأ بدل الرقم.
 */
export const TasksStats = ({
  totalTasksCount,
  loading = false,
  error = null,
}: TasksStatsProps) => {
  const t = useTranslations("MentorTasks.stats");

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div
        className="bg-white rounded-2xl py-4
        border border-sidebar-border shadow-xs
        flex flex-col items-center justify-between
        hover:shadow-md transition-shadow duration-300"
      >
        <div className="flex flex-col items-center gap-2 px-3 w-full">
          {/* Header Row */}
          <div className="flex justify-center items-center gap-2.5 w-full">
            <div className="size-10 rounded-xl bg-brand-light-green 
            border border-[#A7F3D0]/60 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-blue-500" />
            </div>

            <div>
              <span className="text-black text-base font-bold block">
                {t("total_tasks")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Value */}
            {loading ? (
              <Loader2 className="w-6 h-6 text-brand-muted animate-spin" />
            ) : error ? (
              <span className="text-sm font-medium text-red-500">—</span>
            ) : (
              <span className="text-3xl font-extrabold text-black block tracking-tight">
                {totalTasksCount}
              </span>
            )}

            {!loading && !error && (
              <span className="text-xs md:text-sm font-medium block">
                {t("task")}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
