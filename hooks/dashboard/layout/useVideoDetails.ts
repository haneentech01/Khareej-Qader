"use client";

import endpoints from "@/lib/api/endpoints";
import type { VideoDetails } from "@/types";
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
    ["videoDetails", videoId],
    endpoints.video.details(videoId!),
    {
      enabled: enabled && Boolean(videoId),
    },
  );

  return {
    video: data ?? null,
    loading,
    error,
    refetch,
  };
}
