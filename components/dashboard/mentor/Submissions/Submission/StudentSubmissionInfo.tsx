"use client";

import { useTranslations } from "next-intl";
import type { SubmissionDetail } from "@/types";
import { ProfileAvatar } from "@/components/dashboard/profile";

interface StudentSubmissionInfoProps {
  submission: SubmissionDetail | null;
}

export function StudentSubmissionInfo({ submission }: StudentSubmissionInfoProps) {
  const t = useTranslations("MentorSubmissions");

  if (!submission) return null;

  const student = submission.student;

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8">
      {/* Student Header */}
      <div className="flex items-center gap-4">
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
    </div>
  );
}
