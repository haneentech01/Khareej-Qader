"use client";

import { useQueryClient } from "@tanstack/react-query";
import endpoints from "@/lib/api/endpoints";
import { queryKeys } from "@/lib/query/keys";
import type {
  ReviewSubmissionPayload,
  ReviewSubmissionResponse,
} from "@/types";

interface ReviewResult {
  success: boolean;
  message?: string;
  data?: ReviewSubmissionResponse;
}

export function useReviewSubmission() {
  const queryClient = useQueryClient();

  const reviewSubmission = async (
    submissionId: string | number,
    payload: ReviewSubmissionPayload,
  ): Promise<ReviewResult> => {
    try {
      const { default: apiClient } = await import("@/lib/api/client");
      const { default: axios } = await import("axios");

      const res = await apiClient.patch(
        endpoints.mentor.tasks.reviewSubmission(submissionId),
        payload,
      );

      // تحديث الـ cache بعد النجاح
      queryClient.invalidateQueries({ queryKey: queryKeys.mentor.submissions });
      queryClient.invalidateQueries({ queryKey: queryKeys.mentor.dashboard });

      return {
        success: true,
        message: res.data?.message ?? "تم التقييم بنجاح",
        data: res.data?.data ?? undefined,
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
    loading: false,
    error: null,
    reset: () => {},
  };
}
