"use client";

import { useGetData } from "@/lib/hooks/useGetData";
import endpoints from "@/lib/api/endpoints";
import { StudentPathData } from "@/types";

export function useStudentPath() {
  const { data, loading, error, refetch } = useGetData<StudentPathData>(
    endpoints.student.studentPath,
    { immediate: true },
  );

  return { data, loading, error, refetch };
}
