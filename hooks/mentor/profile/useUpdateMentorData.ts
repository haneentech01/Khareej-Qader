"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api/client";
import endpoints from "@/lib/api/endpoints";
import { queryKeys } from "@/lib/query/keys";
import type {
  ApiResponse,
  UpdateMentorDataPayload,
  UpdatedMentorData,
} from "@/types";

interface UpdateResult {
  success: boolean;
  data?: UpdatedMentorData;
  message?: string;
}

export function useUpdateMentorData() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: UpdateMentorDataPayload) => {
      const res = await apiClient.patch<ApiResponse<UpdatedMentorData>>(
        endpoints.mentor.updateData,
        payload,
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.mentor.dashboard,
      });
    },
  });

  const updateMentorData = async (
    payload: UpdateMentorDataPayload,
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
    updateMentorData,
    loading: mutation.isPending,
    error: mutation.error ? (mutation.error as Error).message : null,
    successMessage: mutation.data?.message ?? null,
    reset: mutation.reset,
  };
}
