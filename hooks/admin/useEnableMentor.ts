import apiClient from "@/lib/api/client";
import endpoints from "@/lib/api/endpoints";
import { queryKeys } from "@/lib/query/keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEnableMentor() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ slug }: { slug: string }) => {
      const res = await apiClient.post(endpoints.admin.enableMentor(slug));
      return { success: true, data: res.data };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.mentors });
    },
  });

  const mutateAsync = async (variables: { slug: string }) => {
    try {
      return await mutation.mutateAsync(variables);
    } catch (err) {
      return {
        success: false,
        message: err instanceof Error ? err.message : "حدث خطأ غير متوقع",
      };
    }
  };

  return { mutateAsync, loading: mutation.isPending };
}
