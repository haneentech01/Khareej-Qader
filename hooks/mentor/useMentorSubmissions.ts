"use client";

import endpoints from "@/lib/api/endpoints";
import { useGetData } from "@/lib/hooks/useGetData";
import { TaskSubmissionListItem } from "@/types";

interface UseMentorSubmissionsOptions {
  enabled?: boolean;
}

export function useMentorSubmissions({
  enabled = true,
}: UseMentorSubmissionsOptions = {}) {
  const { data, loading, error, refetch } = useGetData<
    TaskSubmissionListItem[]
  >(endpoints.mentor.submissions, {
    immediate: enabled,
  });

  return {
    submissions: data ?? [],
    loading,
    error,
    refetch,
  };
}
