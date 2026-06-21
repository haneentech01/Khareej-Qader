"use client";

import { useCallback, useEffect, useRef } from "react";
import { useVideoResume } from "./useVideoResume";
import { useVideoProgressTracking } from "./useVideoProgressTracking";
import { useVideoCompletion } from "./useVideoCompletion";
import { useVideoLeaveTracker } from "./useVideoLeaveTracker";

const PROGRESS_INTERVAL_MS = 5000;

interface UseLessonProgressProps {
  lessonId: string | number;
  onVideoCompleted?: () => void;
}

export function useLessonProgress({
  lessonId,
  onVideoCompleted,
}: UseLessonProgressProps) {
  const { resumePosition, resumeLoaded, resumeError, refetchResume } =
    useVideoResume({ lessonId });

  const {
    saveProgress,
    lastSavedPositionRef,
    reset: resetProgress,
  } = useVideoProgressTracking({ lessonId });

  const {
    isCompleted,
    checkCompletion,
    triggerCompletion,
    reset: resetCompletion,
  } = useVideoCompletion({ lessonId, onVideoCompleted });

  useVideoLeaveTracker({ lessonId, lastSavedPositionRef });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ★ الآن reset ثابتة → useEffect يشتغل فقط عند تغيير lessonId
  useEffect(() => {
    resetProgress();
    resetCompletion();

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [lessonId, resetProgress, resetCompletion]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  // ★ useCallback — الآن ثابتة لأن saveProgress و checkCompletion ثابتتان
  const handleReady = useCallback(
    (video: HTMLVideoElement) => {
      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        const currentTime = video.currentTime;
        const duration = video.duration;

        if (
          !currentTime ||
          !duration ||
          isNaN(currentTime) ||
          isNaN(duration) ||
          duration === 0
        ) {
          return;
        }

        const position = Math.floor(currentTime);

        if (position > 0) {
          saveProgress(position);
        }

        checkCompletion(currentTime, duration);
      }, PROGRESS_INTERVAL_MS);
    },
    [saveProgress, checkCompletion],
  );

  const handleEnded = useCallback(() => {
    triggerCompletion();
  }, [triggerCompletion]);

  return {
    isCompleted,
    resumePosition,
    resumeLoaded,
    resumeError,
    handleReady,
    handleEnded,
    refetchResume,
  };
}
