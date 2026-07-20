"use client";

import endpoints from "@/lib/api/endpoints";
import type { CourseListItem } from "@/types";
import { useGetData } from "@/lib/hooks/useGetData";

interface UseCoursesListOptions {
  enabled?: boolean;
}

export function useCoursesList({ enabled = true }: UseCoursesListOptions = {}) {
  const {
    data,
    loading,
    error,
    refetch: fetchData,
  } = useGetData<CourseListItem[]>(
    ["coursesList"],
    endpoints.lookup.coursesList,
    {
      enabled: enabled,
    }
  );

  return {
    courses: data ?? [],
    loading,
    error,
    refetch: fetchData,
  };
}
