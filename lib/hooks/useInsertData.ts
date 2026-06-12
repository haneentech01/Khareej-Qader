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

    try {
      const res = await apiClient.post<T>(url, body);
      setData(res.data);
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = err.response?.data?.errors || err.message;
        if (error) {
          setValidationErrors(error);
        }

        setError(error);
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, validationErrors, insertData };
}
