"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Download, FileText } from "lucide-react";
import type { SubmissionDetail } from "@/types";
import { ProfileAvatar } from "@/components/dashboard/profile";

interface StudentSubmissionInfoProps {
    submission: SubmissionDetail | null;
}

/**
 * StudentSubmissionInfo — Presentational Component.
 *
 * مسؤولية واحدة (SRP): عرض بيانات الطالب + رابط تحميل الملف.
 * لا يعرف عن الـ API أو الـ form state.
 *
 * @example
 * <StudentSubmissionInfo submission={submission} />
 */
export function StudentSubmissionInfo({ submission }: StudentSubmissionInfoProps) {
    const t = useTranslations("MentorSubmissions");

    if (!submission) return null;

    const student = submission.student;
    const fileName = submission.file?.split("/").pop() ?? "file";

    return (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8">
            {/* Student Header */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                <ProfileAvatar
                    src={student?.profile_image ?? null}
                    name={student?.full_name ?? null}
                    size="lg"
                />
                <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-bold text-black truncate">
                        {student?.full_name ?? "—"}
                    </h2>
                    <p className="text-sm text-brand-muted truncate">
                        {student?.email ?? ""}
                    </p>
                </div>
            </div>

            {/* Submission File */}
            {/* {submission.file ? (
        <a
          href={submission.file}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-brand-primary hover:underline text-sm font-bold transition-colors"
        >
          <Download className="size-4" />
          {t("download_submission", { defaultValue: "تحميل ملف الطالب" })}
          <span className="text-brand-muted font-normal text-xs">
            ({fileName})
          </span>
        </a>
      ) : (
        <div className="flex items-center gap-2 text-brand-muted text-sm">
          <FileText className="size-4" />
          {t("no_file", { defaultValue: "لا يوجد ملف مرفوع" })}
        </div>
      )} */}
        </div>
    );
}
