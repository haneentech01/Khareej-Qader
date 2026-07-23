"use client";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import apiClient from "@/lib/api/client";
import { ApiResponse } from "@/types";
import axios from "axios";

export function useGetData<T>(
  queryKey: QueryKey,
  url: string,
  options?: Omit<UseQueryOptions<T, Error, T>, "queryKey" | "queryFn">,
) {
  const query = useQuery<T, Error, T>({
    queryKey,
    queryFn: async () => {
      try {
        const res = await apiClient.get<ApiResponse<T>>(url);
        const { data: responseData, message } = res.data;

        if (responseData !== null && responseData !== undefined) {
          return responseData;
        }
        throw new Error(message || "لا توجد بيانات متاحة");
      } catch (err) {
        if (axios.isAxiosError(err)) {
          throw new Error(
            err.response?.data?.message ||
              err.message ||
              "حدث خطأ أثناء جلب البيانات",
          );
        }
        throw err;
      }
    },
    ...options,
  });

  return {
    ...query,
    loading: query.isLoading,
    error: query.error?.message || null,
  };
}
