"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { AlertTriangle } from "lucide-react";
import { StudentSubmissionSummary } from "@/types";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface StudentSubmissionsTableProps {
  submissions: StudentSubmissionSummary[];
}


export function StudentSubmissionsTable({ submissions }: StudentSubmissionsTableProps) {
  "use no memo";
  const t = useTranslations("MentorStudentProfile");

  const columns: ColumnDef<StudentSubmissionSummary>[] = useMemo(
    () => [
      {
        id: "task",
        header: () => (
          <span className="font-extrabold">{t("recent_submissions.task")}</span>
        ),
        cell: ({ row }) => (
          <span className="font-bold text-slate-800 text-xs md:text-sm">
            {row.original.taskTitle}
          </span>
        ),
      },
      {
        id: "date",
        header: () => (
          <span className="font-extrabold">{t("recent_submissions.date")}</span>
        ),
        cell: ({ row }) =>
          row.original.submissionDate ? (
            <div className="space-y-0.5">
              <span className="font-bold text-slate-800 text-xs md:text-sm block">
                {row.original.submissionDate}
              </span>
              {row.original.submissionTime && (
                <span className="text-[11px] text-slate-400 font-semibold block">
                  {row.original.submissionTime}
                </span>
              )}
            </div>
          ) : (
            <span className="text-slate-300 font-medium">—</span>
          ),
      },
      {
        id: "evaluation",
        header: () => (
          <span className="font-extrabold">{t("recent_submissions.evaluation")}</span>
        ),
        cell: ({ row }) =>
          row.original.evaluation ? (
            <span className="font-bold text-brand-primary text-xs md:text-sm">
              {row.original.evaluation}
            </span>
          ) : (
            <span className="text-slate-300 font-medium">—</span>
          ),
      }
    ],
    [t]
  );

  const table = useReactTable({
    data: submissions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.015)] overflow-hidden flex flex-col">
      {/* Card Title */}
      <div className="px-6 py-5 border-b border-slate-50">
        <h2 className="text-slate-800 font-extrabold text-base md:text-lg">
          {t("recent_submissions.title")}
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-right rtl:text-right ltr:text-left border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-b border-slate-100 text-slate-500 text-xs font-bold bg-slate-50/40"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-5 py-4 text-start font-extrabold select-none"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-50">
            {submissions.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-14">
                  <div className="flex flex-col items-center justify-center gap-2.5 text-slate-400">
                    <AlertTriangle className="size-9 text-slate-200 stroke-1.5" />
                    <span className="text-sm font-semibold">
                      {t("recent_submissions.no_data")}
                    </span>
                  </div>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="group hover:bg-slate-50/40 transition-all duration-200"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-5 py-4 text-start align-middle"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
