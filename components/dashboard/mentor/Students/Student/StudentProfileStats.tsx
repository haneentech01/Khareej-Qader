"use client";

import { useTranslations } from "next-intl";
import { CheckCircle2, XCircle } from "lucide-react";
import { MentorStudentDetails } from "@/types";

interface StudentProfileStatsProps {
  student: MentorStudentDetails;
}

export function StudentProfileStats({ student }: StudentProfileStatsProps) {
  const t = useTranslations("MentorStudents");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-white rounded-2xl px-5 py-8 shadow-sm flex items-center gap-4">
        <div className="size-14 rounded-2xl bg-brand-light flex items-center justify-center shrink-0">
          <CheckCircle2 className="size-8 text-brand-primary" />
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="text-sm font-bold text-slate-500">
            {t("stats.answered_tasks")}
          </p>
          <p className="text-3xl font-extrabold text-black text-center">
            {student.answered_tasks}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4">
        <div className="size-14 rounded-2xl bg-red-bg flex items-center justify-center shrink-0">
          <XCircle className="size-8 text-light-red" />
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="text-sm font-bold text-slate-500">
            {t("stats.unanswered_tasks")}
          </p>
          <p className="text-3xl font-extrabold text-black text-center">
            {student.unanswered_tasks}
          </p>
        </div>
      </div>
    </div>
  );
}
