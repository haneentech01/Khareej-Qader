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

  // const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  // const menuRef = useRef<HTMLDivElement>(null);

  // Close actions menu on click outside
  // useEffect(() => {
  //   function handleClickOutside(event: MouseEvent) {
  //     if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
  //       setActiveMenuId(null);
  //     }
  //   }
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  const formatDate = (dateStr: string, localeCode: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(localeCode === "ar" ? "ar-EG" : "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // const getStatusConfig = (status: MentorLesson["status"]) => {
  //   switch (status) {
  //     case "published":
  //       return {
  //         bg: "bg-emerald-50 text-emerald-600 border border-emerald-100",
  //         dot: "bg-emerald-500",
  //         label: t("filters.published"),
  //         circleBg: "bg-emerald-500 text-white",
  //       };
  //     case "draft":
  //       return {
  //         bg: "bg-amber-50 text-amber-600 border border-amber-100",
  //         dot: "bg-amber-500",
  //         label: t("filters.draft"),
  //         circleBg: "bg-teal-500 text-white",
  //       };
  //     case "hidden":
  //       return {
  //         bg: "bg-slate-50 text-slate-500 border border-slate-150",
  //         dot: "bg-slate-400",
  //         label: t("filters.hidden"),
  //         circleBg: "bg-slate-400 text-white",
  //       };
  //   }
  // };

  const columns = React.useMemo<ColumnDef<MentorLesson>[]>(
    () => [
      {
        accessorKey: "title",
      },
      // {
      //   accessorKey: "status",
      // },
      // {
      //   accessorKey: "averageProgress",
      // },
      {
        accessorKey: "dateAdded",
      },
      // {
      //   id: "actions",
      // },
    ],
    []
  );

  const table = useReactTable({
    data: lessons,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // manualPagination: true,
    // manualFiltering: true,
    // manualSorting: true,
  });

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.01)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-right rtl:text-right ltr:text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 text-xs md:text-sm font-semibold">
              <th className="px-6 py-5 text-start font-bold">{t("table.lesson")}</th>
              {/* <th className="px-6 py-5 text-center font-bold">{t("table.status")}</th> */}
              {/* <th className="px-6 py-5 text-center font-bold w-48">{t("table.average_progress")}</th> */}
              <th className="px-6 py-5 text-center font-bold">{t("table.date_added")}</th>
              {/* <th className="px-6 py-5 text-center font-bold w-20">{t("table.actions")}</th> */}
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
                // const config = getStatusConfig(lesson.status);
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

                    {/* Status Pill Badge */}
                    {/* <td className="px-6 py-4.5 text-center whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold leading-none select-none ${config.bg}`}
                      >
                        <span className={`size-1.5 rounded-full ${config.dot}`} />
                        {config.label}
                      </span>
                    </td> */}

                    {/* Average Progress Bar */}
                    {/* <td className="px-6 py-4.5 w-48">
                      <div className="flex flex-col items-center space-y-1.5">
                        <span className="text-[11px] md:text-xs font-bold text-slate-500 self-start rtl:self-end pr-1.5">
                          {lesson.averageProgress}%
                        </span>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-brand-primary rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${lesson.averageProgress}%` }}
                          />
                        </div>
                      </div>
                    </td> */}

                    {/* Date Added */}
                    <td className="px-6 py-4.5 text-center text-xs md:text-sm font-semibold text-slate-500 whitespace-nowrap">
                      {formatDate(lesson.dateAdded, locale)}
                    </td>

                    {/* Actions Menu*/}
                    {/* <td className="px-6 py-4.5 text-center relative whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenuId(activeMenuId === lesson.id ? null : lesson.id);
                        }}
                        className="size-8 rounded-lg flex items-center justify-center hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors mx-auto cursor-pointer"
                      >
                        <MoreHorizontal className="size-5" />
                      </button>

                      {/* Dropdown Menu 
                      {activeMenuId === lesson.id && (
                        <div
                          ref={menuRef}
                          className={`absolute z-30 mt-1 w-40 bg-white border border-slate-150 rounded-2xl shadow-xl p-1.5 animate-in fade-in slide-in-from-top-2 duration-200 ${isRtl ? "left-4" : "right-4"
                            }`}
                        >
                          <Link
                            href={`/mentor/track/${lesson.id}`}
                            onClick={() => setActiveMenuId(null)}
                            className="flex items-center gap-2.5 w-full px-3 py-2 text-right rtl:text-right ltr:text-left text-xs md:text-sm rounded-lg hover:bg-slate-50 font-semibold text-slate-700 hover:text-black transition-colors"
                          >
                            <Edit3 className="size-4 text-slate-400" />
                            <span>{isRtl ? "تعديل الدرس" : "Edit Lesson"}</span>
                          </Link>
                          <button
                            onClick={() => setActiveMenuId(null)}
                            className="flex items-center gap-2.5 w-full px-3 py-2 text-right rtl:text-right ltr:text-left text-xs md:text-sm rounded-lg hover:bg-slate-50 font-semibold text-slate-700 hover:text-black transition-colors"
                          >
                            {lesson.status === "hidden" ? (
                              <>
                                <Eye className="size-4 text-slate-400" />
                                <span>{isRtl ? "إظهار الدرس" : "Show Lesson"}</span>
                              </>
                            ) : (
                              <>
                                <EyeOff className="size-4 text-slate-400" />
                                <span>{isRtl ? "إخفاء الدرس" : "Hide Lesson"}</span>
                              </>
                            )}
                          </button>
                          <div className="h-px bg-slate-100 my-1" />
                          <button
                            onClick={() => setActiveMenuId(null)}
                            className="flex items-center gap-2.5 w-full px-3 py-2 text-right rtl:text-right ltr:text-left text-xs md:text-sm rounded-lg hover:bg-red-50 font-semibold text-red-500 transition-colors"
                          >
                            <Trash2 className="size-4 text-red-400" />
                            <span>{isRtl ? "حذف الدرس" : "Delete"}</span>
                          </button>
                        </div>
                      )}
                    </td> 
                    */}
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
