"use client";

import { useState, useCallback } from "react";

export function useVideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = useCallback(() => {
    // In the future, this would trigger a modal or start video playback.
    // For now, we'll just toggle state or log to console.
    console.log("Video Play triggered");
    setIsPlaying(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsPlaying(false);
  }, []);

  return {
    isPlaying,
    handlePlay,
    handleClose,
  };
}
