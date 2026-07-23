import endpoints from "@/lib/api/endpoints";
import { useInsertData } from "@/lib/hooks/useInsertData";
import { queryKeys } from "@/lib/query/keys";
import { queryClient } from "@/lib/query/queryClient";
import { CreateCoursePayload } from "@/types";

// POST /course/create

export function useCreateCourse() {
  return useInsertData<CreateCoursePayload>(endpoints.admin.createCourse, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.admin.courses,
      });
    },
  });
}
