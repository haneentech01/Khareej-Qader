
import { LessonEditPageMentor } from "@/components/dashboard/mentor/Track/LessonEditPageMentor";
import { getTranslations } from "next-intl/server";

interface MentorLessonPageProps {
  params: Promise<{ locale: string; lessonId: string }>;
}

export async function generateMetadata({ params }: MentorLessonPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "MentorTrack.metadata" });
  return {
    title: t("lesson_title"),
    description: t("lesson_description"),
  };
}

export default async function MentorLessonPage({ params }: MentorLessonPageProps) {
  const { lessonId } = await params;
  return <LessonEditPageMentor lessonId={lessonId} />;
}