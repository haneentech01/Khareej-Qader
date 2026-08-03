"use client";

import { useState, useEffect, useCallback } from "react";
import { GalleryCMSItem } from "@/types/landing-cms";
import { cmsStorage, CMS_UPDATE_EVENT } from "@/lib/storage/landing-cms-storage";

export function useGalleryCMS() {
  const [gallery, setGallery] = useState<GalleryCMSItem[]>([]);
  const [search, setSearch] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const loadGallery = useCallback(() => {
    const data = cmsStorage.getGallery();
    setGallery(data);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    loadGallery();

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ section: string }>;
      if (!customEvent.detail || customEvent.detail.section === "gallery") {
        loadGallery();
      }
    };

    window.addEventListener(CMS_UPDATE_EVENT, handleUpdate);
    window.addEventListener("storage", loadGallery);

    return () => {
      window.removeEventListener(CMS_UPDATE_EVENT, handleUpdate);
      window.removeEventListener("storage", loadGallery);
    };
  }, [loadGallery]);

  const addGalleryItem = useCallback(
    (item: Omit<GalleryCMSItem, "id" | "createdAt">) => {
      const newItem: GalleryCMSItem = {
        ...item,
        id: `gallery-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      const updated = [newItem, ...gallery];
      cmsStorage.saveGallery(updated);
      setGallery(updated);
    },
    [gallery]
  );

  const updateGalleryItem = useCallback(
    (id: string, updatedFields: Partial<Omit<GalleryCMSItem, "id" | "createdAt">>) => {
      const updated = gallery.map((g) =>
        g.id === id ? { ...g, ...updatedFields } : g
      );
      cmsStorage.saveGallery(updated);
      setGallery(updated);
    },
    [gallery]
  );

  const deleteGalleryItem = useCallback(
    (id: string) => {
      const updated = gallery.filter((g) => g.id !== id);
      cmsStorage.saveGallery(updated);
      setGallery(updated);
    },
    [gallery]
  );

  const resetGallery = useCallback(() => {
    const defaultData = cmsStorage.resetGallery();
    setGallery(defaultData);
  }, []);

  const filteredGallery = gallery.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return {
    gallery: filteredGallery,
    allGalleryCount: gallery.length,
    search,
    setSearch,
    isLoaded,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    resetGallery,
    refresh: loadGallery,
  };
}
