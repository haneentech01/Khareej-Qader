"use client";

import { useQueryClient } from "@tanstack/react-query";
import endpoints from "@/lib/api/endpoints";
import { queryKeys } from "@/lib/query/keys";
import { useUpdateData } from "@/lib/hooks/useUpdateData";
import type { UpdateMentorDataPayload, UpdatedMentorData } from "@/types";

interface UpdateResult {
  success: boolean;
  data?: UpdatedMentorData;
  message?: string;
}

export function useUpdateMentorData() {
  const queryClient = useQueryClient();

  const { loading, error, updateData, reset } =
    useUpdateData<UpdatedMentorData>(endpoints.mentor.updateData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.mentor.dashboard,
        });
      },
    });

  const updateMentorData = async (
    payload: UpdateMentorDataPayload,
  ): Promise<UpdateResult> => {
    return updateData(payload as Record<string, unknown>, "patch");
  };

  return {
    updateMentorData,
    loading,
    error,
    successMessage: null,
    reset,
  };
}
