"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import apiClient from "@/lib/api/client";
import endpoints from "@/lib/api/endpoints";

// ─── ثوابت ──────────────────────────────────────
const PROGRESS_INTERVAL_MS = 5000;
const RESUME_APPLY_DELAY_MS = 800;
const COMPLETION_THRESHOLD = 0.95;

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

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastSavedPositionRef = useRef(0);
  const completionFiredRef = useRef(false);
  const onVideoCompletedRef = useRef(onVideoCompleted);

  useEffect(() => {
    onVideoCompletedRef.current = onVideoCompleted;
  });

  // 1) جلب resume position
  useEffect(() => {
    if (!lessonId) return;
    let cancelled = false;

    completionFiredRef.current = false;
    lastSavedPositionRef.current = 0;
    setIsCompleted(false);
    setResumePosition(null);
    setResumeLoaded(false);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    console.log("📡 Fetching resume for lessonId:", lessonId);

    apiClient
      .get<{
        success: boolean;
        message: string;
        data: number | null;
      }>(endpoints.video.resume(lessonId))
      .then((res) => {
        console.log("📥 Resume response:", {
          raw: res.data,
          position: res.data?.data,
        });
        if (cancelled) return;
        const position = res.data?.data;
        if (typeof position === "number" && position > 0) {
          setResumePosition(position);
        }
      })
      .catch((err) => {
        console.error("❌ Resume fetch failed:", err);
      })
      .finally(() => {
        if (!cancelled) setResumeLoaded(true);
      });

    return () => {
      cancelled = true;
    };
  }, [lessonId]);

  // 2) حفظ position + watched_seconds
  const saveProgress = useCallback(
    (position: number) => {
      if (position <= 0) return;
      if (position === lastSavedPositionRef.current) return;

      lastSavedPositionRef.current = position;
      console.log("💾 Saving progress:", position);

      // ★ الـ backend يتطلب watched_seconds — نرسلها = position مؤقتاً
      apiClient
        .post(endpoints.video.progress(lessonId), {
          position,
          watched_seconds: position,
        })
        .then(() => {
          console.log("✅ Progress saved successfully");
        })
        .catch((err) => {
          console.error("❌ Progress save failed:", err);
        });
    },
    [lessonId],
  );

  // 3) إطلاق الإكمال
  const triggerCompletion = useCallback(() => {
    if (completionFiredRef.current) return;
    completionFiredRef.current = true;
    setIsCompleted(true);
    console.log("🎉 Video completed!");

    onVideoCompletedRef.current?.();

    apiClient.post(endpoints.video.complete(lessonId)).catch((err) => {
      console.error("❌ Complete failed:", err);
    });
  }, [lessonId]);

  // 4) handleReady — يبدأ الـ interval فقط (بدون resume)
  const handleReady = useCallback(
    (video: HTMLVideoElement) => {
      console.log("✅ handleReady called — starting progress interval");

      // ★ تم نقل كود تطبيق الـ resume إلى VideoPlayer.tsx
      // ★ (useEffect منفصل يراقب resumeLoaded + resumePosition)

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

        if (
          !completionFiredRef.current &&
          currentTime / duration >= COMPLETION_THRESHOLD
        ) {
          triggerCompletion();
        }
      }, PROGRESS_INTERVAL_MS);
    },
    [saveProgress, triggerCompletion], // ★ أزلنا resumeLoaded و resumePosition
  );

  // 5) handleEnded
  const handleEnded = useCallback(() => {
    console.log("🏁 Video ended event");
    triggerCompletion();
  }, [triggerCompletion]);

  // 6) Cleanup
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  // 7) حفظ عند مغادرة الصفحة
  useEffect(() => {
    const saveOnLeave = () => {
      if (lastSavedPositionRef.current > 0) {
        console.log("💾 Saving on leave:", lastSavedPositionRef.current);
        apiClient
          .post(endpoints.video.progress(lessonId), {
            position: lastSavedPositionRef.current,
            watched_seconds: lastSavedPositionRef.current,
          })
          .catch(() => {});
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
    handleEnded,
  };
}
