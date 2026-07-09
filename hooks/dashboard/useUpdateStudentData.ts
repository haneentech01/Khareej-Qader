"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api/client";
import endpoints from "@/lib/api/endpoints";
import { queryKeys } from "@/lib/query/keys";
import type {
  ApiResponse,
  UpdateStudentDataPayload,
  UpdatedStudentData,
} from "@/types";

interface UpdateResult {
  success: boolean;
  data?: UpdatedStudentData;
  message?: string;
}

// PATCH /students/update-student-data

export function useUpdateStudentData() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: UpdateStudentDataPayload) => {
      const res = await apiClient.patch<ApiResponse<UpdatedStudentData>>(
        endpoints.student.updateData,
        payload,
      );
      return res.data;
    },
    onSuccess: () => {
      // ✅ Invalidate → كل الـ consumers بيعملوا refetch
      queryClient.invalidateQueries({
        queryKey: queryKeys.student.dashboard,
      });
    },
  });

  const updateStudentData = async (
    payload: UpdateStudentDataPayload,
  ): Promise<UpdateResult> => {
    try {
      const data = await mutation.mutateAsync(payload);
      return {
        success: true,
        data: data.data ?? undefined,
        message: data.message ?? undefined,
      };
    } catch (err) {
      const e = err as { message?: string };
      return {
        success: false,
        message: e?.message || "حدث خطأ أثناء حفظ التعديلات",
      };
    }
  };

  return {
    updateStudentData,
    loading: mutation.isPending,
    error: mutation.error ? (mutation.error as Error).message : null,
    successMessage: mutation.data?.message ?? null,
    reset: mutation.reset,
  };
}
