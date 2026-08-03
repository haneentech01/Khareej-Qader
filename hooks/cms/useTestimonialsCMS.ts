"use client";

import { useState, useEffect, useCallback } from "react";
import { TestimonialCMSItem } from "@/types/landing-cms";
import { cmsStorage, CMS_UPDATE_EVENT } from "@/lib/storage/landing-cms-storage";

export function useTestimonialsCMS() {
  const [testimonials, setTestimonials] = useState<TestimonialCMSItem[]>([]);
  const [search, setSearch] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const loadTestimonials = useCallback(() => {
    const data = cmsStorage.getTestimonials();
    setTestimonials(data);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    loadTestimonials();

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ section: string }>;
      if (!customEvent.detail || customEvent.detail.section === "testimonials") {
        loadTestimonials();
      }
    };

    window.addEventListener(CMS_UPDATE_EVENT, handleUpdate);
    window.addEventListener("storage", loadTestimonials);

    return () => {
      window.removeEventListener(CMS_UPDATE_EVENT, handleUpdate);
      window.removeEventListener("storage", loadTestimonials);
    };
  }, [loadTestimonials]);

  const addTestimonial = useCallback(
    (item: Omit<TestimonialCMSItem, "id" | "createdAt">) => {
      const newItem: TestimonialCMSItem = {
        ...item,
        id: `testimonial-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      const updated = [newItem, ...testimonials];
      cmsStorage.saveTestimonials(updated);
      setTestimonials(updated);
    },
    [testimonials]
  );

  const updateTestimonial = useCallback(
    (
      id: string,
      updatedFields: Partial<Omit<TestimonialCMSItem, "id" | "createdAt">>
    ) => {
      const updated = testimonials.map((t) =>
        t.id === id ? { ...t, ...updatedFields } : t
      );
      cmsStorage.saveTestimonials(updated);
      setTestimonials(updated);
    },
    [testimonials]
  );

  const deleteTestimonial = useCallback(
    (id: string) => {
      const updated = testimonials.filter((t) => t.id !== id);
      cmsStorage.saveTestimonials(updated);
      setTestimonials(updated);
    },
    [testimonials]
  );

  const resetTestimonials = useCallback(() => {
    const defaultData = cmsStorage.resetTestimonials();
    setTestimonials(defaultData);
  }, []);

  const filteredTestimonials = testimonials.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.role.toLowerCase().includes(search.toLowerCase()) ||
      t.quote.toLowerCase().includes(search.toLowerCase())
  );

  return {
    testimonials: filteredTestimonials,
    allTestimonialsCount: testimonials.length,
    search,
    setSearch,
    isLoaded,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    resetTestimonials,
    refresh: loadTestimonials,
  };
}
