"use client";

import endpoints from "@/lib/api/endpoints";
import { useGetData } from "@/lib/hooks/useGetData";
import { DashboardData } from "@/types";

interface UseStudentProfileOptions {
  enabled?: boolean;
}

export function useStudentProfile({
  enabled = true,
}: UseStudentProfileOptions = {}) {
  const { data, loading, error, refetch } = useGetData<DashboardData>(
    endpoints.student.profile,
    {
      immediate: enabled,
    },
  );

  return {
    student: data?.student ?? null,
    course: data?.course ?? null,
    loading,
    error,
    refetch,
  };
}
