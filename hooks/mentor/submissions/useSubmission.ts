"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api/client";
import endpoints from "@/lib/api/endpoints";
import { queryKeys } from "@/lib/query/keys";
import type { ApiResponse, SubmissionDetail } from "@/types";

interface UseSubmissionOptions {
  enabled?: boolean;
}

// GET (/tasks/submissions/{id}).
export function useSubmission(
  submissionId: string | number,
  { enabled = true }: UseSubmissionOptions = {},
) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.mentor.submissionDetails(submissionId),
    queryFn: async () => {
      const res = await apiClient.get<
        ApiResponse<SubmissionDetail | SubmissionDetail[]>
      >(endpoints.mentor.submissionDetails(submissionId));
      const data = res.data.data;
      return Array.isArray(data) ? data[0] : data;
    },
    enabled: enabled && Boolean(submissionId),
  });

  return {
    submission: data ?? null,
    loading: isLoading,
    error: error ? (error as Error).message : null,
    refetch,
  };
}
