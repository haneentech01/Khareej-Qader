"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api/client";
import endpoints from "@/lib/api/endpoints";
import { queryKeys } from "@/lib/query/keys";
import type { ApiResponse, VideoDetails } from "@/types";
import { useGetData } from "@/lib/hooks/useGetData";

interface UseVideoDetailsOptions {
  enabled?: boolean;
}

// GET /videos/details/{id}

export function useVideoDetails(
  videoId: string | number | null | undefined,
  { enabled = true }: UseVideoDetailsOptions = {},
) {
  const { data, loading, error, refetch } = useGetData<VideoDetails>(
    endpoints.video.details(videoId!),
    {
      immediate: enabled && Boolean(videoId),
    },
  );

  return {
    video: data ?? null,
    loading,
    error,
    refetch,
  };
}
