"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api/client";
import endpoints from "@/lib/api/endpoints";
import { queryKeys } from "@/lib/query/keys";
import type { ApiResponse, MentorDashboardData } from "@/types";

interface UseDashboardOptions {
  enabled?: boolean;
}

// GET /students/student-profile
export function useMentorDashboard({
  enabled = true,
}: UseDashboardOptions = {}) {
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.mentor.dashboard,
    queryFn: async () => {
      const res = await apiClient.get<ApiResponse<MentorDashboardData>>(
        endpoints.mentor.dashboard,
      );
      return res.data.data;
    },
    enabled,
  });

  return {
    mentorDashboard: data ?? null,
    mentor: data?.mentor ?? null,
    course: data?.course ?? null,
    loading: isLoading,
    error: error ? (error as Error).message : null,
    refetch,
    invalidate: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.mentor.dashboard,
      }),
  };
}
