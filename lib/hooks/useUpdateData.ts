// hooks/useUpdateData.ts
"use client";
import { useState } from "react";
import apiClient from "@/lib/api/client";

export function useUpdateData<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateData = async (
    body: Record<string, unknown> | FormData,
    // "put"   = استبدل البيانات كاملة
    // "patch" = عدّل جزء من البيانات بس
    method: "put" | "patch" = "patch",
  ) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient[method]<T>(url, body);
      setData(res.data);
      return res.data;
    } catch (err) {
      const e = err as { message?: string };
      setError(e.message || "حدث خطأ");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, updateData };
}
