"use client";

import { useInsertData } from "@/lib/hooks/useInsertData";
import endpoints from "@/lib/api/endpoints";
import { CreateTaskPayload, CreateTaskResponse } from "@/types";

export function useCreateTask() {
  const { loading, insertData } = useInsertData<CreateTaskResponse>(
    endpoints.mentor.tasks.create,
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
