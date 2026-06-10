"use client";
import { useState, useEffect, useCallback } from "react";
import apiClient from "@/lib/api/client";

// T = نوع البيانات اللي رح يرجعها (Generic)
// مثال: useGetData<StudentProfile>("/api/profile")
interface UseGetDataOptions {
  immediate?: boolean; // هل نجيب البيانات فوراً لما يفتح الصفحة؟
}

export function useGetData<T>(
  url: string,
  { immediate = true }: UseGetDataOptions = {},
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(immediate); // لو immediate=true ابدأ بـ loading
  const [error, setError] = useState<string | null>(null);

  // useCallback يمنع إعادة إنشاء الـ function في كل render
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await apiClient.get<{ data: T }>(url);
      // بعض الـ APIs بترجع { data: {...} } وبعضها بترجع البيانات مباشرة
      // هاد بيتعامل مع الحالتين
      setData(res.data);
      return res.data;
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
