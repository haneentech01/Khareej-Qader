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

// ─── Types ───────────────────────────────────────────────────────────────────

interface Submission {
  id: string;
  studentName: string;
  studentAvatar: string;
  task: string;
  time: string;
  status: "evaluated" | "pending";
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatusBadge({
  status,
  evaluated,
  pending,
}: {
  status: "evaluated" | "pending";
  evaluated: string;
  pending: string;
}) {
  if (status === "evaluated") {
    return (
      <span className="bg-brand-light text-brand-base text-xs font-bold px-3 py-1 rounded-lg inline-flex items-center gap-1.5">
        <span className="size-1.5 rounded-full bg-brand-base" />
        {evaluated}
      </span>
    );
  }
  return (
    <span className="bg-brand-light-orange text-brand-orange text-xs font-bold px-3 py-1 rounded-lg inline-flex items-center gap-1.5">
      <span className="size-1.5 rounded-full bg-brand-orange animate-pulse" />
      {pending}
    </span>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function LatestSubmissions() {
  const t = useTranslations("MentorDashboard.submissions_table");
  const locale = useLocale();
  const isRtl = locale === "ar";

  // ── Data ──────────────────────────────────────────────────────────────────
  const submissions: Submission[] = useMemo(
    () => [
      {
        id: "1",
        studentName: "محمد خالد",
        studentAvatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
        task: "مهمة React (الجزء 2)",
        time: isRtl ? "قبل ساعة" : "An hour ago",
        status: "evaluated",
      },
      {
        id: "2",
        studentName: "آية أحمد",
        studentAvatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
        task: "تصميم Landing Page",
        time: isRtl ? "أمس 10:30 م" : "Yesterday 10:30 PM",
        status: "pending",
      },
      {
        id: "3",
        studentName: "سارة محمود",
        studentAvatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
        task: "ربط API بالمشروع",
        time: isRtl ? "أمس 08:15 ص" : "Yesterday 08:15 AM",
        status: "evaluated",
      },
    ],
    [isRtl]
  );

  // ── Column Definitions ────────────────────────────────────────────────────
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
      {
        accessorKey: "time",
        header: t("time"),
        cell: ({ getValue }) => (
          <span className="text-brand-muted text-xs md:text-sm">
            {getValue<string>()}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: t("status"),
        cell: ({ getValue }) => (
          <StatusBadge
            status={getValue<Submission["status"]>()}
            evaluated={t("status_evaluated")}
            pending={t("status_pending")}
          />
        ),
      },
      {
        id: "action",
        header: () => (
          <span className="block text-center">{t("action")}</span>
        ),
        cell: ({ row }) => (
          <div className="flex justify-center">
            <Link
              href={`/mentor/submissions/${row.original.id}`}
              className="border border-brand-primary text-brand-primary hover:bg-brand-light active:bg-brand-light rounded-xl px-3 py-1.5 font-bold text-xs md:text-sm inline-flex items-center gap-1 transition-all shadow-xs"
            >
              {t("review_btn")}
              {isRtl ? (
                <ChevronLeft className="size-3.5" />
              ) : (
                <ChevronRight className="size-3.5" />
              )}
            </Link>
          </div>
        ),
      },
    ],
    [t, isRtl]
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
                    className="text-black text-xs md:text-sm font-extrabold uppercase tracking-wider py-3 px-4 rtl:text-right ltr:text-left"
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
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="py-4 px-4 rtl:text-right ltr:text-left"
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
                  لا توجد بيانات
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
