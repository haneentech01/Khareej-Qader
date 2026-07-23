"use client";

import { useTranslations, useLocale } from "next-intl";
import { BookOpen, Users } from "lucide-react";
import { useMentorStudentDetails } from "@/hooks/mentor/useMentorStudentDetails";
import { ProfilePageLayout } from "@/components/dashboard/profile";
import { StudentProfileHeader } from "./StudentProfileHeader";
import { StudentProfileStats } from "./StudentProfileStats";


interface MentorStudentDetailsContentProps {
  studentId: string;
}

/**
 * MentorStudentDetailsContent — صفحة تفاصيل طالب للمنتور.
 *
 * تعرض:
 *  - Header فيه صورة الطالب واسمه
 *  - Info Pills للجامعة والتخصص والهاتف
 *  - قائمة الكورسات
 *  - قائمة المنتورين
 *  - إحصائيات المهام (answered / unanswered)
 */
export function MentorStudentDetailsContent({
  studentId,
}: MentorStudentDetailsContentProps) {
  const t = useTranslations("MentorStudents");

  const { student, loading, error, refetch } = useMentorStudentDetails(studentId);

  const breadcrumbs = [
    { label: t("breadcrumbs.home"), href: "/mentor" },
    { label: t("breadcrumbs.students"), href: "/mentor/students" },
    { label: student?.full_name ?? t("breadcrumbs.details") },
  ];

  // ─── Loading & Error states handled by ProfilePageLayout ─────────────────
  return (
    <ProfilePageLayout
      loading={loading}
      error={error}
      onRetry={refetch}
      retryLabel={t("retry", { defaultValue: "إعادة المحاولة" })}
    >
      {student && (
        <div className="space-y-8">
          {/* ─── Hero Header ───────────────────────────────────────────────── */}
          <StudentProfileHeader
            student={student}
          />

          {/* ─── Stats Row ─────────────────────────────────────────────────── */}
          <StudentProfileStats student={student} />

          {/* ─── Courses & Mentors Grid ────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Courses */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
              <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
                <BookOpen className="size-5 text-brand-primary" />
                {t("sections.courses")}
              </h3>
              <div className="space-y-3">
                {student.courses.map((course) => (
                  <div
                    key={course.id}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    <p className="font-bold text-black">{course.name}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {course.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mentors */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
              <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
                <Users className="size-5 text-brand-primary" />
                {t("sections.mentors")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {student.mentor.map((mentorName, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-full bg-brand-light text-brand-base text-sm font-semibold"
                  >
                    {mentorName}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </ProfilePageLayout>
  );
}
