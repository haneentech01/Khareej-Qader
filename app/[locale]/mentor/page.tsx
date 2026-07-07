
import MentorDashboardContent from "@/components/dashboard/mentor/Home/MentorDashboardContent";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dashboard.metadata.mentor_dashboard.home" });
  return {
    title: t("title"),
    description: t("description"),
  };
}


interface MentorDashboardPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function MentorDashboardPage({ params }: MentorDashboardPageProps) {
  await params;


  return (
    <div>
      <MentorDashboardContent />
    </div>
  );
}
