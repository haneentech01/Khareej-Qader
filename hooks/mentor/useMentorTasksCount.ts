"use client";

import endpoints from "@/lib/api/endpoints";
import { useGetData } from "@/lib/hooks/useGetData";
import { MentorTasksCountData } from "@/types";

interface UseMentorTasksCountOptions {
  enabled?: boolean;
}

export function useMentorTasksCount({
  enabled = true,
}: UseMentorTasksCountOptions = {}) {
  const { data, loading, error, refetch } = useGetData<MentorTasksCountData>(
    endpoints.mentor.tasks.count,
    {
      immediate: enabled,
    },
  );

  return {
    totalCount: data?.total ?? 0,
    loading,
    error,
    refetch,
  };
}
