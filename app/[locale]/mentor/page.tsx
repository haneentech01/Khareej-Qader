
import { LateStudents } from "@/components/mentor/LateStudents";
import { LatestActivities } from "@/components/mentor/LatestActivities";

import { Code2 } from "lucide-react";
import { MentorWelcomeHeader } from "@/components/mentor/Layout/MentorWelcomeHeader";
import { getTranslations } from "next-intl/server";
import { MentorStats } from "@/components/mentor/MentorStats";
import { LatestSubmissions } from "@/components/mentor/LatestSubmissions";
import { QuickActions } from "@/components/mentor/QuickActions";
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
  const { locale } = await params;
  const t = await getTranslations("MentorDashboard");

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-8 px-4 md:px-0">
      {/* Welcome Greeting Row */}
      <MentorWelcomeHeader />

      {/* Grid of Statistics */}
      <MentorStats />

      {/* Middle Section: Latest Submissions & Late Students */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 flex">
          <LatestSubmissions />
        </div>

        <div className="lg:col-span-4 flex">
          <QuickActions />
        </div>

        {/* <div className="lg:col-span-4 flex">
          <LateStudents />
        </div> */}
      </div>

      {/* Bottom Section: Activities & Quick Actions */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
         <div className="lg:col-span-8 flex">
          <LatestActivities />
        </div> 
      </div>*/}
    </div>
  );
}
