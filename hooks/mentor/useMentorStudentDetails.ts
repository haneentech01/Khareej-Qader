"use client";

import { useGetData } from "@/lib/hooks/useGetData";
import endpoints from "@/lib/api/endpoints";
import type { MentorStudentDetails } from "@/types";

interface UseMentorStudentDetailsOptions {
  enabled?: boolean;
}

//  GET /mentor/students/{id}

export function useMentorStudentDetails(
  studentId: string | number | null | undefined,
  { enabled = true }: UseMentorStudentDetailsOptions = {},
) {
  const url = studentId ? endpoints.mentor.student(studentId) : "";

  const { data, loading, error, refetch } = useGetData<MentorStudentDetails>(
    ["mentorStudentDetails", studentId],
    url,
    { enabled: enabled && Boolean(studentId) },
  );

  return {
    student: data ?? null,
    loading,
    error,
    refetch,
  };
}
