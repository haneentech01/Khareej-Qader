"use client";

import { useState, useEffect, useCallback } from "react";
import { PartnerCMSItem } from "@/types/landing-cms";
import { cmsStorage, CMS_UPDATE_EVENT } from "@/lib/storage/landing-cms-storage";

export function usePartnersCMS() {
  const [partners, setPartners] = useState<PartnerCMSItem[]>([]);
  const [search, setSearch] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const loadPartners = useCallback(() => {
    const data = cmsStorage.getPartners();
    setPartners(data);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    loadPartners();

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ section: string }>;
      if (!customEvent.detail || customEvent.detail.section === "partners") {
        loadPartners();
      }
    };

    window.addEventListener(CMS_UPDATE_EVENT, handleUpdate);
    window.addEventListener("storage", loadPartners);

    return () => {
      window.removeEventListener(CMS_UPDATE_EVENT, handleUpdate);
      window.removeEventListener("storage", loadPartners);
    };
  }, [loadPartners]);

  const addPartner = useCallback(
    (item: Omit<PartnerCMSItem, "id" | "createdAt">) => {
      const newItem: PartnerCMSItem = {
        ...item,
        id: `partner-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      const updated = [newItem, ...partners];
      cmsStorage.savePartners(updated);
      setPartners(updated);
    },
    [partners]
  );

  const updatePartner = useCallback(
    (id: string, updatedFields: Partial<Omit<PartnerCMSItem, "id" | "createdAt">>) => {
      const updated = partners.map((p) =>
        p.id === id ? { ...p, ...updatedFields } : p
      );
      cmsStorage.savePartners(updated);
      setPartners(updated);
    },
    [partners]
  );

  const deletePartner = useCallback(
    (id: string) => {
      const updated = partners.filter((p) => p.id !== id);
      cmsStorage.savePartners(updated);
      setPartners(updated);
    },
    [partners]
  );

  const resetPartners = useCallback(() => {
    const defaultData = cmsStorage.resetPartners();
    setPartners(defaultData);
  }, []);

  const filteredPartners = partners.filter((partner) =>
    partner.name.toLowerCase().includes(search.toLowerCase())
  );

  return {
    partners: filteredPartners,
    allPartnersCount: partners.length,
    search,
    setSearch,
    isLoaded,
    addPartner,
    updatePartner,
    deletePartner,
    resetPartners,
    refresh: loadPartners,
  };
}
