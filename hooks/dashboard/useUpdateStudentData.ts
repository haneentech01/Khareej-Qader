"use client";

import { useQueryClient } from "@tanstack/react-query";
import endpoints from "@/lib/api/endpoints";
import { queryKeys } from "@/lib/query/keys";
import { useUpdateData } from "@/lib/hooks/useUpdateData";
import type { UpdateStudentDataPayload, UpdatedStudentData } from "@/types";

interface UpdateResult {
  success: boolean;
  data?: UpdatedStudentData;
  message?: string;
}

// PATCH /students/update-student-data
export function useUpdateStudentData() {
  const queryClient = useQueryClient();

  const { loading, error, updateData, reset } =
    useUpdateData<UpdatedStudentData>(endpoints.student.updateData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.student.dashboard,
        });
      },
    });

  const updateStudentData = async (
    payload: UpdateStudentDataPayload,
  ): Promise<UpdateResult> => {
    return updateData(payload as Record<string, unknown>, "patch");
  };

  return {
    updateStudentData,
    loading,
    error,
    successMessage: null,
    reset,
  };
}
