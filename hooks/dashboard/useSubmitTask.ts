"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import endpoints from "@/lib/api/endpoints";
import { queryKeys } from "@/lib/query/keys";
import apiClient from "@/lib/api/client";
import type { AllTaskItem, ApiResponse, SubmitTaskResponse } from "@/types";

const MAX_SIZE = 10 * 1024 * 1024; // 10MB

const ALLOWED_TYPES = [
  "application/pdf",
  "application/zip",
  "application/x-zip-compressed",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
];

const ALLOWED_EXTENSIONS = [
  ".pdf",
  ".zip",
  ".doc",
  ".docx",
  ".png",
  ".jpg",
  ".jpeg",
];

interface SubmitResult {
  success: boolean;
  message?: string;
  data?: SubmitTaskResponse;
}

export function useSubmitTask() {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitTask = async (
    taskId: string | number,
    file: File,
  ): Promise<SubmitResult> => {
    // ─── Client-side validation ───────────────────────────────────────────
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();

    if (
      !ALLOWED_TYPES.includes(file.type) &&
      !ALLOWED_EXTENSIONS.includes(fileExtension)
    ) {
      const msg =
        "نوع الملف غير مدعوم. المسموح: pdf, zip, doc, docx, png, jpg, jpeg";
      setError(msg);
      return { success: false, message: msg };
    }
    if (file.size > MAX_SIZE) {
      const msg = "حجم الملف كبير جداً (الحد الأقصى 10MB)";
      setError(msg);
      return { success: false, message: msg };
    }

    setLoading(true);
    setError(null);

    // ─── Optimistic update ────────────────────────────────────────────────
    await queryClient.cancelQueries({ queryKey: queryKeys.student.tasks });
    const previousTasks = queryClient.getQueryData<AllTaskItem[]>(
      queryKeys.student.tasks,
    );

    queryClient.setQueryData<AllTaskItem[]>(queryKeys.student.tasks, (old) => {
      if (!old) return old;
      return old.map((t) => {
        if (t.id !== Number(taskId)) return t;
        return {
          ...t,
          submissions: [
            ...(t.submissions || []),
            {
              id: Date.now(),
              task_id: Number(taskId),
              student_id: 0,
              grade: null,
              file: null,
              reviewed_by: null,
              reviewed_at: null,
              review_notes: null,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              submission_reviewed: false,
              reviewer: null,
              student: {
                id: 0,
                full_name: "Student",
                email: "",
                profile_image: undefined,
              },
            },
          ],
        };
      });
    });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await apiClient.post<ApiResponse<SubmitTaskResponse>>(
        endpoints.tasks.submit(taskId),
        formData,
        { headers: { "Content-Type": undefined } },
      );

      // ─── Cache invalidation بعد النجاح ───────────────────────────────
      queryClient.invalidateQueries({
        queryKey: queryKeys.student.taskDetails(taskId),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.student.tasks });

      return {
        success: true,
        message: res.data.message ?? undefined,
        data: res.data.data ?? undefined,
      };
    } catch (err) {
      // ─── Rollback عند الخطأ ───────────────────────────────────────────
      if (previousTasks) {
        queryClient.setQueryData(queryKeys.student.tasks, previousTasks);
      }
      const e = err as { message?: string };
      const msg = e?.message || "حدث خطأ أثناء تسليم المهمة";
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setLoading(false);
    setError(null);
  };

  return {
    submitTask,
    loading,
    error,
    reset,
  };
}
