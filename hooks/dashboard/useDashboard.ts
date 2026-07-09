"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api/client";
import endpoints from "@/lib/api/endpoints";
import { queryKeys } from "@/lib/query/keys";
import type { ApiResponse, DashboardData } from "@/types";

interface UseDashboardOptions {
  enabled?: boolean;
}

// GET /students/student-profile
export function useDashboard({ enabled = true }: UseDashboardOptions = {}) {
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.student.dashboard,
    queryFn: async () => {
      const res = await apiClient.get<ApiResponse<DashboardData>>(
        endpoints.student.profile,
      );
      return res.data.data;
    },
    enabled,
  });

  return {
    dashboard: data ?? null,
    student: data?.student ?? null,
    course: data?.course ?? null,
    loading: isLoading,
    error: error ? (error as Error).message : null,
    refetch,
    invalidate: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.student.dashboard,
      }),
  };
}
