// "use client";

// import { useGetData } from "@/lib/hooks/useGetData";
// import endpoints from "@/lib/api/endpoints";
// import { StudentPathData } from "@/types";

// export function useStudentPath() {
//   const { data, loading, error, refetch } = useGetData<StudentPathData>(
//     endpoints.student.studentPath,
//     { immediate: true },
//   );

//   return { data, loading, error, refetch };
// }

// hooks/dashboard/useStudentPath.ts
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import apiClient from "@/lib/api/client";
import endpoints from "@/lib/api/endpoints";
import { ApiResponse, StudentPathData } from "@/types";

export function useStudentPath() {
  const [data, setData] = useState<StudentPathData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // لمنع race conditions
  const fetchIdRef = useRef(0);

  const fetchPath = useCallback(async () => {
    const currentFetchId = ++fetchIdRef.current;

    try {
      const res = await apiClient.get<ApiResponse<StudentPathData>>(
        endpoints.student.studentPath,
      );

      // تجاهل response قديم لو صار fetch جديد
      if (currentFetchId !== fetchIdRef.current) return;

      if (res.data?.success && res.data.data) {
        setData(res.data.data);
        setError(null);
      } else {
        setError("Failed to load path data");
      }
    } catch (err: unknown) {
      if (currentFetchId !== fetchIdRef.current) return;
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      if (currentFetchId === fetchIdRef.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchPath();
  }, [fetchPath]);

  // ★ تحديث optimistic محلي — بدون انتظار الباك
  const markVideoCompleted = useCallback((videoId: string | number) => {
    setData((prev) => {
      if (!prev) return prev;

      const numericId = Number(videoId);
      const updatedVideos = prev.videos.map((v) =>
        v.id === numericId ? { ...v, completed: true } : v,
      );

      // حساب التقدم الجديد
      const completedCount = updatedVideos.filter((v) => v.completed).length;

      // إيجاد أول فيديو غير مكتمل ليصبح current
      const nextCurrent = updatedVideos.find((v) => !v.completed);

      // ✅ الصحيح
      const markVideoCompleted = useCallback((videoId: string | number) => {
        setData((prev) => {
          if (!prev) return prev;

          const numericId = Number(videoId);

          // إيجاد index الفيديو الحالي
          const currentIndex = prev.videos.findIndex((v) => v.id === numericId);

          const updatedVideos = prev.videos.map((v) =>
            v.id === numericId ? { ...v, completed: true } : v,
          );

          const completedCount = updatedVideos.filter(
            (v) => v.completed,
          ).length;

          // الفيديو التالي مباشرة بعد الذي اكتمل
          const nextVideo = updatedVideos[currentIndex + 1];

          return {
            ...prev,
            videos: updatedVideos,
            progress: {
              ...prev.progress,
              completed: completedCount,
              percentage: Math.round(
                (completedCount / updatedVideos.length) * 100,
              ),
            },
            // إذا في تالي، اجعله current، وإلا ابقَ على الحالي
            current_video: nextVideo
              ? {
                  index: nextVideo.index,
                  id: nextVideo.id,
                  title: nextVideo.title,
                }
              : prev.current_video,
          };
        });
      }, []);

      return {
        ...prev,
        videos: updatedVideos,
        progress: {
          ...prev.progress,
          completed: completedCount,
          percentage: Math.round((completedCount / updatedVideos.length) * 100),
        },
        current_video: nextCurrent
          ? {
              index: nextCurrent.index,
              id: nextCurrent.id,
              title: nextCurrent.title,
            }
          : prev.current_video,
      };
    });
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchPath,
    markVideoCompleted,
  };
}
