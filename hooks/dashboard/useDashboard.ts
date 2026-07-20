"use client";

import { useQueryClient } from "@tanstack/react-query";
import endpoints from "@/lib/api/endpoints";
import { queryKeys } from "@/lib/query/keys";
import { useGetData } from "@/lib/hooks/useGetData";
import type { DashboardData } from "@/types";

interface UseDashboardOptions {
  enabled?: boolean;
}

// GET /students/student-profile
export function useDashboard({ enabled = true }: UseDashboardOptions = {}) {
  const queryClient = useQueryClient();

  const { data, loading, error, refetch } = useGetData<DashboardData>(
    [...queryKeys.student.dashboard],
    endpoints.student.profile,
    { enabled },
  );

  return {
    dashboard: data ?? null,
    student: data?.student ?? null,
    course: data?.course ?? null,
    loading,
    error,
    refetch,
    invalidate: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.student.dashboard }),
  };
}
