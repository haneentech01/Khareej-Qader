"use client";

import endpoints from "@/lib/api/endpoints";
import { queryKeys } from "@/lib/query/keys";
import { useInsertData } from "@/lib/hooks/useInsertData";
import type { CreateTaskPayload, CreateTaskResponse } from "@/types";

/**
 * useCreateTask — Hook لإنشاء مهمة جديدة من المنتور.
 * POST /mentor/tasks/create
 */
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
    const result = await insertData(payload as Record<string, unknown>);

    if (result.success) {
      return { success: true, data: result.data ?? undefined };
    }

    return {
      success: false,
      message: result.message ?? "حدث خطأ أثناء إنشاء المهمة",
    };
  };

  return { loading, createTask };
}
