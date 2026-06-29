"use client";
import { useState, useEffect, useCallback } from "react";
import apiClient from "@/lib/api/client";
import { ApiResponse } from "@/types";

interface UseGetDataOptions {
  immediate?: boolean; // هل نجيب البيانات فوراً لما يفتح الصفحة؟
}

/**
 * Hook لجلب بيانات من الـ backend (GET).
 *
 * التحسين: لما الـ request يفشل، الـ interceptor بياخد رسالة واضحة من
 * extractErrorMessage (في interceptors.ts) ويحطها في err.message.
 * فنستخدم err.message مباشرة.
 *
 * كمان عالجنا حالة "data = null": إذا رجع null، نحط رسالة مناسبة بدل
 * رسالة null الفاضية.
 */
export function useGetData<T>(
  url: string,
  { immediate = true }: UseGetDataOptions = {},
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await apiClient.get<ApiResponse<T>>(url);
      const { data: responseData, message } = res.data;

      if (responseData !== null && responseData !== undefined) {
        setData(responseData);
        setError(null);
      } else {
        // الـ backend رجع success=true لكن data=null
        // هذا يعني "ما فيش بيانات" — نحط رسالة واضحة
        setError(message || "لا توجد بيانات متاحة");
      }
      return responseData;
    } catch (err) {
      // الـ interceptor ضاف رسالة واضحة في err.message
      const e = err as { message?: string; response?: { status?: number } };
      const errMsg = e.message || "حدث خطأ أثناء جلب البيانات";
      setError(errMsg);

      // لوج إضافي للديباج
      console.error("[useGetData] ❌ Failed:", {
        url,
        status: e.response?.status,
        message: errMsg,
      });
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (immediate) fetchData();
  }, [immediate, fetchData]);

  return { data, loading, error, refetch: fetchData };
}
