import React from "react";
import { getTranslations } from "next-intl/server";
import { MentorStats } from "@/components/dashboard/Mentor/MentorStats";
import { LatestSubmissions } from "@/components/dashboard/Mentor/LatestSubmissions";
import { LateStudents } from "@/components/dashboard/Mentor/LateStudents";
import { LatestActivities } from "@/components/dashboard/Mentor/LatestActivities";
import { QuickActions } from "@/components/dashboard/Mentor/QuickActions";

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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-white rounded-[20px] p-6 md:p-8 border border-sidebar-border shadow-xs">
        <div className="space-y-1.5 text-right rtl:text-right ltr:text-left">
          <h1 className="text-2xl md:text-3xl font-extrabold text-black">
            {t("header.welcome", { name: locale === "ar" ? "أحمد" : "Ahmed" })}
          </h1>
          <p className="text-brand-muted text-sm md:text-base font-bold">
            {t("header.subtitle")}
          </p>
        </div>

        {/* Educational Track Info Box */}
        <div className="flex items-center gap-3 bg-[#F6FBFA] border border-sidebar-border p-3.5 rounded-2xl shrink-0 w-full sm:w-auto justify-end sm:justify-start">
          <div className="space-y-1 text-right rtl:text-right ltr:text-left">
            <span className="text-brand-muted/70 text-xs font-semibold block leading-none">
              {t("header.track_label")}
            </span>
            <span className="text-black font-extrabold text-sm md:text-base block">
              {t("header.track_name")}
            </span>
          </div>
          <div className="size-11 rounded-2xl bg-white border border-gray-100 flex items-center justify-center shrink-0 shadow-xs">
            <span className="text-[#22b48d] font-bold text-lg">&lt;/&gt;</span>
          </div>
        </div>
      </div>

      {/* Grid of Statistics */}
      <MentorStats />

      {/* Middle Section: Latest Submissions & Late Students */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2 flex">
          <LatestSubmissions />
        </div>
        <div className="lg:col-span-1 flex">
          <LateStudents />
        </div>
      </div>

      {/* Bottom Section: Activities & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2 flex">
          <LatestActivities />
        </div>
        <div className="lg:col-span-1 flex">
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
