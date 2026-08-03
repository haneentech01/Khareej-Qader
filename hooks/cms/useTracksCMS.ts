"use client";

import { useState, useEffect, useCallback } from "react";
import { TrackCMSItem } from "@/types/landing-cms";
import { cmsStorage, CMS_UPDATE_EVENT } from "@/lib/storage/landing-cms-storage";

export function useTracksCMS() {
  const [tracks, setTracks] = useState<TrackCMSItem[]>([]);
  const [search, setSearch] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const loadTracks = useCallback(() => {
    const data = cmsStorage.getTracks();
    setTracks(data);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    loadTracks();

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ section: string }>;
      if (!customEvent.detail || customEvent.detail.section === "tracks") {
        loadTracks();
      }
    };

    window.addEventListener(CMS_UPDATE_EVENT, handleUpdate);
    window.addEventListener("storage", loadTracks);

    return () => {
      window.removeEventListener(CMS_UPDATE_EVENT, handleUpdate);
      window.removeEventListener("storage", loadTracks);
    };
  }, [loadTracks]);

  const addTrack = useCallback(
    (item: Omit<TrackCMSItem, "id" | "createdAt">) => {
      const newItem: TrackCMSItem = {
        ...item,
        id: `track-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      const updated = [newItem, ...tracks];
      cmsStorage.saveTracks(updated);
      setTracks(updated);
    },
    [tracks]
  );

  const updateTrack = useCallback(
    (id: string, updatedFields: Partial<Omit<TrackCMSItem, "id" | "createdAt">>) => {
      const updated = tracks.map((t) =>
        t.id === id ? { ...t, ...updatedFields } : t
      );
      cmsStorage.saveTracks(updated);
      setTracks(updated);
    },
    [tracks]
  );

  const deleteTrack = useCallback(
    (id: string) => {
      const updated = tracks.filter((t) => t.id !== id);
      cmsStorage.saveTracks(updated);
      setTracks(updated);
    },
    [tracks]
  );

  const resetTracks = useCallback(() => {
    const defaultData = cmsStorage.resetTracks();
    setTracks(defaultData);
  }, []);

  const filteredTracks = tracks.filter(
    (track) =>
      track.name.toLowerCase().includes(search.toLowerCase()) ||
      track.desc.toLowerCase().includes(search.toLowerCase())
  );

  return {
    tracks: filteredTracks,
    allTracksCount: tracks.length,
    search,
    setSearch,
    isLoaded,
    addTrack,
    updateTrack,
    deleteTrack,
    resetTracks,
    refresh: loadTracks,
  };
}
