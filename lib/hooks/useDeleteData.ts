// hooks/useDeleteData.ts
"use client";
import { useState } from "react";
import apiClient from "@/lib/api/client";

export function useDeleteData(url: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteData = async () => {
    setLoading(true);
    setError(null);
    try {
      await apiClient.delete(url);
      return true; // ← نجح
    } catch (err) {
      const e = err as { message?: string };
      setError(e.message || "حدث خطأ");
      return false; // ← فشل
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, deleteData };
}
