"use client";

import { useTranslations, useLocale } from "next-intl";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination } from "@/components/ui/Pagination";
import { Loader2, Inbox } from "lucide-react";
import { MentorTaskListItem } from "@/types";

interface TasksTableProps {
  /** قائمة المهام القادمة من endpoint /tasks/list */
  tasks: MentorTaskListItem[];
  /** هل الـ request لسه شغّال؟ */
  loading?: boolean;
  /** نص الخطأ لو فشل الـ request */
  error?: string | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * تنسيق تاريخ التسليم بصيغة locale-aware.
 *
 * مثال: "2026-07-01T00:00:00.000000Z" → "1 يوليو 2026" (ar)
 *
 * نفصل الـ formatting في دالة pure لتسهيل الاختبار وإعادة الاستخدام.
 */
function formatDeadline(isoDate: string, locale: string): string {
  if (!isoDate) return "—";
  try {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } catch {
    return isoDate;
  }
}

/**
 * جدول عرض المهام في صفحة /mentor/tasks.
 *
 * المكوّن presentational: يستقبل `tasks` و `loading` و `error` كـ props
 * ولا يجلب الداتا بنفسه — هذا من مسؤولية الـ container (MenetorTasksContent).
 */
export const TasksTable = ({
  tasks,
  loading = false,
  error = null,
  currentPage,
  totalPages,
  onPageChange,
}: TasksTableProps) => {
  const t = useTranslations("MentorTasks.table");
  const locale = useLocale();

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead className="text-start py-4 text-gray-500 font-medium">
                {t("task")}
              </TableHead>
              <TableHead className="text-start py-4 text-gray-500 font-medium">
                {t("related_lesson")}
              </TableHead>
              <TableHead className="text-start py-4 text-gray-500 font-medium">
                {t("due_date")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Loading state */}
            {loading && (
              <TableRow>
                <TableCell colSpan={3} className="py-12 text-center">
                  <div className="flex items-center justify-center gap-2 text-brand-muted">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="text-sm">{t("loading", { defaultValue: "جاري التحميل..." })}</span>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {/* Error state */}
            {!loading && error && (
              <TableRow>
                <TableCell colSpan={3} className="py-12 text-center">
                  <p className="text-sm text-red-500">{error}</p>
                </TableCell>
              </TableRow>
            )}

            {/* Empty state */}
            {!loading && !error && tasks.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="py-12 text-center">
                  <div className="flex flex-col items-center gap-2 text-brand-muted">
                    <Inbox className="w-8 h-8" />
                    <span className="text-sm">
                      {t("empty", { defaultValue: "لا توجد مهام بعد" })}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {/* Data rows */}
            {!loading &&
              !error &&
              tasks.map((task, index) => (
                <TableRow
                  key={`${task.title}-${index}`}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <TableCell className="py-4 font-medium text-gray-900">
                    {task.title}
                  </TableCell>
                  <TableCell className="py-4 text-gray-600">
                    {task.video_title}
                  </TableCell>
                  <TableCell className="py-4 text-gray-600">
                    {formatDeadline(task.dead_line, locale)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="border-t border-gray-100 bg-white">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            locale={locale}
          />
        </div>
      )}
    </div>
  );
};
