"use client";

import endpoints from "@/lib/api/endpoints";
import { useGetData } from "@/lib/hooks/useGetData";
import { DashboardData } from "@/types";

export function useDashboard() {
  const { data, loading, error, refetch } = useGetData<DashboardData>(
    endpoints.student.profile,
  );

  return {
    dashboard: data as DashboardData | null,
    loading,
    error,
    refetch,
  };
}
