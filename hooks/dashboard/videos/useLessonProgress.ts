// hooks/dashboard/videos/useLessonProgress.ts
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import apiClient from "@/lib/api/client";
import endpoints from "@/lib/api/endpoints";
import { ApiResponse } from "@/types";

interface UseLessonProgressProps {
  lessonId: string | number;
  onVideoCompleted?: () => void;
}

export function useLessonProgress({
  lessonId,
  onVideoCompleted,
}: UseLessonProgressProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [resumePosition, setResumePosition] = useState<number | null>(null);
  const [resumeLoaded, setResumeLoaded] = useState(false);

  const lastProgressSave = useRef(0);
  const completeCalledRef = useRef(false);
  const durationRef = useRef(0);
  const lastSavedPosition = useRef(0);

  // ─── 1. جلب آخر موقع ──────────────────────────
  useEffect(() => {
    if (!lessonId) return;
    let cancelled = false;

    completeCalledRef.current = false;
    setIsCompleted(false);
    setResumePosition(null);
    setResumeLoaded(false);
    lastProgressSave.current = 0;
    durationRef.current = 0;
    lastSavedPosition.current = 0;

    const fetchResume = async () => {
      try {
        const res = await apiClient.get<ApiResponse<{ last_position: number }>>(
          endpoints.video.resume(lessonId),
        );

        const position = res.data.data?.last_position;
        if (!cancelled && position != null && position > 0) {
          setResumePosition(position);
        }
      } catch {
        // silent
      } finally {
        if (!cancelled) setResumeLoaded(true);
      }
    };

    fetchResume();
    return () => {
      cancelled = true;
    };
  }, [lessonId]);

  // ─── 2. حفظ Duration ──────────────────────────
  const handleDuration = useCallback((duration: number) => {
    if (duration > 0) {
      durationRef.current = duration;
    }
  }, []);

  // ─── 3. حفظ التقدم (throttled) ─────────────────
  const handleProgress = useCallback(
    ({ playedSeconds }: { playedSeconds: number; played: number }) => {
      if (!lessonId || playedSeconds <= 0) return;

      const now = Date.now();
      if (now - lastProgressSave.current < 5000) return;
      lastProgressSave.current = now;
      lastSavedPosition.current = Math.floor(playedSeconds);

      apiClient
        .post(endpoints.video.progress(lessonId), {
          position: Math.floor(playedSeconds),
          watched_seconds: Math.floor(playedSeconds),
        })
        .catch(() => {});
    },
    [lessonId],
  );

  // ─── 4. إكمال الفيديو ──────────────────────────
  const markAsCompleted = useCallback(async () => {
    if (completeCalledRef.current || !lessonId) return;

    completeCalledRef.current = true;
    setIsCompleted(true);

    try {
      await apiClient.post(endpoints.video.complete(lessonId));
      onVideoCompleted?.();
    } catch {
      completeCalledRef.current = false;
      setIsCompleted(false);
    }
  }, [lessonId, onVideoCompleted]);

  // ─── 5. فحص 90% أو آخر 3 ثوانٍ ────────────────
  const handleProgressCheck = useCallback(
    ({ playedSeconds }: { played: number; playedSeconds: number }) => {
      if (isCompleted || completeCalledRef.current) return;

      const duration = durationRef.current;
      if (!duration || duration <= 0) return;

      const percent = playedSeconds / duration;
      const remaining = duration - playedSeconds;

      if (percent >= 0.9 || remaining <= 3) {
        markAsCompleted();
      }
    },
    [isCompleted, markAsCompleted],
  );

  // ─── 6. Fallback: onEnded ──────────────────────
  const handleEnded = useCallback(() => {
    if (!isCompleted && !completeCalledRef.current) {
      markAsCompleted();
    }
  }, [isCompleted, markAsCompleted]);

  // ─── 7. حفظ التقدم عند مغادرة الصفحة ──────────
  useEffect(() => {
    const saveOnLeave = () => {
      if (lastSavedPosition.current > 0 && lessonId) {
        // sendBeacon أضمن من fetch عند الإغلاق
        const payload = JSON.stringify({
          position: lastSavedPosition.current,
          watched_seconds: lastSavedPosition.current,
        });

        const url = `${process.env.NEXT_PUBLIC_API_URL}${endpoints.video.progress(lessonId)}`;

        if (navigator.sendBeacon) {
          const blob = new Blob([payload], { type: "application/json" });
          navigator.sendBeacon(url, blob);
        }
      }
    };

    window.addEventListener("beforeunload", saveOnLeave);
    return () => window.removeEventListener("beforeunload", saveOnLeave);
  }, [lessonId]);

  return {
    isCompleted,
    resumePosition,
    resumeLoaded,
    handleDuration,
    handleProgress,
    handleProgressCheck,
    handleEnded,
  };
}
