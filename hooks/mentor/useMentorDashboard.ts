"use client";

import endpoints from "@/lib/api/endpoints";
import { useGetData } from "@/lib/hooks/useGetData";
import { MentorDashboardData } from "@/types";

interface UseMentorDashboardProps {
  enabled?: boolean;
}

export function useMentorDashboard({
  enabled = true,
}: UseMentorDashboardProps = {}) {
  const { data, loading, error, refetch } = useGetData<MentorDashboardData>(
    endpoints.mentor.dashboard,
    {
      immediate: enabled,
    },
  );

  return {
    dashboard: (data as MentorDashboardData) ?? null,
    loading,
    error,
    refetch,
  };
}
