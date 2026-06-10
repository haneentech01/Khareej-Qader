"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { User } from "lucide-react";
import { StudentProfileData } from "@/types";

interface StudentPersonalInfoProps {
  student: StudentProfileData;
}

export function StudentPersonalInfo({ student }: StudentPersonalInfoProps) {
  const t = useTranslations("MentorStudentProfile");

  const fields = [
    { label: t("personal_info.full_name"), value: student.fullName },
    { label: t("personal_info.email"), value: student.email },
    { label: t("personal_info.university"), value: student.university },
    { label: t("personal_info.major"), value: student.major },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.015)] p-6 h-full flex flex-col gap-5">
      {/* Card Title */}
      <div className="flex items-center gap-2.5">
        <div className="size-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
          <User className="size-4.5 text-slate-500" />
        </div>
        <h2 className="text-slate-800 font-extrabold text-base md:text-lg">
          {t("personal_info.title")}
        </h2>
      </div>

      {/* Fields */}
      <div className="flex flex-col divide-y divide-slate-50">
        {fields.map((field) => (
          <div
            key={field.label}
            className="flex items-center justify-between py-3.5 gap-4"
          >
            <span className="text-slate-800 font-bold text-sm truncate max-w-[55%] text-right rtl:text-right ltr:text-left">
              {field.value}
            </span>
            <span className="text-slate-400 font-semibold text-xs md:text-sm shrink-0">
              {field.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
