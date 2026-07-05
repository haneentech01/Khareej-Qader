"use client";

import endpoints from "@/lib/api/endpoints";
import { useGetData } from "@/lib/hooks/useGetData";
import { MentorTasksCountData } from "@/types";

export function useMentorTasksCount() {
  const { data, loading, error, refetch } = useGetData<MentorTasksCountData>(
    endpoints.mentor.tasks.count,
  );

  return {
    totalCount: data?.total ?? 0,
    loading,
    error,
    refetch,
  };
}
