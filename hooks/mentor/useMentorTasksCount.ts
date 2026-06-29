"use client";

import endpoints from "@/lib/api/endpoints";
import { useGetData } from "@/lib/hooks/useGetData";
import { MentorTasksCountData } from "@/types";

/**
 * يجلب إجمالي عدد المهام الخاصة بالمنتور.
 *
 * الـ endpoint هو /tasks/count ويرجع:
 *   { success, message, data: { total: number } }
 *
 * يُستخدم في الـ stats card "إجمالي المهام" أعلى صفحة /mentor/tasks.
 */
export function useMentorTasksCount() {
  const { data, loading, error, refetch } = useGetData<MentorTasksCountData>(
    endpoints.mentor.tasks.count,
  );

  return {
    totalCount: data?.total ?? 0,
    loading,
    error,
    refetch,
  };
}
