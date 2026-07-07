"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { Clock } from "lucide-react";
import { MentorLesson } from "@/types";
import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";

interface TrackLessonsTableProps {
  lessons: MentorLesson[];
}

export function TrackLessonsTable({ lessons }: TrackLessonsTableProps) {
  const t = useTranslations("MentorTrack");
  const locale = useLocale();
  const isRtl = locale === "ar";



  const formatDate = (dateStr: string, localeCode: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(localeCode === "ar" ? "ar-EG" : "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };



  const columns = React.useMemo<ColumnDef<MentorLesson>[]>(
    () => [
      {
        accessorKey: "title",
      },
      {
        accessorKey: "dateAdded",
      },
    ],
    []
  );

  const table = useReactTable({
    data: lessons,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.01)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-right rtl:text-right ltr:text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 text-xs md:text-sm font-semibold">
              <th className="px-6 py-5 text-start font-bold">{t("table.lesson")}</th>
              <th className="px-6 py-5 text-center font-bold">{t("table.date_added")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {lessons.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-slate-400 text-sm font-medium">
                  {isRtl ? "لم يتم العثور على أي دروس تطابق الفلاتر المحددة." : "No lessons found matching the selected filters."}
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => {
                const lesson = row.original;
                return (
                  <tr
                    key={lesson.id}
                    className="group hover:bg-slate-50/50 transition-all duration-300"
                  >
                    {/* Lesson Title & Number */}
                    <td className="px-6 py-4.5">
                      <div className="flex items-center gap-4 text-start">
                        {/* Number circle */}
                        <div
                          className={`size-10 rounded-full flex items-center justify-center 
                            font-bold text-sm shrink-0 shadow-xs transition-transform duration-300 
                            group-hover:scale-105 bg-brand-primary text-white`}
                        >
                          {lesson.number}
                        </div>

                        {/* Title and duration */}
                        <div className="space-y-1">
                          <h3 className="text-sm md:text-base font-bold text-slate-800 tracking-tight group-hover:text-black transition-colors">
                            {lesson.title}
                          </h3>
                          <div className="flex items-center gap-1 text-slate-400 text-xs font-semibold">
                            <Clock className="size-3.5" />
                            <span>{lesson.duration}</span>
                          </div>
                        </div>
                      </div>
                    </td>



                    {/* Date Added */}
                    <td className="px-6 py-4.5 text-center text-xs md:text-sm font-semibold text-slate-500 whitespace-nowrap">
                      {formatDate(lesson.dateAdded, locale)}
                    </td>


                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
