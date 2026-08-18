import { FileText } from "lucide-react";
import Link from "next/link";
import { ReviewStatusCard } from "./ReviewStatusCard";
import { SubmissionInfoCard } from "./SubmissionInfoCard";
import { EvaluationCard } from "./EvaluationCard";
import { TaskDetailsViewProps } from "@/types";
import { UploadedFilesCard } from "./UploadedFilesCard";

export function TaskDetailsView({
  id,
  status,
  title,
  subtitle,
  switcherCompleted,
  switcherPending,
  submission,
  uploadedFiles,
}: TaskDetailsViewProps) {
  return (
    <div className="max-w-7xl mx-auto space-y-6 px-4 md:px-0 pb-12">
      {/* Top Bar with Breadcrumbs & Dynamic Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* State Interactive Switcher */}
        <div className="flex items-center gap-1.5 
        bg-gray-bg border border-gray-200/80 p-1 
        rounded-xl self-start sm:self-auto shadow-xs">
          <Link
            href="?status=completed"
            className={`px-3.5 py-1.5 rounded-lg 
              text-xs md:text-sm font-bold transition-all 
              ${status === "completed"
                ? "bg-white text-brand-base shadow-xs"
                : "text-brand-muted hover:text-black"
              }`}
          >
            {switcherCompleted}
          </Link>
          <Link
            href="?status=pending"
            className={`px-3.5 py-1.5 rounded-lg 
              text-xs md:text-sm font-bold transition-all 
              ${status === "pending"
                ? "bg-white text-brand-orange shadow-xs"
                : "text-brand-muted hover:text-black"
              }`}
          >
            {switcherPending}
          </Link>
        </div>
      </div>

      {/* Header Row */}
      <div className="flex items-center gap-3.5 pb-3.5 md:pb-7">
        <div className="size-16 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-xs">
          <FileText className="size-8 text-brand-primary stroke-2.5" />
        </div>
        <div className="space-y-2 
        text-right rtl:text-right 
        ltr:text-left">
          <h1 className="text-2xl md:text-3xl 
          font-extrabold text-black">
            {title}
          </h1>
          <Link className="cursor-pointer" href={`/dashboard/my-track/lessons/${id}`}>
            <p className="text-brand-primary hover:text-brand-dark/90
          text-xs md:text-sm font-medium underline">
              {subtitle}
            </p>
          </Link>
        </div>
      </div>

      {/* Review Status Banner */}
      <ReviewStatusCard status={status} submission={submission} />

      {/* Detail Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SubmissionInfoCard status={status} submission={submission} />
        <UploadedFilesCard files={uploadedFiles} />
      </div>

      {/* Evaluation and Feedback Section */}
      <EvaluationCard status={status} submission={submission} />
    </div>
  );
}
