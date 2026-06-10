import React from "react";
import { getTranslations } from "next-intl/server";
import { StudentProfilePageMentor } from "@/components/dashboard/Mentor/Students/StudentProfilePageMentor";

interface StudentProfilePageProps {
  params: Promise<{
    locale: string;
    studentId: string;
  }>;
}

export async function generateMetadata({
  params,
}: StudentProfilePageProps) {
  const { locale, studentId } = await params;
  const t = await getTranslations({ locale, namespace: "MentorStudentProfile" });
  const tMeta = await getTranslations({ locale, namespace: "Dashboard.metadata" });
  
  // Here we can fetch the name based on the id or display a dynamic localized title.
  // For mock-up simplicity, we'll prefix it.
  const studentName = studentId === "2" ? "سارة أحمد" : "محمد خالد";
  return {
    title: `${studentName} - ${tMeta("title")}`,
  };
}

export default async function StudentProfilePage({ params }: StudentProfilePageProps) {
  const { studentId } = await params;
  return <StudentProfilePageMentor studentId={studentId} />;
}
