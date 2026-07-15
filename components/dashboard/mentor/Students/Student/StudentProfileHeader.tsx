"use client";

import { useTranslations, useLocale } from "next-intl";
import { BookOpen, Phone, School } from "lucide-react";
import { MentorStudentDetails } from "@/types";
import { ProfileAvatar, ProfileInfoPill } from "@/components/dashboard/profile";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

interface StudentProfileHeaderProps {
  student: MentorStudentDetails;
}

export function StudentProfileHeader({ student }: StudentProfileHeaderProps) {
  const t = useTranslations("MentorStudentProfile");
  const locale = useLocale();

  const breadcrumbItems = [
    { label: t('breadcrumbs.home'), href: '/mentor' },
    { label: t('breadcrumbs.students'), href: '/mentor/students' },
    { label: student?.full_name ?? t("breadcrumbs.details") },
  ];

  return (
    <div className="space-y-5">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} locale={locale} />

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm  px-6 py-10 flex flex-col md:flex-row items-center gap-6">
        <ProfileAvatar
          src={student.profile_photo}
          name={student.full_name}
          size="xl"
        />
        <div className="flex flex-col text-center md:text-start gap-2.5">
          <h1 className="text-2xl md:text-3xl font-extrabold text-black tracking-tight">
            {student.full_name}
          </h1>

          <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
            <ProfileInfoPill className="gap-0" icon={School} text={student.university_name} />
            <ProfileInfoPill className="gap-0" icon={BookOpen} text={student.university_major} />
            <ProfileInfoPill className="gap-0" icon={Phone} text={student.mobile_number} />
          </div>
        </div>
      </div>
    </div>
  );
}
