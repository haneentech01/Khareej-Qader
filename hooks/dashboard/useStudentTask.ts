"use client";

import endpoints from "@/lib/api/endpoints";
import { queryKeys } from "@/lib/query/keys";
import { useGetData } from "@/lib/hooks/useGetData";
import type { AllTaskItem, StudentTaskSubmission } from "@/types";

// ─── Hook 1: قائمة كل مهام الطالب ─────────────────────────────────────────

interface UseStudentTasksOptions {
  enabled?: boolean;
}

export function useStudentTasks({
  enabled = true,
}: UseStudentTasksOptions = {}) {
  const { data, loading, error, refetch } = useGetData<AllTaskItem[]>(
    [...queryKeys.student.tasks],
    endpoints.tasks.all,
    { enabled },
  );

  return {
    tasks: data ?? [],
    loading,
    error,
    refetch,
  };
}

// ─── Hook 2: تفاصيل مهمة واحدة + حالة التسليم ───────────────────────────────

interface UseStudentTaskResult {
  task: AllTaskItem | null;
  submission: StudentTaskSubmission | null;
  status: "not_submitted" | "pending" | "reviewed";
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useStudentTask(taskId: string | number): UseStudentTaskResult {
  const {
    data: task,
    loading,
    error,
    refetch,
  } = useGetData<AllTaskItem>(
    [...queryKeys.student.taskDetails(taskId)],
    endpoints.tasks.details(taskId!),
    { enabled: Boolean(taskId) },
  );

  // استخراج آخر submission من المهمة
  const submission: StudentTaskSubmission | null = (() => {
    if (!task?.submissions?.length) return null;
    return task.submissions[task.submissions.length - 1];
  })();

  // تحديد الـ status بناءً على قيمة الـ backend
  const status: "not_submitted" | "pending" | "reviewed" = !submission
    ? "not_submitted"
    : submission.submission_reviewed
      ? "reviewed"
      : "pending";

  return {
    task: task ?? null,
    submission,
    status,
    loading,
    error,
    refetch,
  };
}
