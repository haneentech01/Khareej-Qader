import React from "react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { FileCheck2, ChevronLeft, ChevronRight } from "lucide-react";
import { SubmissionHeader } from "@/components/dashboard/Mentor/Submissions/SubmissionHeader";
import { TaskInfoCard } from "@/components/dashboard/Mentor/Submissions/TaskInfoCard";
import { FilesCard } from "@/components/dashboard/Mentor/Submissions/FilesCard";
import { SubmissionReviewPageProps } from "@/types";
import { EvaluationForm } from "@/components/dashboard/Mentor/Submissions/Evaluation/EvaluationForm";

export default async function SubmissionReviewPage({ params }: SubmissionReviewPageProps) {
  const { locale } = await params;
  const t = await getTranslations("MentorSubmissions");
  const isRtl = locale === "ar";

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 px-4 md:px-0">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-brand-muted text-xs md:text-sm">
          <Link href="/mentor" className="hover:text-black transition-colors">
            {t("breadcrumbs.home")}
          </Link>
          {isRtl ? <ChevronLeft className="size-4 shrink-0" /> : <ChevronRight className="size-4 shrink-0" />}
          <Link href="/mentor/tasks" className="hover:text-black transition-colors">
            {t("breadcrumbs.tasks")}
          </Link>
          {isRtl ? <ChevronLeft className="size-4 shrink-0" /> : <ChevronRight className="size-4 shrink-0" />}
          <span className="text-brand-primary">
            {t("breadcrumbs.review")}
          </span>
        </div>
      </div>

      {/* Main Title Banner with Green Document Icon */}
      <div className="flex justify-start items-center gap-5 mt-9">
        {/* Dynamic Green Document Check Icon */}
        <div className="size-16 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-2xs">
          <FileCheck2 className="size-8 text-brand-primary" />
        </div>
        <div className="space-y-1.5 text-right rtl:text-right ltr:text-left">

          <h1 className="text-2xl md:text-3xl font-bold text-black">
            {t("header.title")}
          </h1>
          <p className="text-brand-muted text-sm md:text-base">
            {t("header.subtext")}
          </p>
        </div>
      </div>

      {/* Student Profile & Submission Info Header Card */}
      <SubmissionHeader />

      {/* Grid of Task Details & Uploaded Files */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Task Details Info Card (Takes 2/3 width) */}
        <div className="lg:col-span-7 flex">
          <TaskInfoCard />
        </div>

        {/* Uploaded Files Card (Takes 1/3 width) */}
        <div className="lg:col-span-5 flex">
          <FilesCard />
        </div>
      </div>

      {/* Comments & Star Evaluation Feedbacks Form (Full Width) */}
      <EvaluationForm />
    </div>
  );
}
