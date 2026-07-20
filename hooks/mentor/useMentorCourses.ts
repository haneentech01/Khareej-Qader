"use client";

import endpoints from "@/lib/api/endpoints";
import { useGetData } from "@/lib/hooks/useGetData";
import { TrackCourses } from "@/types";

interface UseMentorCourses {
  enabled?: boolean;
}

export function useMentorCourses({ enabled = true }: UseMentorCourses = {}) {
  const { data, loading, error, refetch } = useGetData<TrackCourses[]>(
    ["mentorCourses"],
    endpoints.video.mentorCourses,
    {
      enabled: enabled,
    },
  );

  return {
    courses: data ?? [],
    loading,
    error,
    refetch,
  };
}
