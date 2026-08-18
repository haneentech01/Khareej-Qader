"use client";

import { useGetData } from "@/lib/hooks/useGetData";
import endpoints from "@/lib/api/endpoints";
import { queryKeys } from "@/lib/query/keys";
import type { AdminMentor } from "@/types";

interface UseAdminMentorsOptions {
  enabled?: boolean;
}

// useAdminMentors — قائمة كل المنتورات.

export function useAdminMentors({
  enabled = true,
}: UseAdminMentorsOptions = {}) {
  const { data, loading, error, refetch } = useGetData<AdminMentor[]>(
    queryKeys.admin.mentors,
    endpoints.admin.mentors,
    { enabled },
  );

  return {
    mentors: data ?? [],
    loading,
    error,
    refetch,
  };
}
