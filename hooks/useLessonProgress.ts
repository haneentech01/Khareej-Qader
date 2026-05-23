"use client";

import { useEffect, useRef, useState } from "react";

interface UseLessonProgressProps {
  lessonId: string;
}

export function useLessonProgress({ lessonId }: UseLessonProgressProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [playing, setPlaying] = useState(false);

  // المفاتيح الخاصة بـ LocalStorage
  const progressKey = `lesson-progress-${lessonId}`;
  const completedKey = `lesson-completed-${lessonId}`;

  useEffect(() => {
    // التحقق من حالة الإكمال عند التحميل
    if (typeof window === "undefined") return;
    const savedCompleted = localStorage.getItem(completedKey);

    if (savedCompleted === "true") {
      setTimeout(() => setIsCompleted(true), 0);
    }

    // استعادة وقت المشاهدة الأخير
    const savedTime = localStorage.getItem(progressKey);
    if (savedTime && videoRef.current) {
      videoRef.current.currentTime = parseFloat(savedTime);
    }
  }, [lessonId, progressKey, completedKey]);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;

    const currentTime = videoRef.current.currentTime;
    const duration = videoRef.current.duration;

    if (duration > 0) {
      const percentage = (currentTime / duration) * 100;

      // حفظ التقدم الحالي
      localStorage.setItem(progressKey, currentTime.toString());

      // تعليم الدرس كمكتمل إذا تجاوز 95%
      if (percentage >= 95 && !isCompleted) {
        setIsCompleted(true);
        localStorage.setItem(completedKey, "true");
        console.log("Lesson marked as completed!");
      }
    }
  };

  const handleLoadedMetadata = () => {
    const savedTime = localStorage.getItem(progressKey);
    if (savedTime && videoRef.current) {
      videoRef.current.currentTime = parseFloat(savedTime);
    }
  };

  const togglePlay = (isPlaying: boolean) => {
    setPlaying(isPlaying);
  };

  return {
    videoRef,
    isCompleted,
    playing,
    handleTimeUpdate,
    handleLoadedMetadata,
    togglePlay,
  };
}
