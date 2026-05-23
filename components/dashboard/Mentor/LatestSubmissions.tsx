"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { ClipboardCheck, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";

export function LatestSubmissions() {
  const t = useTranslations("MentorDashboard.submissions_table");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const submissions = [
    {
      id: "1",
      studentName: "محمد خالد",
      studentAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
      task: "مهمة React (الجزء 2)",
      time: isRtl ? "قبل ساعة" : "An hour ago",
      status: "evaluated",
    },
    {
      id: "2",
      studentName: "آية أحمد",
      studentAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      task: "تصميم Landing Page",
      time: isRtl ? "أمس 10:30 م" : "Yesterday 10:30 PM",
      status: "pending",
    },
    {
      id: "3",
      studentName: "سارة محمود",
      studentAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      task: "ربط API بالمشروع",
      time: isRtl ? "أمس 08:15 ص" : "Yesterday 08:15 AM",
      status: "evaluated",
    },
  ];

  return (
    <div className="bg-white rounded-[20px] p-6 md:p-8 border border-sidebar-border shadow-sm flex flex-col gap-6 w-full overflow-hidden">
      {/* Title Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ClipboardCheck className="size-5 text-brand-base" />
          <h4 className="font-bold text-black text-lg">
            {t("title")}
          </h4>
        </div>
        <Link
          href="/mentor/submissions"
          className="text-brand-muted hover:text-black text-xs md:text-sm font-bold flex items-center gap-1 transition-colors"
        >
          {t("view_all")}
          {isRtl ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}
        </Link>
      </div>

      {/* Table Shell */}
      <div className="overflow-x-auto w-full -mx-6 md:-mx-8 px-6 md:px-8">
        <table className="w-full text-right rtl:text-right ltr:text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 pb-3 text-brand-muted/70 text-xs md:text-sm font-bold uppercase tracking-wider">
              <th className="py-3 px-4 first:pr-0 last:pl-0 font-extrabold">{t("student")}</th>
              <th className="py-3 px-4 font-extrabold">{t("task")}</th>
              <th className="py-3 px-4 font-extrabold">{t("time")}</th>
              <th className="py-3 px-4 font-extrabold">{t("status")}</th>
              <th className="py-3 px-4 first:pr-0 last:pl-0 text-center font-extrabold">{t("action")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {submissions.map((sub) => (
              <tr key={sub.id} className="group hover:bg-slate-50/50 transition-colors">
                {/* Student Avatar + Name */}
                <td className="py-4 px-4 first:pr-0 last:pl-0">
                  <div className="flex items-center gap-3">
                    <div className="relative size-10 rounded-full overflow-hidden border border-gray-100 shrink-0">
                      <Image
                        src={sub.studentAvatar}
                        alt={sub.studentName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="font-extrabold text-black text-sm md:text-base whitespace-nowrap">
                      {sub.studentName}
                    </span>
                  </div>
                </td>

                {/* Task Name */}
                <td className="py-4 px-4 text-brand-muted text-sm md:text-base whitespace-nowrap font-medium">
                  {sub.task}
                </td>

                {/* Submission Time */}
                <td className="py-4 px-4 text-brand-muted/80 text-xs md:text-sm whitespace-nowrap font-medium">
                  {sub.time}
                </td>

                {/* Status Badge */}
                <td className="py-4 px-4 whitespace-nowrap">
                  {sub.status === "evaluated" ? (
                    <span className="bg-[#E8FDF2] text-brand-base text-xs font-bold px-3 py-1 rounded-full inline-flex items-center gap-1.5 border border-[#A7F3D0]/30">
                      <span className="size-1.5 rounded-full bg-brand-base"></span>
                      {t("status_evaluated")}
                    </span>
                  ) : (
                    <span className="bg-[#FEF3C7] text-[#D97706] text-xs font-bold px-3 py-1 rounded-full inline-flex items-center gap-1.5 border border-[#FEF08A]/30">
                      <span className="size-1.5 rounded-full bg-[#D97706] animate-pulse"></span>
                      {t("status_pending")}
                    </span>
                  )}
                </td>

                {/* Action Link */}
                <td className="py-4 px-4 first:pr-0 last:pl-0 text-center whitespace-nowrap">
                  <Link
                    href={`/mentor/submissions/${sub.id}`}
                    className="border border-[#A7F3D0] text-[#22b48d] hover:bg-[#E8FDF2] active:bg-[#d1fae5] rounded-xl px-3 py-1.5 font-bold text-xs md:text-sm inline-flex items-center gap-1 transition-all shadow-xs"
                  >
                    {t("review_btn")}
                    {isRtl ? <ChevronLeft className="size-3.5" /> : <ChevronRight className="size-3.5" />}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
