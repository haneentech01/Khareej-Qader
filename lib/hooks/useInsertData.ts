"use client";
import { useState } from "react";
import apiClient from "@/lib/api/client";
import axios from "axios";

export function useInsertData<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string[]>
  >({});

  const insertData = async (body: Record<string, unknown> | FormData) => {
    setLoading(true);
    setError(null);
    setValidationErrors({});

    try {
      const res = await apiClient.post<T>(url, body);
      setData(res.data);

      return {
        success: true,
        data: res.data,
        message:
          ((res.data as Record<string, unknown>)?.message as string) || null,
        validationErrors: {},
      };
    } catch (err) {
      let validationErrs: Record<string, string[]> = {};
      let errorMessage: string | null = null;

      if (axios.isAxiosError(err)) {
        const responseData = err.response?.data;
        validationErrs = responseData?.errors || {};
        errorMessage = responseData?.message || err.message || null;
        setValidationErrors(validationErrs);
        setError(errorMessage);
      } else {
        errorMessage = "حدث خطأ غير متوقع";
        setError(errorMessage);
      }
      return {
        success: false,
        data: null,
        message: errorMessage,
        validationErrors: validationErrs,
      };
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, validationErrors, insertData };
}
