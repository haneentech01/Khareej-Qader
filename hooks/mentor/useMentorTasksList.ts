"use client";

import endpoints from "@/lib/api/endpoints";
import { useGetData } from "@/lib/hooks/useGetData";
import { MentorTaskListItem } from "@/types";

interface UseMentorTasksListOptions {
  enabled?: boolean;
}

export function useMentorTasksList({
  enabled = true,
}: UseMentorTasksListOptions = {}) {
  const { data, loading, error, refetch } = useGetData<MentorTaskListItem[]>(
    endpoints.mentor.tasks.list,
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
