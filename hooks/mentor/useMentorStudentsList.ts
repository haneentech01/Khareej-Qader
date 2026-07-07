"use client";

import endpoints from "@/lib/api/endpoints";
import { useGetData } from "@/lib/hooks/useGetData";
import { MentorStudentListItem } from "@/types";

export function useMentorStudentsList() {
  const { data, loading, error, refetch } = useGetData<MentorStudentListItem[]>(
    endpoints.mentor.students,
  );

  return {
    students: data ?? [],
    loading,
    error,
    refetch,
  };
}
