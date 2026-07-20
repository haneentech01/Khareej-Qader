"use client";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import apiClient from "@/lib/api/client";
import axios from "axios";
import { ApiResponse } from "@/types";

interface UpdateResult<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export function useUpdateData<T>(
  url: string,
  options?: UseMutationOptions<UpdateResult<T>, Error, { body: Record<string, unknown> | FormData; method?: "put" | "patch" }>
) {
  const mutation = useMutation({
    mutationFn: async ({ body, method = "patch" }) => {
      try {
        const res = await apiClient[method]<ApiResponse<T>>(url, body);
        const responseData = res.data?.data ?? null;
        const responseMessage = res.data?.message ?? null;

        if (responseData) {
          return {
            success: true,
            data: responseData,
            message: responseMessage ?? undefined,
          };
        }

        const softMsg = responseMessage || "لم يتم حفظ التعديلات، حاول مرة أخرى";
        throw new Error(softMsg);
      } catch (err) {
        let message: string;
        if (axios.isAxiosError(err)) {
          message = (err.response?.data?.message as string | undefined) || err.message || "حدث خطأ أثناء الحفظ";
        } else {
          const fallbackErr = err as { message?: string };
          message = fallbackErr?.message || "حدث خطأ أثناء الحفظ";
        }
        throw new Error(message);
      }
    },
    ...options,
  });

  return {
    ...mutation,
    loading: mutation.isPending,
    error: mutation.error?.message || null,
    successMessage: mutation.isSuccess ? mutation.data?.message : null,
    data: mutation.data?.data ?? null,
    updateData: async (body: Record<string, unknown> | FormData, method: "put" | "patch" = "patch") => {
      try {
        const result = await mutation.mutateAsync({ body, method });
        return result;
      } catch (err) {
        return { success: false, message: err instanceof Error ? err.message : "حدث خطأ أثناء الحفظ" };
      }
    },
    reset: mutation.reset
  };
}
