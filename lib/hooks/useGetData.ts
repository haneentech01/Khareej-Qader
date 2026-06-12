"use client";
import { useState, useEffect, useCallback } from "react";
import apiClient from "@/lib/api/client";
import { ApiResponse } from "@/types";

interface UseGetDataOptions {
  immediate?: boolean; // هل نجيب البيانات فوراً لما يفتح الصفحة؟
}

export function useGetData<T>(
  url: string,
  { immediate = true }: UseGetDataOptions = {},
) {
  const [data, setData] = useState<T | string | null>(null);
  const [loading, setLoading] = useState(immediate); // لو immediate=true ابدأ بـ loading
  const [error, setError] = useState<string | null>(null);

  // useCallback يمنع إعادة إنشاء الـ function في كل render
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await apiClient.get<ApiResponse<T>>(url);
      const { data: responseData, message } = res.data;

      // لو data فيها بيانات → احفظها
      // لو data = null     → احفظ الـ message بدلها
      setData(responseData ?? message);
      return responseData ?? message;
    } catch (err) {
      const e = err as { message?: string };
      setError(e.message || "حدث خطأ");
    } finally {
      setLoading(false); // دايماً وقف الـ loading سواء نجح أو فشل
    }
  }, [url]);

  // useEffect يشتغل لما الـ component يفتح
  useEffect(() => {
    if (immediate) fetchData();
  }, [immediate, fetchData]);

  // بنرجع كل اللي محتاجه الـ component
  return { data, loading, error, refetch: fetchData };
}
