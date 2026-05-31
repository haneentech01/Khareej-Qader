import React from "react";
import { getTranslations } from "next-intl/server";
import { MentorStats } from "@/components/dashboard/Mentor/MentorStats";
import { LatestSubmissions } from "@/components/dashboard/Mentor/LatestSubmissions";
import { LateStudents } from "@/components/dashboard/Mentor/LateStudents";
import { LatestActivities } from "@/components/dashboard/Mentor/LatestActivities";
import { QuickActions } from "@/components/dashboard/Mentor/QuickActions";
import { Code2 } from "lucide-react";

interface MentorDashboardPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function MentorDashboardPage({ params }: MentorDashboardPageProps) {
  const { locale } = await params;
  const t = await getTranslations("MentorDashboard");

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12 px-4 md:px-0">
      {/* Welcome Greeting Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 p-6">
        <div className="space-y-1.5 text-right rtl:text-right ltr:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-black">
            {t("header.welcome", { name: locale === "ar" ? "أحمد" : "Ahmed" })}
          </h1>
          <p className="text-brand-muted text-sm md:text-base">
            {t("header.subtitle")}
          </p>
        </div>

        {/* Educational Track Info Box */}
        <div className="flex items-center gap-3 bg-white border border-sidebar-border p-3.5 rounded-2xl shrink-0 w-full sm:w-auto justify-end sm:justify-start">
          <div className="space-y-1 text-right rtl:text-right ltr:text-left">
            <span className="text-brand-primary text-xs block leading-none">
              {t("header.track_label")}
            </span>
            <span className="text-black font-bold text-sm md:text-base block">
              {t("header.track_name")}
            </span>
          </div>
          <div className="size-12 rounded-2xl bg-brand-light-green flex items-center justify-center shrink-0">
            <Code2 className="size-6 text-brand-primary" />
          </div>
        </div>
      </div>

      {/* Grid of Statistics */}
      <MentorStats />

      {/* Middle Section: Latest Submissions & Late Students */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 flex">
          <LatestSubmissions />
        </div>
        <div className="lg:col-span-4 flex">
          <LateStudents />
        </div>
      </div>

      {/* Bottom Section: Activities & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 flex">
          <LatestActivities />
        </div>
        <div className="lg:col-span-5 flex">
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
