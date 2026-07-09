"use client";

import { useState } from "react";
import apiClient from "@/lib/api/client";
import axios from "axios";
import endpoints from "@/lib/api/endpoints";
import {
  ApiResponse,
  ReviewSubmissionPayload,
  ReviewSubmissionResponse,
} from "@/types";

export function useReviewSubmission() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ReviewSubmissionResponse | null>(null);

  const reviewSubmission = async (
    submissionId: string | number,
    payload: ReviewSubmissionPayload,
  ): Promise<{
    success: boolean;
    data?: ReviewSubmissionResponse;
    message?: string;
  }> => {
    setLoading(true);
    setError(null);

    const url = endpoints.mentor.tasks.reviewSubmission(submissionId);

    try {
      const res = await apiClient.patch<ApiResponse<ReviewSubmissionResponse>>(
        url,
        payload,
      );

      // الـ backend يرجع data داخل res.data.data (بعد الـ ApiResponse wrapper)
      const responseData = res.data?.data ?? null;
      const responseMessage = res.data?.message ?? null;

      if (responseData) {
        setData(responseData);
        return {
          success: true,
          data: responseData,
          message: responseMessage ?? undefined,
        };
      }

      // success=true لكن data=null (نادر) — نعتبره فشلاً soft
      const softMsg = responseMessage || "لم يتم حفظ التقييم، حاول مرة أخرى";
      setError(softMsg);
      return { success: false, message: softMsg };
    } catch (err) {
      // الـ interceptor ضاف رسالة واضحة في err.message (انظر interceptors.ts)
      let message: string;

      if (axios.isAxiosError(err)) {
        message =
          (err.response?.data?.message as string | undefined) ||
          err.message ||
          "حدث خطأ أثناء إرسال التقييم";
      } else {
        const fallbackErr = err as { message?: string };
        message = fallbackErr?.message || "حدث خطأ أثناء إرسال التقييم";
      }

      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  return {
    reviewedSubmission: data,
    loading,
    error,
    reviewSubmission,
    reset: () => {
      setData(null);
      setError(null);
      setLoading(false);
    },
  };
}
