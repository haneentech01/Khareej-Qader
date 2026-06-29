"use client";
import { useState } from "react";
import apiClient from "@/lib/api/client";
import axios from "axios";

/**
 * Hook لإرسال بيانات للـ backend (POST/PUT/PATCH/DELETE).
 *
 * التحسين: لما الـ backend يرجع خطأ، الـ interceptor بياخد رسالة واضحة من
 * extractErrorMessage (في interceptors.ts) ويحطها في err.message.
 * هنا بنستخدم err.message مباشرة بدل ما نعيد الاستخراج من err.response.data
 * — عشان كده اللي عدّلنا في interceptors يوصل لكل الـ callers.
 */
export function useInsertData<T>(url: string) {
  const [loading, setLoading] = useState(false);

  const insertData = async (body: Record<string, unknown> | FormData) => {
    setLoading(true);

    try {
      const res = await apiClient.post<T>(url, body);
      return { success: true as const, data: res.data };
    } catch (err) {
      // الـ interceptor عدّاً بياخد رسالة واضحة من extractErrorMessage
      // ويحطها في err.message. فنستخدمها مباشرة.
      if (axios.isAxiosError(err)) {
        const message =
          err.message || err.response?.data?.message || "حدث خطأ غير متوقع";

        return {
          success: false as const,
          status: err.response?.status ?? null,
          data: err.response?.data ?? null,
          message,
        };
      }

      // لو مش axios error (نادر، زي network error قبل ما الـ response يوصل)
      const fallbackErr = err as { message?: string };
      return {
        success: false as const,
        status: null,
        data: null,
        message: fallbackErr?.message || "حدث خطأ غير متوقع",
      };
    } finally {
      setLoading(false);
    }
  };

  return { loading, insertData };
}
