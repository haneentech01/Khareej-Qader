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
  const playerRef = useRef<any>(null);

  // ─── 1. Reset + fetch resume ──────────────────
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

  // ─── 2. Duration من onReady مباشرة ───────────
  const handleReady = useCallback(
    (player: any) => {
      playerRef.current = player;

      // جلب duration مباشرة من ReactPlayer instance
      try {
        const duration = player.getDuration?.();
        if (duration && duration > 0) {
          durationRef.current = duration;
        }
      } catch {
        // silent
      }

      // Resume seek
      if (resumeLoaded && resumePosition && resumePosition > 0) {
        setTimeout(() => {
          try {
            player.seekTo?.(resumePosition, "seconds");
          } catch {
            // silent
          }
        }, 800);
      }
    },
    [resumeLoaded, resumePosition],
  );

  // ─── 3. Duration callback ─────────────────────
  const handleDuration = useCallback((duration: number) => {
    if (duration > 0) {
      durationRef.current = duration;
    }
  }, []);

  // ─── 4. حفظ التقدم ───────────────────────────
  const handleProgress = useCallback(
    ({ playedSeconds }: { playedSeconds: number; played: number }) => {
      if (!lessonId || playedSeconds <= 0) return;

      // محاولة جلب duration إذا ما اتجلب بعد
      if (!durationRef.current && playerRef.current) {
        try {
          const d = playerRef.current.getDuration?.();
          if (d > 0) durationRef.current = d;
        } catch {}
      }

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

  // ─── 5. markAsCompleted ───────────────────────
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

  // ─── 6. فحص 90% ──────────────────────────────
  const handleProgressCheck = useCallback(
    ({ playedSeconds, played }: { played: number; playedSeconds: number }) => {
      if (isCompleted || completeCalledRef.current) return;

      const duration = durationRef.current;

      if (duration > 0) {
        // إذا عندنا duration، نستخدمه
        const percent = playedSeconds / duration;
        const remaining = duration - playedSeconds;
        if (percent >= 0.9 || remaining <= 5) {
          markAsCompleted();
          return;
        }
      } else {
        // Fallback: استخدم played من ReactPlayer مباشرة
        if (played >= 0.9) {
          markAsCompleted();
          return;
        }
      }
    },
    [isCompleted, markAsCompleted],
  );

  // ─── 7. onEnded fallback ──────────────────────
  const handleEnded = useCallback(() => {
    if (!isCompleted && !completeCalledRef.current) {
      markAsCompleted();
    }
  }, [isCompleted, markAsCompleted]);

  // ─── 8. Save on page leave ────────────────────
  useEffect(() => {
    const saveOnLeave = () => {
      if (lastSavedPosition.current > 0 && lessonId) {
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
    handleReady,
    handleDuration,
    handleProgress,
    handleProgressCheck,
    handleEnded,
  };
}
