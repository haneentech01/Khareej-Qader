"use client";

import { useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Building, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { MentorDashboardLastSubmission } from "@/types";

const MAX_VISIBLE_SUBMISSIONS = 5;


interface LatestSubmissionsProps {
  submissions: MentorDashboardLastSubmission[];
  loading?: boolean;
}

interface Submission {
  id: string;
  studentName: string;
  studentAvatar: string | null;
  task: string;
  submittedAt: string;
}

function getInitial(name: string | null | undefined): string {
  if (!name) return "";
  const chars = Array.from(name.trim());
  const first = chars.find((c) => c.trim().length > 0);
  return first ? first.toUpperCase() : "";
}

function formatRelativeTime(sqlDate: string, locale: string): string {
  if (!sqlDate) return "—";

  const normalized = sqlDate.includes("T") ? sqlDate : sqlDate.replace(" ", "T");
  const isoStr = normalized.endsWith("Z") ? normalized : `${normalized}Z`;
  const date = new Date(isoStr);

  if (Number.isNaN(date.getTime())) return sqlDate;

  const now = new Date();
  const diffSec = Math.round((now.getTime() - date.getTime()) / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);
  const isAr = locale === "ar";

  if (diffSec < 60) return isAr ? "الآن" : "Just now";
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

function mapSubmission(
  item: MentorDashboardLastSubmission,
  index: number,
  locale: string,
): Submission {
  return {
    id: `dash-${index}-${item.student_name}-${item.submitted_at}`,
    studentName: item.student_name || "—",
    studentAvatar: null,
    task: item.task_title || "—",
    submittedAt: formatRelativeTime(item.submitted_at, locale),
  };
}

// ─── Main Component ──────────────────────────────────────────────────────────
export function LatestSubmissions({
  submissions,
  loading = false,
}: LatestSubmissionsProps) {
  const t = useTranslations("MentorDashboard.submissions_table");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const mappedSubmissions: Submission[] = useMemo(() => {
    return submissions.slice(0, MAX_VISIBLE_SUBMISSIONS).map((item, index) =>
      mapSubmission(item, index, locale),
    );
  }, [submissions, locale]);

  const columns: ColumnDef<Submission>[] = useMemo(
    () => [
      {
        id: "student",
        header: t("student"),
        cell: ({ row }) => {
          const { studentName, studentAvatar } = row.original;
          return (
            <div className="flex items-center gap-3">
              <Avatar className="size-8 border border-gray-100 shrink-0">
                {studentAvatar && (
                  <AvatarImage src={studentAvatar} alt={studentName} />
                )}
                <AvatarFallback className="bg-brand-light-green text-brand-primary text-xs font-bold">
                  {getInitial(studentName)}
                </AvatarFallback>
              </Avatar>
              <span className="font-semibold text-black text-xs md:text-sm">
                {studentName}
              </span>
            </div>
          );
        },
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
        accessorKey: "submittedAt",
        header: t("time"),
        cell: ({ getValue }) => (
          <span className="text-brand-muted text-xs md:text-sm">
            {getValue<string>()}
          </span>
        ),
      },
    ],
    [t]
  );

  const table = useReactTable({
    data: mappedSubmissions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
      <div className="w-full">
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
                        header.getContext(),
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <TableRow key={`skeleton-${i}`} className="hover:bg-transparent">
                  {columns.map((_, j) => (
                    <TableCell key={j} className="py-4 px-4">
                      <div className="h-4 bg-slate-100 animate-pulse rounded-md w-3/4 mx-auto" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
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
                        cell.getContext(),
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
                  {t("no_submissions")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
