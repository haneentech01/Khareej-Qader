"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Mail, ChevronLeft, ChevronRight } from "lucide-react";
import { StudentProfileData } from "@/types";

interface StudentProfileHeaderProps {
  student: StudentProfileData;
}

export function StudentProfileHeader({ student }: StudentProfileHeaderProps) {
  const t = useTranslations("MentorStudentProfile");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const Chevron = isRtl ? ChevronLeft : ChevronRight;

  return (
    <div className="space-y-5">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs md:text-sm font-semibold text-slate-400 flex-row-reverse justify-end rtl:flex-row rtl:justify-start">
        <Link href="/mentor" className="hover:text-brand-primary transition-colors">
          {t("breadcrumbs.home")}
        </Link>
        <Chevron className="size-3.5 shrink-0 text-slate-300" />
        <Link href="/mentor/students" className="hover:text-brand-primary transition-colors">
          {t("breadcrumbs.students")}
        </Link>
        <Chevron className="size-3.5 shrink-0 text-slate-300" />
        <span className="text-slate-700 font-bold">{student.fullName}</span>
      </nav>

      {/* Profile Hero Card */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] px-6 py-5 flex flex-col md:flex-row items-center md:items-start gap-5 md:justify-between">
        {/* Send Note button (Left in RTL)
        <div className="order-3 md:order-1 w-full md:w-auto flex md:items-start md:pt-1">
          <button className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/90 active:bg-brand-primary text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all shadow-md shadow-brand-primary/20 cursor-pointer">
            <Mail className="size-4 shrink-0" />
            <span>{t("send_note")}</span>
          </button>
        </div> */}

        {/* Name & University (Center) */}
        <div className="order-2 flex flex-col items-center md:items-start text-center md:text-start gap-1 flex-1">
          <h1 className="text-2xl md:text-3xl font-extrabold text-black tracking-tight">
            {student.fullName}
          </h1>
          <p className="text-slate-400 font-semibold text-sm md:text-base">
            {student.major}
            <span className="mx-2 text-slate-200">—</span>
            {student.university}
          </p>
        </div>

        {/* Avatar (Right in RTL) */}
        <div className="order-1 shrink-0">
          <div className="relative size-20 md:size-24 rounded-2xl overflow-hidden border-4 border-white shadow-lg ring-1 ring-slate-100">
            <Image
              src={student.avatar}
              alt={student.fullName}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
