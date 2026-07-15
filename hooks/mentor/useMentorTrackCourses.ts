"use client";

import endpoints from "@/lib/api/endpoints";
import type { TrackCourses } from "@/types";
import { useGetData } from "@/lib/hooks/useGetData";

interface UseMentorCoursesOptions {
  enabled?: boolean;
}

export function useMentorTrackCourses({
  enabled = true,
}: UseMentorCoursesOptions = {}) {
  const { data, loading, error } = useGetData<TrackCourses[]>(
    endpoints.mentor.trackCourses,
    {
      immediate: enabled,
    },
  );

  return {
    courses: data ?? [],
    loading,
    error,
  };
}
