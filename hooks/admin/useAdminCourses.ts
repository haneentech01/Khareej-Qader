"use client";

import { useGetData } from "@/lib/hooks/useGetData";
import endpoints from "@/lib/api/endpoints";
import { queryKeys } from "@/lib/query/keys";
import type { AdminCourse } from "@/types";

interface UseAdminCoursesOptions {
  enabled?: boolean;
}

/**
 * useAdminCourses — قائمة كل الكورسات.
 *
 * ✅ GET /course/all-course
 * ✅ يستخدم useGetData بنمطه الجديد (queryKey, url, options)
 *
 * الـ response من الـ backend هو array مباشرة (ليس paginated).
 */
export function useAdminCourses({
  enabled = true,
}: UseAdminCoursesOptions = {}) {
  const { data, loading, error, refetch } = useGetData<AdminCourse[]>(
    queryKeys.admin.courses,
    endpoints.admin.courses,
    { enabled },
  );

  return {
    courses: data ?? [],
    loading,
    error,
    refetch,
  };
}
