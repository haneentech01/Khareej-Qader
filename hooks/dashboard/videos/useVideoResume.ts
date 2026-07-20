"use client";

import { useGetData } from "@/lib/hooks/useGetData";
import endpoints from "@/lib/api/endpoints";
import type { VideoResumeData } from "@/types";

interface UseVideoResumeProps {
  lessonId: string | number;
}

export function useVideoResume({ lessonId }: UseVideoResumeProps) {
  const { data, loading, error, refetch } = useGetData<VideoResumeData>(
    ["videoResume", lessonId],
    endpoints.video.resume(lessonId),
  );

  return {
    resumePosition: data ?? null,
    resumeLoaded: !loading,
    resumeError: error,
    refetchResume: refetch,
  };
}
