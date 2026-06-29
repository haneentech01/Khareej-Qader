"use client";

import endpoints from "@/lib/api/endpoints";
import { useGetData } from "@/lib/hooks/useGetData";
import { MentorTaskListItem } from "@/types";

/**
 * يجلب قائمة المهام الخاصة بالمنتور.
 *
 * الـ endpoint هو /tasks/list ويرجع:
 *   { success, message, data: MentorTaskListItem[] }
 *
 * يُستخدم في جدول المهام بصفحة /mentor/tasks.
 */
export function useMentorTasksList() {
  const { data, loading, error, refetch } = useGetData<MentorTaskListItem[]>(
    endpoints.mentor.tasks.list,
  );

  return {
    tasks: data ?? [],
    loading,
    error,
    refetch,
  };
}
