"use client";

import React, { useState, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Download, Star, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProfileAvatar, ProfilePageLayout } from "../../../profile";
import { useSubmission } from "@/hooks/mentor/submissions/useSubmission";
import { useReviewSubmission } from "@/hooks/mentor/submissions/useReviewSubmission";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { useSubmissionReviewForm } from "@/hooks/mentor/submissions/useSubmissionReviewForm";
import { StudentSubmissionInfo } from "./StudentSubmissionInfo";
import { StudentSubmissionFile } from "./StudentSubmissionFile";
import { ReviewForm } from "./ReviewForm";

interface SubmissionReviewContentProps {
  submissionId: string;
}

export function SubmissionReviewContent({
  submissionId,
}: SubmissionReviewContentProps) {
  const t = useTranslations("MentorSubmissions");
  const locale = useLocale();

  const {
    submission,
    loading,
    error,
    refetch,
    formData,
    isReviewing,
    reviewError,
    showSuccess,
    successMessage,
    handleGradeChange,
    handleNotesChange,
    handleSubmit,
    reset
  } = useSubmissionReviewForm(submissionId)

  const breadcrumbsItems = [
    { label: t("breadcrumbs.home"), href: "/mentor" },
    { label: t("breadcrumbs.submissions"), href: "/mentor/submissions" },
    { label: `${submission?.task?.title}` },
  ];

  return (
    <ProfilePageLayout
      loading={loading}
      error={error}
      onRetry={refetch}
      retryLabel={t("retry")}
    >
      {submission && (
        <div className="max-w-5xl mx-auto space-y-6">
          <Breadcrumbs items={breadcrumbsItems} locale={locale} />

          <StudentSubmissionInfo submission={submission} />
          <StudentSubmissionFile submission={submission} />

          <ReviewForm
            grade={formData.grade}
            reviewNotes={formData.reviewNotes}
            isSubmitting={isReviewing}
            error={reviewError}
            showSuccess={showSuccess}
            successMessage={successMessage}
            onGradeChange={handleGradeChange}
            onNotesChange={handleNotesChange}
            onSubmit={handleSubmit} />

        </div>
      )}
    </ProfilePageLayout>
  );
}
