"use client";

import { AlertCircle } from "lucide-react";
import { useMentorSubmissions } from "@/hooks/mentor/useMentorSubmissions";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import SubmissionsTable from "./SubmissionsTable";


export function SubmissionsPageMentor() {
  const tCommon = useTranslations("Dashboard");
  const { submissions, loading, error, refetch } = useMentorSubmissions();

  // ─── Error state ─────────────────────────────────────────────────────────
  if (error && !loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 pb-12 px-4 md:px-0">
        <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
          <div className="size-16 rounded-3xl bg-red-50 flex items-center justify-center">
            <AlertCircle className="size-8 text-red-500" />
          </div>
          <p className="text-red-500 font-semibold text-base text-center max-w-md">
            {error}
          </p>
          <Button
            onClick={() => refetch()}
            variant="outline"
            className="border-brand-primary text-brand-primary hover:bg-brand-light cursor-pointer"
          >
            {tCommon("retry")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 pb-12 px-4 md:px-0 animate-in fade-in duration-500">
      <div className="w-full flex flex-col gap-6 bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
        <SubmissionsTable submissions={submissions} loading={loading} />
      </div>
    </div>
  );
}
