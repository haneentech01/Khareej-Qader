"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api/client";
import endpoints from "@/lib/api/endpoints";
import { queryKeys } from "@/lib/query/keys";
import type { ApiResponse, SubmitTaskResponse } from "@/types";

const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
  "application/pdf",
  "application/zip",
  "application/x-zip-compressed",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
  "image/jpg",
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

/**
 * POST /tasks/{taskId}/submit
 *
 * مسؤولية واحدة: تسليم مهمة (رفع ملف).
 *
 * ✅ بعد نجاح التسليم، بيعمل invalidate لـ:
 *    - queryKeys.student.tasks (قائمة المهام)
 *    - queryKeys.student.taskDetails(taskId) (تفاصيل المهمة دي)
 *    عشان الـ UI يتحدث ويعرض إن المهمة اتعملها submit.
 */
export function useSubmitTask() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      taskId,
      file,
    }: {
      taskId: string | number;
      file: File;
    }) => {
      // ─── Client-side validation ──────────────────────────────────────────
      const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();

      if (
        !ALLOWED_TYPES.includes(file.type) &&
        !ALLOWED_EXTENSIONS.includes(fileExtension)
      ) {
        throw new Error(
          "نوع الملف غير مدعوم. المسموح: pdf, zip, doc, docx, png, jpg, jpeg",
        );
      }
      if (file.size > MAX_SIZE) {
        throw new Error("حجم الملف كبير جداً (الحد الأقصى 10MB)");
      }

      // ─── Build FormData ──────────────────────────────────────────────────
      const formData = new FormData();
      formData.append("file", file);

      // ─── Send request ────────────────────────────────────────────────────
      const res = await apiClient.post<ApiResponse<SubmitTaskResponse>>(
        endpoints.student.submitTask(taskId),
        formData,
        { headers: { "Content-Type": undefined } }, // ضروري عشان axios يحط الـ boundary
      );
      return res.data;
    },
    onSuccess: (_data, variables) => {
      // تحديث قائمة المهام وتفاصيل المهمة الحالية
      queryClient.invalidateQueries({ queryKey: queryKeys.student.tasks });
      queryClient.invalidateQueries({
        queryKey: queryKeys.student.taskDetails(variables.taskId),
      });
    },
  });

  const submitTask = async (
    taskId: string | number,
    file: File,
  ): Promise<SubmitResult> => {
    try {
      const data = await mutation.mutateAsync({ taskId, file });
      return {
        success: true,
        message: data.message ?? undefined,
        data: data.data ?? undefined,
      };
    } catch (err) {
      const e = err as { message?: string };
      return {
        success: false,
        message: e?.message || "حدث خطأ أثناء تسليم المهمة",
      };
    }
  };

  return {
    submitTask,
    loading: mutation.isPending,
    error: mutation.error ? (mutation.error as Error).message : null,
    successMessage: mutation.data?.message ?? null,
    submittedTask: mutation.data?.data ?? null,
    reset: mutation.reset,
  };
}
