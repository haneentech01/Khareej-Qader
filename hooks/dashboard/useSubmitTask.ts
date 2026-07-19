"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api/client";
import endpoints from "@/lib/api/endpoints";
import { queryKeys } from "@/lib/query/keys";
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

  const mutation = useMutation({
    mutationFn: async ({
      taskId,
      file,
    }: {
      taskId: string | number;
      file: File;
    }) => {
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

      const formData = new FormData();
      formData.append("file", file);

      const res = await apiClient.post<ApiResponse<SubmitTaskResponse>>(
        endpoints.tasks.submit(taskId),
        formData,
        { headers: { "Content-Type": undefined } },
      );
      return res.data;
    },
    // 1️⃣ onMutate: التحديث الفوري (Optimistic Update) قبل إرسال الطلب
    onMutate: async ({ taskId }) => {
      // إلغاء أي طلبات جلب قيد التنفيذ لقائمة المهام
      await queryClient.cancelQueries({ queryKey: queryKeys.student.tasks });

      // حفظ النسخة القديمة للرجوع إليها في حال الخطأ
      const previousTasks = queryClient.getQueryData<AllTaskItem[]>(
        queryKeys.student.tasks,
      );

      // تحديث الـ cache فوراً ليعرض حالة "تحت المراجعة"
      queryClient.setQueryData<AllTaskItem[]>(
        queryKeys.student.tasks,
        (oldTasks) => {
          if (!oldTasks) return oldTasks;
          return oldTasks.map((t) => {
            if (t.id === Number(taskId)) {
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
                  },
                ],
              };
            }
            return t;
          });
        },
      );

      return { previousTasks };
    },
    // 2️⃣ onError: التراجع عن التحديث الفوري في حال فشل الطلب
    onError: (err, variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(
          queryKeys.student.tasks,
          context.previousTasks,
        );
      }
    },
    // 3️⃣ onSettled: تحديث البيانات من الخادم بعد انتهاء الطلب (نجاح أو فشل)
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.student.taskDetails(variables.taskId),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.student.tasks });
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
