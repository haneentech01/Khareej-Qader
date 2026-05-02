"use client";
import { useState } from "react";
import apiClient from "@/lib/api/client";

export function useInsertData<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const insertData = async (body: Record<string, unknown> | FormData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.post<T>(url, body);
      setData(res.data);
      return res.data;
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "حدث خطأ");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, insertData };
}
