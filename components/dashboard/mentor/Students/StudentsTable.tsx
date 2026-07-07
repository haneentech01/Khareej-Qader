"use client";

import { useTranslations, useLocale } from "next-intl";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination } from "@/components/ui/Pagination";
import { Loader2, Inbox, Eye } from "lucide-react";
import { MentorStudentListItem } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "@/i18n/routing";

interface StudentsTableProps {
  students: MentorStudentListItem[];
  loading?: boolean;
  error?: string | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function formatDate(isoDate: string | null, locale: string): string {
  if (!isoDate) return "—";
  try {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  } catch {
    return isoDate;
  }
}

export const StudentsTable = ({
  students,
  loading = false,
  error = null,
  currentPage,
  totalPages,
  onPageChange,
}: StudentsTableProps) => {
  const t = useTranslations("MentorStudents.table");
  const locale = useLocale();

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <div className="px-0">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow>
                <TableHead className="text-start py-4 text-gray-500 font-medium pl-6 pr-6">
                  {t("student")}
                </TableHead>
                <TableHead className="text-start py-4 text-gray-500 font-medium">
                  {t("email")}
                </TableHead>
                <TableHead className="text-start py-4 text-gray-500 font-medium">
                  {t("major")}
                </TableHead>
                <TableHead className="text-center py-4 text-gray-500 font-medium">
                  {t("status")}
                </TableHead>
                <TableHead className="text-center py-4 text-gray-500 font-medium">
                  {t("last_active")}
                </TableHead>
                <TableHead className="text-center py-4 text-gray-500 font-medium">
                  {t("actions")}
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {/* Loading state */}
              {loading && (
                <TableRow>
                  <TableCell colSpan={6} className="py-12 text-center">
                    <div className="flex items-center justify-center gap-2 text-brand-muted">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span className="text-sm">{t("loading", { defaultValue: "Loading..." })}</span>
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {/* Error state */}
              {!loading && error && (
                <TableRow>
                  <TableCell colSpan={6} className="py-12 text-center">
                    <p className="text-sm text-red-500">{error}</p>
                  </TableCell>
                </TableRow>
              )}

              {/* Empty state */}
              {!loading && !error && students.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="py-12 text-center">
                    <div className="flex flex-col items-center gap-2 text-brand-muted">
                      <Inbox className="w-8 h-8" />
                      <span className="text-sm">
                        {t("empty", { defaultValue: "No students found" })}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {/* Data rows */}
              {!loading &&
                !error &&
                students.map((student) => (
                  <TableRow
                    key={`student-${student.id}`}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <TableCell className="py-4 text-start font-medium text-gray-900 pl-6 pr-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={student.profile_image || ""} alt={student.full_name} />
                          <AvatarFallback className="bg-brand-light-green text-brand-dark-green font-bold">
                            {student.full_name?.charAt(0).toUpperCase() || "?"}
                          </AvatarFallback>
                        </Avatar>
                        <span>{student.full_name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-start text-gray-600">
                      {student.email}
                    </TableCell>
                    <TableCell className="py-4 text-start text-gray-600">
                      {student.university_major || "—"}
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          student.is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {student.is_active ? t("status_active") : t("status_inactive")}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 text-center text-gray-600">
                      {formatDate(student.last_active_at, locale)}
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <Link
                        href={`/mentor/students/${student.id}`}
                        className="inline-flex items-center justify-center text-brand-dark-green hover:text-brand-dark-green/80 transition-colors bg-brand-light-green hover:bg-[#A7F3D0]/50 p-2 rounded-lg"
                        title={t("view_profile")}
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
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
