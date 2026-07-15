import { MentorStudentDetailsContent } from "@/components/dashboard/mentor/Students/Student/MentorStudentDetailsContent";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getTranslations } from "next-intl/server";

interface MentorStudentDetailsPageProps {
  params: Promise<{
    locale: string;
    studentId: string;
  }>;
}

export async function generateMetadata({ params }: MentorStudentDetailsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "MentorStudents.metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}
export default async function StudentProfilePage({ params }: MentorStudentDetailsPageProps) {
  const { studentId } = await params;
  return (
    <div>
      <MentorStudentDetailsContent studentId={studentId} />;
    </div>

  )
}
