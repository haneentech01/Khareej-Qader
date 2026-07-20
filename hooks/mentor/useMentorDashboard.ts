"use client";

import { useQueryClient } from "@tanstack/react-query";
import endpoints from "@/lib/api/endpoints";
import { queryKeys } from "@/lib/query/keys";
import { useGetData } from "@/lib/hooks/useGetData";
import type { MentorDashboardData } from "@/types";

interface UseMentorDashboardOptions {
  enabled?: boolean;
}

// GET /mentor/dashboard
export function useMentorDashboard({
  enabled = true,
}: UseMentorDashboardOptions = {}) {
  const queryClient = useQueryClient();

  const { data, loading, error, refetch } = useGetData<MentorDashboardData>(
    [...queryKeys.mentor.dashboard],
    endpoints.mentor.dashboard,
    { enabled },
  );

  return {
    mentorDashboard: data ?? null,
    mentor: data?.mentor ?? null,
    course: data?.course ?? null,
    loading,
    error,
    refetch,
    invalidate: () =>
      queryClient.invalidateQueries({
        queryKey: queryKeys.mentor.dashboard,
      }),
  };
}
