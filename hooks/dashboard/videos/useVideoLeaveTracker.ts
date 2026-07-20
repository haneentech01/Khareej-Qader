"use client";

import { useEffect } from "react";
import apiClient from "@/lib/api/client";
import endpoints from "@/lib/api/endpoints";
import type { VideoProgressPayload } from "@/types";

interface UseVideoLeaveTrackerProps {
  lessonId: string | number;
  lastSavedPositionRef: React.MutableRefObject<number>;
}

export function useVideoLeaveTracker({
  lessonId,
  lastSavedPositionRef,
}: UseVideoLeaveTrackerProps) {
  useEffect(() => {
    const saveOnLeave = () => {
      if (lastSavedPositionRef.current <= 0) return;

      const payload: VideoProgressPayload = {
        position: lastSavedPositionRef.current,
        watched_seconds: lastSavedPositionRef.current,
      };

      apiClient
        .post(endpoints.video.progress(lessonId), payload)
        .catch(() => {});
    };

    window.addEventListener("beforeunload", saveOnLeave);
    return () => window.removeEventListener("beforeunload", saveOnLeave);
  }, [lessonId, lastSavedPositionRef]);
}
