"use client";
import { useState } from "react";
import apiClient from "@/lib/api/client";
import axios from "axios";

export function useInsertData<T>(url: string) {
  const [loading, setLoading] = useState(false);

  const insertData = async (body: Record<string, unknown> | FormData) => {
    setLoading(true);

    try {
      const res = await apiClient.post<T>(url, body);
      return { success: true as const, data: res.data };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return {
          success: false as const,
          status: err.response?.status ?? null,
          data: err.response?.data ?? null,
          message:
            err.response?.data?.message || err.message || "حدث خطأ غير متوقع",
        };
      }

      return {
        success: false as const,
        status: null,
        data: null,
        message: "حدث خطأ غير متوقع",
      };
    } finally {
      setLoading(false);
    }
  };

  return { loading, insertData };
}
