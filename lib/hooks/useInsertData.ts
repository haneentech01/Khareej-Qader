"use client";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import apiClient from "@/lib/api/client";
import axios from "axios";

export function useInsertData<T>(
  url: string,
  options?: UseMutationOptions<
    {
      success: boolean;
      data?: T;
      status?: number | null;
      message?: string;
    },
    Error,
    Record<string, unknown> | FormData
  >,
) {
  const mutation = useMutation({
    mutationFn: async (body: Record<string, unknown> | FormData) => {
      try {
        const res = await apiClient.post<T>(url, body);
        return { success: true, data: res.data };
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const message =
            err.message || err.response?.data?.message || "حدث خطأ غير متوقع";
          throw new Error(message);
        }
        const fallbackErr = err as { message?: string };
        throw new Error(fallbackErr?.message || "حدث خطأ غير متوقع");
      }
    },
    ...options,
  });

  return {
    ...mutation,
    loading: mutation.isPending,
    insertData: async (body: Record<string, unknown> | FormData) => {
      try {
        const result = await mutation.mutateAsync(body);
        return result;
      } catch (err) {
        return {
          success: false,
          status: null,
          data: null,
          message: err instanceof Error ? err.message : "حدث خطأ غير متوقع",
        };
      }
    },
  };
}
