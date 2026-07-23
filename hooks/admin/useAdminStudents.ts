"use client";

import { useGetData } from "@/lib/hooks/useGetData";
import endpoints from "@/lib/api/endpoints";
import { queryKeys } from "@/lib/query/keys";
import type { AdminStudent } from "@/types";

interface UseAdminStudentsOptions {
  enabled?: boolean;
}

/**
 * useAdminStudents — قائمة كل الطلاب.
 *
 * ✅ GET /students/all-students
 * ✅ يستخدم useGetData بنمطه الجديد (queryKey, url, options)
 *
 * الـ response من الـ backend هو array مباشرة (ليس paginated).
 */
export function useAdminStudents({
  enabled = true,
}: UseAdminStudentsOptions = {}) {
  const { data, loading, error, refetch } = useGetData<AdminStudent[]>(
    queryKeys.admin.students,
    endpoints.admin.students,
    { enabled },
  );

  return {
    students: data ?? [],
    loading,
    error,
    refetch,
  };
}
