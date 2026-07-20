"use client";

import endpoints from "@/lib/api/endpoints";
import { queryKeys } from "@/lib/query/keys";
import { useGetData } from "@/lib/hooks/useGetData";
import type { SubmissionDetail } from "@/types";

interface UseSubmissionOptions {
  enabled?: boolean;
}

// GET /tasks/submissions/{id}
export function useSubmission(
  submissionId: string | number,
  { enabled = true }: UseSubmissionOptions = {},
) {
  const { data, loading, error, refetch } = useGetData<
    SubmissionDetail[] | SubmissionDetail
  >(
    [...queryKeys.mentor.submissionDetails(submissionId)],
    endpoints.mentor.submissionDetails(submissionId),
    { enabled: enabled && Boolean(submissionId) },
  );

  // نُحوّل دائماً إلى كائن واحد أو null
  const submission: SubmissionDetail | null = !data
    ? null
    : Array.isArray(data)
      ? (data[0] ?? null)
      : data;

  return {
    submission,
    loading,
    error,
    refetch,
  };
}
