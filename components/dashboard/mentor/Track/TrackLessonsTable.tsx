"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpenText, Loader2, Inbox, Eye } from "lucide-react";
import type { TrackCourses } from "@/types";

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }
  return `${m}:${s.toString().padStart(2, "0")}`;
}

interface TrackLessonsTableProps {
  courses: TrackCourses[];
  loading: boolean;
  error: string | null;
}

export function TrackLessonsTable({ courses, loading, error }: TrackLessonsTableProps) {
  const t = useTranslations("MentorTrack");
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Table */}
      <div className="overflow-hidden">
        <Table dir={isRtl ? "rtl" : "ltr"}>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead className="py-4 text-gray-500 font-medium text-start px-6">
                {t("table.lesson_name")}
              </TableHead>
              <TableHead className="py-4 text-gray-500 font-medium text-center">
                {t("table.duration")}
              </TableHead>
              <TableHead className="py-4 text-gray-500 font-medium text-center">
                {t("table.date_added")}
              </TableHead>
              <TableHead className="py-4 text-gray-500 font-medium text-center">
                {t("table.action")}
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12">
                  <Loader2 className="w-6 h-6 text-brand-primary animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12 text-red-500">
                  {error}
                </TableCell>
              </TableRow>
            ) : courses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12">
                  <div className="flex flex-col items-center gap-2 text-brand-muted">
                    <Inbox className="w-8 h-8" />
                    <span className="text-sm">{t("empty", { defaultValue: "لا توجد دروس بعد" })}</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              courses.map((course) => (
                <TableRow key={course.id} className="hover:bg-gray-50/50 transition-colors">

                  <TableCell className="py-4 font-medium text-gray-900 flex items-center gap-2 text-center">
                    <BookOpenText className="size-4 text-brand-primary" />
                    {course.video_title}
                  </TableCell>

                  <TableCell className="py-4 text-gray-600 text-center">
                    {formatDuration(course.video_duration)}
                  </TableCell>

                  <TableCell className="py-4 text-gray-600 text-center">
                    {new Date(course.created_at).toLocaleDateString(isRtl ? "ar-EG" : "en-US")}
                  </TableCell>

                  <TableCell className="py-4 text-center">
                    <Link
                      href={`/mentor/track/${course.id}`}
                      className="text-brand-primary hover:underline text-sm font-bold inline-flex items-center gap-1"
                    >
                      <Eye className="size-4" />
                      {t("table.view")}
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}