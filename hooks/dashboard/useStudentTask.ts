"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api/client";
import endpoints from "@/lib/api/endpoints";
import { queryKeys } from "@/lib/query/keys";
import type { ApiResponse, AllTaskItem, StudentTaskSubmission } from "@/types";

// ─── Hook 1: قائمة كل المهام ───────────────────────────────────────────────

interface UseStudentTasksOptions {
    enabled?: boolean;
}

export function useStudentTasks({ enabled = true }: UseStudentTasksOptions = {}) {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: queryKeys.student.tasks,
        queryFn: async () => {
            const res = await apiClient.get<ApiResponse<AllTaskItem[]>>(
                endpoints.tasks.all,
            );
            return res.data.data;
        },
        enabled,
    });

    return {
        tasks: data ?? [],
        loading: isLoading,
        error: error ? (error as Error).message : null,
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

export function useStudentTask(
    taskId: string | number | null | undefined,
): UseStudentTaskResult {
    const {
        data: task,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: queryKeys.student.taskDetails(taskId ?? "unknown"),
        queryFn: async () => {
            const res = await apiClient.get<ApiResponse<AllTaskItem>>(
                endpoints.tasks.details(taskId!)
            );
            return res.data.data;
        },
        enabled: Boolean(taskId),
    });

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
        loading: isLoading,
        error: error ? (error as Error).message : null,
        refetch,
    };
}