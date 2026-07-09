"use client";

import { useState } from "react";
import apiClient from "@/lib/api/client";
import axios from "axios";
import { ApiResponse } from "@/types";

interface UpdateResult<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export function useUpdateData<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const updateData = async (
    body: Record<string, unknown> | FormData,
    method: "put" | "patch" = "patch",
  ): Promise<UpdateResult<T>> => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const res = await apiClient[method]<ApiResponse<T>>(url, body);
      const responseData = res.data?.data ?? null;
      const responseMessage = res.data?.message ?? null;

      if (responseData) {
        setData(responseData);
        if (responseMessage) {
          setSuccessMessage(responseMessage);
        }
        return {
          success: true,
          data: responseData,
          message: responseMessage ?? undefined,
        };
      }

      // success=true لكن data=null (نادر) — اعتبره فشلاً soft
      const softMsg = responseMessage || "لم يتم حفظ التعديلات، حاول مرة أخرى";
      setError(softMsg);
      return { success: false, message: softMsg };
    } catch (err) {
      // الـ interceptor ضاف رسالة واضحة في err.message
      let message: string;

      if (axios.isAxiosError(err)) {
        message =
          (err.response?.data?.message as string | undefined) ||
          err.message ||
          "حدث خطأ أثناء الحفظ";
      } else {
        const fallbackErr = err as { message?: string };
        message = fallbackErr?.message || "حدث خطأ أثناء الحفظ";
      }

      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  /** إعادة تعيين الحالة (data + error + successMessage + loading) */
  const reset = () => {
    setData(null);
    setError(null);
    setSuccessMessage(null);
    setLoading(false);
  };

  return {
    data,
    loading,
    error,
    successMessage,
    updateData,
    reset,
  };
}
