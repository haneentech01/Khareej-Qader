"use client";

import endpoints from "@/lib/api/endpoints";
import { useGetData } from "@/lib/hooks/useGetData";
import { DashboardData } from "@/types";

interface UseDashboardProps {
  enabled?: boolean;
}

export function useDashboard({ enabled = true }: UseDashboardProps = {}) {
  const { data, loading, error, refetch } = useGetData<DashboardData>(
    endpoints.student.profile,
    {
      immediate: enabled,
    },
  );

  return {
    dashboard: data as DashboardData | null,
    loading,
    error,
    refetch,
  };
}
