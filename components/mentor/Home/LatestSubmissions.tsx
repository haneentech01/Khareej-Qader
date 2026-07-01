
"use client";

import React, { useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Building, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMentorDashboard } from "@/hooks/mentor/useMentorDashboard";
import type { MentorDashboardLastSubmission } from "@/types";

// ─── Constants ───────────────────────────────────────────────────────────────

/** الحد الأقصى لعدد التسليمات المعروضة في الجدول (الباقي يظهر عبر "عرض الكل"). */
const MAX_VISIBLE_SUBMISSIONS = 5;

/** صورة افتراضية للطالب لأن الـ dashboard endpoint لا يُرجع صورة الطالب. */
const DEFAULT_STUDENT_AVATAR =
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Submission {
  id: string;
  studentName: string;
  studentAvatar: string;
  task: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * يحوّل عنصر التسليم القادم من /mentor/dashboard إلى الـ shape الذي يستهلكه
 * الجدول (Submission) — نأخذ فقط: student_name + task_title.
 * الصورة placeholder محايد لأن الـ dashboard endpoint لا يُرجعها.
 */
function mapDashboardSubmission(
  item: MentorDashboardLastSubmission,
  index: number,
): Submission {
  return {
    id: `dash-${index}-${item.student_name}-${item.submitted_at}`,
    studentName: item.student_name || "—",
    studentAvatar: DEFAULT_STUDENT_AVATAR,
    task: item.task_title || "—",
  };
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function LatestSubmissions() {
  const t = useTranslations("MentorDashboard.submissions_table");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const { dashboard, loading } = useMentorDashboard();

  // ── Data ──────────────────────────────────────────────────────────────────
  // نأخذ آخر MAX_VISIBLE_SUBMISSIONS تسليمات فقط — الباقي يصل له المستخدم
  // عبر زر "عرض الكل" الذي يوجّه لصفحة /mentor/submissions الكاملة.
  const submissions: Submission[] = useMemo(() => {
    const all = dashboard?.last_task_submissions_count ?? [];
    return all.slice(0, MAX_VISIBLE_SUBMISSIONS).map((item, index) =>
      mapDashboardSubmission(item, index),
    );
  }, [dashboard]);

  // ── Column Definitions ────────────────────────────────────────────────────
  // عمودان فقط: الطالب (صورة + اسم) + المهمة.
  // تم حذف عمود time و status بناءً على الطلب.
  const columns: ColumnDef<Submission>[] = useMemo(
    () => [
      {
        id: "student",
        header: t("student"),
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="relative size-8 rounded-full overflow-hidden border border-gray-100 shrink-0">
              <Image
                src={row.original.studentAvatar}
                alt={row.original.studentName}
                fill
                className="object-cover"
              />
            </div>
            <span className="font-semibold text-black text-xs md:text-sm">
              {row.original.studentName}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "task",
        header: t("task"),
        cell: ({ getValue }) => (
          <span className="text-brand-muted text-xs md:text-sm">
            {getValue<string>()}
          </span>
        ),
      },
    ],
    [t]
  );

  // ── Table Instance ────────────────────────────────────────────────────────
  const table = useReactTable({
    data: submissions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="bg-white rounded-3xl p-6 border border-sidebar-border shadow-sm flex flex-col gap-6 w-full overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Building className="size-5 text-brand-base" />
          <h4 className="font-bold text-black text-lg md:text-xl">
            {t("title")}
          </h4>
        </div>
        <Link
          href="/mentor/submissions"
          className="text-brand-muted hover:text-black text-xs md:text-sm flex items-center gap-1 transition-colors"
        >
          {t("view_all")}
          {isRtl ? (
            <ChevronLeft className="size-4" />
          ) : (
            <ChevronRight className="size-4" />
          )}
        </Link>
      </div>

      {/* Data Table */}
      <div className="w-full table-fixed">
        <Table dir={isRtl ? "rtl" : "ltr"}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-slate-100 hover:bg-transparent"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-black text-xs md:text-sm font-extrabold uppercase tracking-wider py-3 px-4 text-center"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {loading ? (
              // skeleton بسيط أثناء التحميل
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-10 text-brand-muted"
                >
                  <span className="inline-block size-5 border-2 border-brand-primary border-t-transparent rounded-full animate-spin align-middle ml-2" />
                  {isRtl ? "جاري التحميل..." : "Loading..."}
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="py-4 px-4 text-center"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-10 text-brand-muted"
                >
                  {isRtl ? "لا توجد بيانات" : "No data"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
