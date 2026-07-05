"use client";

import endpoints from "@/lib/api/endpoints";
import { useGetData } from "@/lib/hooks/useGetData";
import { MentorCourseItem } from "@/types";

export function useMentorCourses() {
  const { data, loading, error, refetch } = useGetData<MentorCourseItem[]>(
    endpoints.video.mentorCourses,
  );

  return {
    courses: data ?? [],
    loading,
    error,
    refetch,
  };
}
