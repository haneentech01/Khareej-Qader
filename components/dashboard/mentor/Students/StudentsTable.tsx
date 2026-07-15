"use client";

import { useTranslations, useLocale } from "next-intl";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination } from "@/components/ui/Pagination";
import { Loader2, Inbox, Eye } from "lucide-react";
import { MentorStudentListItem } from "@/types";

import { Link } from "@/i18n/routing";
import Image from "next/image";

interface StudentsTableProps {
  students: MentorStudentListItem[];
  loading?: boolean;
  error?: string | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
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
    <div className="overflow-hidden flex flex-col">
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
                  {t("courses")}
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
                students.map((student, index) => {
                  return (
                    <TableRow
                      key={index}
                      className="hover:bg-gray-50/50 transition-colors border-b border-gray-100 last:border-0"
                    >
                      <TableCell className="py-4 font-medium text-black">
                        <div className="flex items-center gap-3">
                          {student.profile_image && (student.profile_image || student.profile_image.startsWith("/")) ? (
                            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-gray-100">
                              <Image
                                src={student.profile_image}
                                alt={student.full_name || ""}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-[#E5F5FA] text-[#008985] flex items-center justify-center font-bold shrink-0 border border-[#E5F5FA]">
                              {student.full_name?.charAt(0).toUpperCase() || "?"}
                            </div>
                          )}
                          <span className="font-semibold text-gray-900 block">
                            {student.full_name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 text-gray-500 font-medium">
                        {student.email}
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                          {student.courses}
                        </span>
                      </TableCell>



                      <TableCell className="py-4 text-center">
                        <Link
                          href={`/mentor/students/${student.slug}`}
                          className="inline-flex items-center justify-center text-brand-dark-green hover:text-brand-dark-green/80 transition-colors bg-brand-light-green hover:bg-[#A7F3D0]/50 p-2 rounded-lg"
                          title={t("view_profile")}
                        >
                          <Eye className="w-5 h-5" />
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
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
