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

// "use client";

// import { useCallback, useEffect, useRef, useState } from "react";
// import apiClient from "@/lib/api/client";
// import endpoints from "@/lib/api/endpoints";
// import { ApiResponse, StudentPathData } from "@/types";

// // ★ دالة مستقلة - تحسب current_video الصحيح
// export function computeCurrentVideo(rawData: StudentPathData): StudentPathData {
//   const videos = rawData.videos ?? [];
//   const firstIncomplete = videos.find((v) => !v.completed);

//   if (!firstIncomplete) {
//     const last = videos[videos.length - 1];
//     return {
//       ...rawData,
//       current_video: last
//         ? { index: last.index, id: last.id, title: last.title }
//         : rawData.current_video,
//     };
//   }

//   return {
//     ...rawData,
//     current_video: {
//       index: firstIncomplete.index,
//       id: firstIncomplete.id,
//       title: firstIncomplete.title,
//     },
//   };
// }

// export function useStudentPath() {
//   const [data, setData] = useState<StudentPathData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const fetchIdRef = useRef(0);
//   console.log("🪝 useStudentPath mounted");

//   const fetchPath = useCallback(async () => {
//     const currentFetchId = ++fetchIdRef.current;
//     console.log("📡 fetchPath started, id:", currentFetchId); // ★
//     try {
//       const res = await apiClient.get<ApiResponse<StudentPathData>>(
//         endpoints.student.studentPath,
//       );
//       console.log("📥 fetchPath response:", res.data); // ★

//       if (currentFetchId !== fetchIdRef.current) return;
//       if (res.data?.success && res.data.data) {
//         setData(computeCurrentVideo(res.data.data));
//         setError(null);
//         console.log("✅ useStudentPath: data set successfully"); // ★
//       } else {
//         setError("Failed to load path data");
//         console.warn("⚠️ useStudentPath: success=false or no data"); // ★
//       }
//     } catch (err: unknown) {
//       console.error("❌ useStudentPath error:", err); // ★
//       if (currentFetchId !== fetchIdRef.current) return;
//       setError(err instanceof Error ? err.message : "Unknown error");
//     } finally {
//       if (currentFetchId === fetchIdRef.current) setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchPath();
//   }, [fetchPath]);

//   const markVideoCompleted = useCallback((videoId: string | number) => {
//     setData((prev) => {
//       if (!prev) return prev;
//       const numericId = Number(videoId);
//       const currentIndex = prev.videos.findIndex((v) => v.id === numericId);
//       if (currentIndex === -1) return prev;

//       const updatedVideos = prev.videos.map((v) =>
//         v.id === numericId ? { ...v, completed: true } : v,
//       );
//       const completedCount = updatedVideos.filter((v) => v.completed).length;

//       return computeCurrentVideo({
//         ...prev,
//         videos: updatedVideos,
//         progress: {
//           ...prev.progress,
//           completed: completedCount,
//           percentage: Math.round((completedCount / updatedVideos.length) * 100),
//         },
//       });
//     });
//   }, []);

//   return { data, loading, error, refetch: fetchPath, markVideoCompleted };
// }

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useGetData } from "@/lib/hooks/useGetData";
import endpoints from "@/lib/api/endpoints";
import { StudentPathData } from "@/types";

/**
 * تحسب الفيديو الحالي الصحيح (أول فيديو غير مكتمل).
 * Pure function — لا تتعامل مع state.
 */
export function computeCurrentVideo(rawData: StudentPathData): StudentPathData {
  const videos = rawData.videos ?? [];
  const firstIncomplete = videos.find((v) => !v.completed);

  if (!firstIncomplete) {
    const last = videos[videos.length - 1];
    return {
      ...rawData,
      current_video: last
        ? { index: last.index, id: last.id, title: last.title }
        : rawData.current_video,
    };
  }

  return {
    ...rawData,
    current_video: {
      index: firstIncomplete.index,
      id: firstIncomplete.id,
      title: firstIncomplete.title,
    },
  };
}

/**
 * Hook يجلب بيانات المسار التدريبي للطالب.
 * يبني فوق useGetData ويضيف:
 * - تحويل البيانات عبر computeCurrentVideo
 * - تحديث optimistic عند إكمال فيديو
 */
export function useStudentPath() {
  const {
    data: serverData,
    loading,
    error,
    refetch,
  } = useGetData<StudentPathData>(endpoints.student.studentPath);

  // ─── Optimistic overlay للتحديثات المحلية ────────
  const [optimisticData, setOptimisticData] = useState<StudentPathData | null>(
    null,
  );

  // لما البيانات تجي من السيرفر → نمسح الـ optimistic overlay
  useEffect(() => {
    if (serverData) {
      setOptimisticData(null);
    }
  }, [serverData]);

  // نحوّل البيانات (سواء من السيرفر أو optimistic)
  const data = useMemo(() => {
    const source = optimisticData ?? serverData;
    return source ? computeCurrentVideo(source) : null;
  }, [serverData, optimisticData]);

  // ─── تحديث محلي عند إكمال فيديو ─────────────────
  const markVideoCompleted = useCallback(
    (videoId: string | number) => {
      const base = optimisticData ?? serverData;
      if (!base) return;

      const numericId = Number(videoId);
      const updatedVideos = base.videos.map((v) =>
        v.id === numericId ? { ...v, completed: true } : v,
      );
      const completedCount = updatedVideos.filter((v) => v.completed).length;

      setOptimisticData({
        ...base,
        videos: updatedVideos,
        progress: {
          ...base.progress,
          completed: completedCount,
          percentage: Math.round((completedCount / updatedVideos.length) * 100),
        },
      });
    },
    [optimisticData, serverData],
  );

  return { data, loading, error, refetch, markVideoCompleted };
}
