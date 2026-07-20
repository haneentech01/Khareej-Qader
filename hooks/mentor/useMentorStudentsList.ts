"use client";

import endpoints from "@/lib/api/endpoints";
import { useGetData } from "@/lib/hooks/useGetData";
import { MentorStudentListItem } from "@/types";

interface UseMentorStudentsListOptions {
  enabled?: boolean;
}

export function useMentorStudentsList({
  enabled = true,
}: UseMentorStudentsListOptions = {}) {
  const { data, loading, error, refetch } = useGetData<MentorStudentListItem[]>(
    ["mentorStudentsList"],
    endpoints.mentor.students,
    {
      enabled: enabled,
    },
  );

  return {
    students: data ?? [],
    loading,
    error,
    refetch,
  };
}
