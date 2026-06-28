"use client";

import { useInsertData } from "@/lib/hooks/useInsertData";
import endpoints from "@/lib/api/endpoints";
import { CreateTaskPayload, CreateTaskResponse } from "@/types";

/**
 * Hook لإضافة مهمة جديدة من المنتور.
 * يستخدم useInsertData + endpoints — بدون apiClient مباشرة.
 */
export function useCreateTask() {
  const { loading, insertData } = useInsertData<CreateTaskResponse>(
    endpoints.mentor.task.create,
  );

  const createTask = async (
    payload: CreateTaskPayload,
  ): Promise<{
    success: boolean;
    data?: CreateTaskResponse;
    message?: string;
  }> => {
    const result = await insertData(payload);

    if (result.success) {
      return { success: true, data: result.data };
    }

    return {
      success: false,
      message: result.message,
    };
  };

  return { loading, createTask };
}
