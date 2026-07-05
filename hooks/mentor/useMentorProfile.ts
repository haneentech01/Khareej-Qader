"use client";

import endpoints from "@/lib/api/endpoints";
import { useGetData } from "@/lib/hooks/useGetData";
import { MentorProfile } from "@/types";

interface UseMentorProfileProps {
  enabled?: boolean;
}

export function useMentorProfile({
  enabled = true,
}: UseMentorProfileProps = {}) {
  const { data, loading, error, refetch } = useGetData<MentorProfile>(
    endpoints.mentor.dashboard,
    {
      immediate: enabled,
    },
  );

  return {
    mentor: data ?? null,
    loading,
    error,
    refetch,
  };
}
