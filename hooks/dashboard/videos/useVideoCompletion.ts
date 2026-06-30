"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useInsertData } from "@/lib/hooks/useInsertData";
import endpoints from "@/lib/api/endpoints";
import type { VideoCompleteResponse } from "@/types";

interface UseVideoCompletionProps {
  lessonId: string | number;
  onVideoCompleted?: () => void;
}

const COMPLETION_THRESHOLD = 0.95;

export function useVideoCompletion({
  lessonId,
  onVideoCompleted,
}: UseVideoCompletionProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const completionFiredRef = useRef(false);

  const onVideoCompletedRef = useRef(onVideoCompleted);
  
  useEffect(() => {
    onVideoCompletedRef.current = onVideoCompleted;
  }, [onVideoCompleted]);

  const { insertData } = useInsertData<VideoCompleteResponse>(
    endpoints.video.complete(lessonId),
  );

  // ★ useCallback
  const triggerCompletion = useCallback(async (): Promise<void> => {
    if (completionFiredRef.current) return;
    completionFiredRef.current = true;
    setIsCompleted(true);

    onVideoCompletedRef.current?.();
    await insertData({});
  }, [insertData]);

  // ★ useCallback
  const checkCompletion = useCallback(
    (currentTime: number, duration: number): boolean => {
      if (completionFiredRef.current) return true;
      if (!duration || duration <= 0) return false;

      if (currentTime / duration >= COMPLETION_THRESHOLD) {
        triggerCompletion();
        return true;
      }
      return false;
    },
    [triggerCompletion],
  );

  // ★ useCallback — هذه كانت سبب الـ bug!
  const reset = useCallback(() => {
    completionFiredRef.current = false;
    setIsCompleted(false);
  }, []);

  return { isCompleted, checkCompletion, triggerCompletion, reset };
}
