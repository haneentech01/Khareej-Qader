import React from "react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { FileCheck2, ChevronLeft, ChevronRight } from "lucide-react";
import { SubmissionHeader } from "@/components/dashboard/Mentor/Submissions/SubmissionHeader";
import { TaskInfoCard } from "@/components/dashboard/Mentor/Submissions/TaskInfoCard";
import { FilesCard } from "@/components/dashboard/Mentor/Submissions/FilesCard";
import { EvaluationForm } from "@/components/dashboard/Mentor/Submissions/EvaluationForm";

interface SubmissionReviewPageProps {
  params: Promise<{
    locale: string;
    submissionId: string;
  }>;
}

export default async function SubmissionReviewPage({ params }: SubmissionReviewPageProps) {
  const { locale } = await params;
  const t = await getTranslations("MentorSubmissions");
  const isRtl = locale === "ar";

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 px-4 md:px-0">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-brand-muted/70 text-xs md:text-sm font-bold rtl:flex-row-reverse">
          <Link href="/mentor" className="hover:text-black transition-colors">
            {t("breadcrumbs.home")}
          </Link>
          {isRtl ? <ChevronLeft className="size-4 shrink-0" /> : <ChevronRight className="size-4 shrink-0" />}
          <Link href="/mentor/tasks" className="hover:text-black transition-colors">
            {t("breadcrumbs.tasks")}
          </Link>
          {isRtl ? <ChevronLeft className="size-4 shrink-0" /> : <ChevronRight className="size-4 shrink-0" />}
          <span className="text-[#22b48d] font-extrabold">
            {t("breadcrumbs.review")}
          </span>
        </div>
      </div>

      {/* Main Title Banner with Green Document Icon */}
      <div className="flex justify-between items-center bg-white rounded-[20px] p-6 border border-sidebar-border shadow-xs">
        <div className="space-y-1.5 text-right rtl:text-right ltr:text-left">
          <h1 className="text-2xl md:text-3xl font-extrabold text-black">
            {t("header.title")}
          </h1>
          <p className="text-brand-muted text-sm md:text-base font-bold">
            {t("header.subtext")}
          </p>
        </div>

        {/* Dynamic Green Document Check Icon */}
        <div className="size-12 rounded-2xl bg-[#E8FDF2] border border-[#A7F3D0]/60 flex items-center justify-center shrink-0 shadow-2xs">
          <FileCheck2 className="size-6 text-[#22b48d]" />
        </div>
      </div>

      {/* Student Profile & Submission Info Header Card */}
      <SubmissionHeader />

      {/* Grid of Task Details & Uploaded Files */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Task Details Info Card (Takes 2/3 width) */}
        <div className="lg:col-span-2 flex">
          <TaskInfoCard />
        </div>

        {/* Uploaded Files Card (Takes 1/3 width) */}
        <div className="lg:col-span-1 flex">
          <FilesCard />
        </div>
      </div>

      {/* Comments & Star Evaluation Feedbacks Form (Full Width) */}
      <EvaluationForm />
    </div>
  );
}
