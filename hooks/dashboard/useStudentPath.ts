"use client";

import { useCallback, useMemo, useState } from "react";
import { useGetData } from "@/lib/hooks/useGetData";
import endpoints from "@/lib/api/endpoints";
import { StudentPathData } from "@/types";

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

export function useStudentPath() {
  const {
    data: serverData,
    loading,
    error,
    refetch,
  } = useGetData<StudentPathData>(
    ["studentPath"],
    endpoints.student.studentPath,
  );

  const [optimisticData, setOptimisticData] = useState<StudentPathData | null>(
    null,
  );

  const [prevServerData, setPrevServerData] = useState<StudentPathData | null | undefined>(
    serverData,
  );

  if (serverData !== prevServerData) {
    setPrevServerData(serverData);
    setOptimisticData(null);
  }

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
