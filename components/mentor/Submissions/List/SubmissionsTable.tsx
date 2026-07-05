"use client";

import React, { useMemo } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  FileArchive,
  FileCode,
  AlertTriangle,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { SubmissionListItem, SubmissionFileType } from "@/types";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";


interface FileCellProps {
  fileType: SubmissionFileType;
  name?: string;
  size?: string;
}

export function FileCell({ fileType, name, size }: FileCellProps) {
  if (fileType === "none" || !name) {
    return <span className="text-slate-350">-</span>;
  }

  let Icon: React.ComponentType<{ className?: string }> = FileArchive;
  let iconColor = "text-amber-500 bg-amber-50";

  if (fileType === "github") {
    Icon = FaGithub;
    iconColor = "text-slate-800 bg-slate-100";
  } else if (fileType === "code") {
    Icon = FileCode;
    iconColor = "text-blue-500 bg-blue-50";
  }

  return (
    <div className="flex items-center gap-2.5 justify-start rtl:flex-row ltr:flex-row-reverse text-right rtl:text-right ltr:text-left">
      {/* Text information */}
      <div className="space-y-0.5">
        <span className="font-bold text-slate-800 text-xs md:text-sm block max-w-[160px] truncate" title={name}>
          {name}
        </span>
        <span className="text-[10px] md:text-xs text-slate-400 font-semibold block">
          {size}
        </span>
      </div>

      {/* Icon Circle */}
      <div className={`size-8 rounded-lg flex items-center justify-center shrink-0 ${iconColor}`}>
        <Icon className="size-4.5" />
      </div>
    </div>
  );
}

interface SubmissionsTableProps {
  submissions: SubmissionListItem[];
}

export function SubmissionsTable({ submissions }: SubmissionsTableProps) {
  const t = useTranslations("MentorSubmissionsList");

  // Define Columns
  const columns: ColumnDef<SubmissionListItem>[] = useMemo(
    () => [
      {
        id: "student",
        header: () => <span className="font-extrabold">{t("table.student")}</span>,
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="relative size-8 rounded-full overflow-hidden border border-slate-100 shrink-0">
              <Image
                src={row.original.studentAvatar}
                alt={row.original.studentName}
                fill
                className="object-cover"
              />
            </div>
            <span className="font-bold text-slate-800 text-xs md:text-sm">
              {row.original.studentName}
            </span>
          </div>
        ),
      },
      {
        id: "task",
        header: () => <span className="font-extrabold">{t("table.task")}</span>,
        cell: ({ row }) => (
          <div className="space-y-0.5 text-right rtl:text-right ltr:text-left">
            <span className="font-bold text-slate-800 text-xs md:text-sm block">
              {row.original.taskTitle}
            </span>
            <span className="text-[11px] md:text-xs text-slate-400 font-semibold block">
              {row.original.taskSubtitle}
            </span>
          </div>
        ),
      },

      {
        id: "time",
        header: () => <span className="font-extrabold">{t("table.time")}</span>,
        cell: ({ row }) => (
          <div className="space-y-0.5 text-right rtl:text-right ltr:text-left">
            <span
              className={`font-bold text-xs md:text-sm block ${row.original.timeIsRed ? "text-red-500" : "text-slate-800"
                }`}
            >
              {row.original.submissionTime}
            </span>
            <span className="text-[11px] md:text-xs text-slate-400 font-semibold block">
              {row.original.submissionDate}
            </span>
          </div>
        ),
      },

      {
        id: "evaluation",
        header: () => <span className="font-extrabold">{t("table.evaluation")}</span>,
        cell: ({ row }) =>
          row.original.evaluation ? (
            <span className="font-bold text-brand-primary text-xs md:text-sm">
              {row.original.evaluation}
            </span>
          ) : (
            <span className="text-slate-300 font-medium">-</span>
          ),
      },

    ],
    [t]
  );

  // Setup table instance
  const table = useReactTable({
    data: submissions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.01)] overflow-hidden w-full">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-right rtl:text-right ltr:text-left border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-b border-slate-100 text-slate-800 text-xs md:text-sm font-extrabold bg-slate-50/40"
              >
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-6 py-5 text-start font-extrabold select-none">
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
                <td colSpan={columns.length} className="text-center py-16">
                  <div className="flex flex-col items-center justify-center gap-2.5 text-slate-400">
                    <AlertTriangle className="size-10 text-slate-300 stroke-1.5" />
                    <span className="text-xs md:text-sm font-semibold">{t("table.no_data")}</span>
                  </div>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="group hover:bg-slate-50/40 transition-all duration-300"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4.5 text-start align-middle">
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
