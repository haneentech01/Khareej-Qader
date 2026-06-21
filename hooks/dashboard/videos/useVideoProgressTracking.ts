"use client";

import { useCallback, useRef } from "react";
import { useInsertData } from "@/lib/hooks/useInsertData";
import endpoints from "@/lib/api/endpoints";
import type { VideoProgressPayload, VideoProgressResponse } from "@/types";

interface UseVideoProgressTrackingProps {
  lessonId: string | number;
}

export function useVideoProgressTracking({
  lessonId,
}: UseVideoProgressTrackingProps) {
  const { insertData } = useInsertData<VideoProgressResponse>(
    endpoints.video.progress(lessonId),
  );

  const lastSavedPositionRef = useRef(0);

  // ★ useCallback لمنع إعادة إنشاء الدالة كل render
  const saveProgress = useCallback(
    async (position: number): Promise<boolean> => {
      if (position <= 0) return false;
      if (position === lastSavedPositionRef.current) return true;

      const payload: VideoProgressPayload = {
        position,
        watched_seconds: position,
      };

      const result = await insertData(payload);

      if (result.success) {
        lastSavedPositionRef.current = position;
        return true;
      }
      return false;
    },
    [insertData],
  );

  // ★ useCallback — هذه كانت سبب الـ bug!
  const reset = useCallback(() => {
    lastSavedPositionRef.current = 0;
  }, []);

  return { saveProgress, lastSavedPositionRef, reset };
}
