"use client";

import { useState, useCallback } from "react";
import { useReviewSubmission } from "@/hooks/mentor/submissions/useReviewSubmission";
import type { ReviewSubmissionPayload } from "@/types";
import { useSubmission } from "./useSubmission";

// ─── Types ─────────────────────────────────────────────────────────────────

export interface SubmissionReviewFormState {
  grade: string;
  reviewNotes: string;
}

export interface SubmissionReviewFormResult {
  // ─── Data (from useSubmission) ───────────────────────────────────────────
  submission: ReturnType<typeof useSubmission>["submission"];
  loading: boolean;
  error: string | null;
  refetch: () => void;

  // ─── Form State ──────────────────────────────────────────────────────────
  formData: SubmissionReviewFormState;
  isReviewing: boolean;
  reviewError: string | null;
  showSuccess: boolean;
  successMessage: string | null;

  // ─── Handlers ────────────────────────────────────────────────────────────
  handleGradeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNotesChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  reset: () => void;
}

// ─── Initial State ─────────────────────────────────────────────────────────

const INITIAL_FORM: SubmissionReviewFormState = {
  grade: "",
  reviewNotes: "",
};

// ─── Hook ──────────────────────────────────────────────────────────────────

export function useSubmissionReviewForm(
  submissionId: string,
): SubmissionReviewFormResult {
  // ─── Data Layer ──────────────────────────────────────────────────────────
  const { submission, loading, error, refetch } = useSubmission(submissionId);
  const {
    reviewSubmission,
    loading: isReviewing,
    error: reviewError,
    successMessage,
    reset: resetReview,
  } = useReviewSubmission();

  // ─── Form State ──────────────────────────────────────────────────────────
  const [formData, setFormData] =
    useState<SubmissionReviewFormState>(INITIAL_FORM);
  const [showSuccess, setShowSuccess] = useState(false);

  // ─── Handlers ────────────────────────────────────────────────────────────
  const clearMessages = useCallback(() => {
    if (showSuccess) setShowSuccess(false);
    if (reviewError) resetReview();
  }, [showSuccess, reviewError, resetReview]);

  const handleGradeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, grade: e.target.value }));
      clearMessages();
    },
    [clearMessages],
  );

  const handleNotesChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, reviewNotes: e.target.value }));
      clearMessages();
    },
    [clearMessages],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.grade || isReviewing) return;

      setShowSuccess(false);

      const payload: ReviewSubmissionPayload = {
        grade: Number(formData.grade),
        review_notes: formData.reviewNotes,
      };

      const actualSubmissionId = submission?.id ?? submissionId;
      const result = await reviewSubmission(actualSubmissionId, payload);

      if (result.success) {
        setShowSuccess(true);
        setFormData(INITIAL_FORM);
      }
    },
    [
      formData.grade,
      formData.reviewNotes,
      isReviewing,
      reviewSubmission,
      submission?.id,
      submissionId,
    ],
  );

  const reset = useCallback(() => {
    setFormData(INITIAL_FORM);
    setShowSuccess(false);
    resetReview();
  }, [resetReview]);

  return {
    // Data
    submission,
    loading,
    error,
    refetch,
    // Form State
    formData,
    isReviewing,
    reviewError,
    showSuccess,
    successMessage,
    // Handlers
    handleGradeChange,
    handleNotesChange,
    handleSubmit,
    reset,
  };
}
