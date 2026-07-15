"use client";

import React, { useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { AlertTriangle, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TaskSubmissionListItem } from "@/types";

// gets the first character of the name
function getInitial(name: string | null | undefined): string {
  if (!name) return "-";
  const chars = Array.from(name.trim());
  const first = chars.find((c) => c.trim().length > 0);
  return first ? first.toUpperCase() : "-";
}

//  formats the date to a relative time 
function formatRelativeTime(
  isoDate: string | null | undefined,
  locale: string,
): string {
  if (!isoDate) return "—";
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "—";

  const now = new Date();
  const diffMin = Math.round((now.getTime() - date.getTime()) / 60000);
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
    return isoDate;
  }
}

interface SubmissionsTableProps {
  submissions: TaskSubmissionListItem[];
  loading?: boolean;
}

export default function SubmissionsTable({
  submissions,
  loading,
}: SubmissionsTableProps) {
  "use no memo";
  const t = useTranslations("MentorSubmissionsList");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const Chevron = isRtl ? ChevronLeft : ChevronRight;

  const columns: ColumnDef<TaskSubmissionListItem>[] = useMemo(
    () => [
      // 1. student
      {
        id: "student",
        header: () => (
          <span className="font-extrabold">
            {t("table.student")}
          </span>
        ),
        cell: ({ row }) => {
          const { student } = row.original;
          return (
            <div className="flex items-center gap-3">
              <Avatar className="size-8 border border-slate-100 shrink-0">
                {student?.profile_image && (
                  <AvatarImage
                    src={student.profile_image}
                    alt={student?.full_name ?? "student"}
                  />
                )}
                <AvatarFallback className="bg-brand-light-green text-brand-primary text-xs font-bold">
                  {getInitial(student?.full_name)}
                </AvatarFallback>
              </Avatar>
              <span className="font-bold text-slate-800 text-xs md:text-sm">
                {student?.full_name ?? "—"}
              </span>
            </div>
          );
        },
      },

      // 2. task name
      {
        id: "task_name",
        header: () => (
          <span className="font-extrabold">{t("table.task")}</span>
        ),
        cell: ({ row }) => {
          const answer = row.original.task_name ?? row.original.task_id.toString();
          const preview =
            answer.length > 50 ? `${answer.slice(0, 50)}...` : answer;
          return (
            <span className="text-slate-800 text-xs md:text-sm line-clamp-1 max-w-[200px]">
              {preview || "—"}
            </span>
          );
        },
      },

      // 3. time
      {
        id: "time",
        header: () => (
          <span className="font-extrabold">{t("table.time")}</span>
        ),
        cell: ({ row }) => (
          <span className="font-bold text-slate-800 text-xs md:text-sm">
            {formatRelativeTime(row.original.created_at, locale)}
          </span>
        ),
      },

      // 4. evaluation
      {
        id: "evaluation",
        header: () => (
          <span className="font-extrabold">{t("table.evaluation")}</span>
        ),
        cell: ({ row }) => {
          const grade = row.original.grade;
          return grade !== null && grade !== undefined ? (
            <span className="font-bold text-brand-primary text-xs md:text-sm">
              {grade}/100
            </span>
          ) : (
            <span className="text-slate-300 font-medium">—</span>
          );
        },
      },

      // 5. action
      {
        id: "action",
        header: () => (
          <span className="block text-center font-extrabold">
            {t("table.action")}
          </span>
        ),
        cell: ({ row }) => (
          <div className="flex justify-center">
            <Link
              href={`/mentor/submissions/${row.original.id}`}
              className="border border-brand-primary/40 text-brand-primary hover:text-white hover:bg-brand-primary/90 active:bg-brand-primary rounded-xl px-4 py-1.5 font-bold text-xs md:text-sm inline-flex items-center gap-1.5 transition-all shadow-2xs hover:border-brand-primary cursor-pointer"
            >
              <Eye className="size-4" />
              <span>{t("table.review")}</span>
              <Chevron className="size-3.5" />
            </Link>
          </div>
        ),
      },
    ],
    [t, locale, Chevron]
  );

  const table = useReactTable({
    data: submissions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden">
      <Table dir={isRtl ? "rtl" : "ltr"} className="p-0">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-b border-slate-100 text-slate-800 text-xs md:text-sm 
              font-extrabold bg-slate-50/40 hover:bg-transparent"
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="py-5 text-center font-extrabold select-none"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody className="divide-y divide-slate-50">
          {loading ? (
            // ─── loading state ──────────────────────────────────────────────
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={`skeleton-${i}`} className="hover:bg-transparent">
                {columns.map((_, j) => (
                  <TableCell key={j} className="px-6 py-4.5">
                    <div className="h-4 bg-slate-100 animate-pulse rounded-md w-3/4" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : submissions.length === 0 ? (
            // ─── Empty state ──────────────────────────────────────────────
            <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={columns.length}
                className="text-center py-16"
              >
                <div className="flex flex-col items-center justify-center gap-2.5 text-slate-400">
                  <AlertTriangle className="size-10 text-slate-300 stroke-1.5" />
                  <span className="text-xs md:text-sm font-semibold">
                    {t("table.no_data")}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            // ─── Data rows ────────────────────────────────────────────────
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="group hover:bg-slate-50/40 transition-all duration-300"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="py-4.5 px-6 text-center align-middle"
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext(),
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
