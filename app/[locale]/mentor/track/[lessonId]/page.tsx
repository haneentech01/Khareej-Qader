import React from "react";
import { getTranslations } from "next-intl/server";
import { LessonEditPageMentor } from "@/components/Mentor/Track/LessonEditPageMentor";

interface MentorLessonEditPageProps {
  params: Promise<{
    locale: string;
    lessonId: string;
  }>;
}

export async function generateMetadata({
  params,
}: MentorLessonEditPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "MentorLessonEdit.breadcrumbs" });
  const tMeta = await getTranslations({ locale, namespace: "Dashboard.metadata" });
  return {
    title: `${t("edit_lesson")} - ${tMeta("title")}`,
  };
}

export default async function MentorLessonEditPage({
  params,
}: MentorLessonEditPageProps) {
  const { lessonId } = await params;
  return <LessonEditPageMentor lessonId={lessonId} />;
}
