"use client";

import endpoints from "@/lib/api/endpoints";
import type { AllTaskItem, CourseListItem } from "@/types";
import { useGetData } from "@/lib/hooks/useGetData";

interface UseAllTasksOptions {
  enabled?: boolean;
}

export function useAllTasks({ enabled = true }: UseAllTasksOptions = {}) {
  const { data, loading, error, refetch } = useGetData<AllTaskItem[]>(
    endpoints.tasks.all,
    {
      immediate: enabled,
    },
  );

  return {
    tasks: data ?? [],
    loading,
    error,
    refetch,
  };
}
