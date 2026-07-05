"use client";

import endpoints from "@/lib/api/endpoints";
import { useGetData } from "@/lib/hooks/useGetData";
import { MentorTaskListItem } from "@/types";

export function useMentorTasksList() {
  const { data, loading, error, refetch } = useGetData<MentorTaskListItem[]>(
    endpoints.mentor.tasks.list,
  );

  return {
    tasks: data ?? [],
    loading,
    error,
    refetch,
  };
}
