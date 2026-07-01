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

/**
 * تقييم تسليم مهمة طالب عبر:
 *   PATCH /tasks/submissions/{id}/review
 *
 * الـ payload المُرسل:
 *   { grade: number, review_notes: string }
 *
 * الاستجابة المتوقعة من الـ backend:
 *   {
 *     success: true,
 *     message: "Task reviewed successfully",
 *     data: TaskSubmission  // يحتوي على student + reviewer relations
 *   }
 *
 * تصميم الـ hook:
 *  - نستخدم apiClient مباشرة (PATCH) بدل useUpdateData لأننا نحتاج لتمرير
 *    URL ديناميكي يحتوي على الـ id في كل استدعاء، بينما useUpdateData
 *    يأخذ URL ثابت عند الإنشاء.
 *  - نُرجع نتيجة موحّدة { success, data?, message? } لتسهيل الاستهلاك
 *    من قبل الـ UI دون الحاجة للتعامل مع axios error details.
 *  - نعيد الحالة loading و error لربطها بزر الإرسال وعرض رسائل الخطأ.
 *
 * مثال الاستخدام:
 *   const { reviewSubmission, loading, error } = useReviewSubmission();
 *   const result = await reviewSubmission(submissionId, { grade: 90, review_notes: "Excellent" });
 *   if (result.success) { ... } else { toast.error(result.message); }
 */
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
    /** نتيجة آخر تقييم ناجح */
    reviewedSubmission: data,
    /** true أثناء إرسال طلب التقييم — يُستخدم لتعطيل زر الإرسال وإظهار spinner */
    loading,
    /** رسالة الخطأ الأخيرة (إن وُجدت) */
    error,
    /** الدالة التي تستدعيها الـ UI لإرسال التقييم */
    reviewSubmission,
    /** إعادة تعيين الحالة (مثلاً بعد إغلاق الـ modal أو التنقل) */
    reset: () => {
      setData(null);
      setError(null);
      setLoading(false);
    },
  };
}
