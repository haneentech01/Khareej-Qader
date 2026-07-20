"use client";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import apiClient from "@/lib/api/client";

export function useDeleteData(
  url: string,
  options?: UseMutationOptions<boolean, Error, void>
) {
  const mutation = useMutation({
    mutationFn: async () => {
      try {
        await apiClient.delete(url);
        return true;
      } catch (err) {
        const e = err as { message?: string };
        throw new Error(e.message || "حدث خطأ");
      }
    },
    ...options,
  });

  return {
    ...mutation,
    loading: mutation.isPending,
    error: mutation.error?.message || null,
    deleteData: async () => {
      try {
        return await mutation.mutateAsync();
      } catch {
        return false;
      }
    }
  };
}
