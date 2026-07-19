"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api/client";
import endpoints from "@/lib/api/endpoints";
import { queryKeys } from "@/lib/query/keys";
import type {
  ApiResponse,
  ReviewSubmissionPayload,
  ReviewSubmissionResponse,
} from "@/types";

interface ReviewResult {
  success: boolean;
  message?: string;
  data?: ReviewSubmissionResponse;
}

/**
 * useReviewSubmission — Hook لتقييم تسليم طالب.
 *
 * مسؤولية واحدة: إرسال PATCH /tasks/submissions/{id}/review
 *
 * ✅ بعد نجاح التقييم، يعمل invalidate لـ:
 *    - queryKeys.mentor.submissions (قائمة التسليمات)
 *    - queryKeys.mentor.dashboard (لوحة تحكم المنتور - آخر التسليمات)
 */
export function useReviewSubmission() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      submissionId,
      payload,
    }: {
      submissionId: string | number;
      payload: ReviewSubmissionPayload;
    }) => {
      const res = await apiClient.patch<ApiResponse<ReviewSubmissionResponse>>(
        endpoints.mentor.tasks.reviewSubmission(submissionId),
        payload,
      );
      return res.data;
    },
    onSuccess: () => {
      // تحديث قائمة تسليمات المنتور
      queryClient.invalidateQueries({
        queryKey: queryKeys.mentor.submissions,
      });
      // تحديث لوحة تحكم المنتور
      queryClient.invalidateQueries({
        queryKey: queryKeys.mentor.dashboard,
      });
    },
  });

  const reviewSubmission = async (
    submissionId: string | number,
    payload: ReviewSubmissionPayload,
  ): Promise<ReviewResult> => {
    try {
      const data = await mutation.mutateAsync({ submissionId, payload });
      return {
        success: true,
        message: data.message ?? "تم التقييم بنجاح",
        data: data.data ?? undefined,
      };
    } catch (err) {
      const e = err as { message?: string };
      return {
        success: false,
        message: e?.message || "حدث خطأ أثناء التقييم",
      };
    }
  };

  return {
    reviewSubmission,
    loading: mutation.isPending,
    error: mutation.error ? (mutation.error as Error).message : null,
    successMessage: mutation.data?.message ?? null,
    reset: mutation.reset,
  };
}
