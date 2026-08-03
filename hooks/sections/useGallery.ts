import { useState, useEffect, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { GalleryItem } from "@/types";
import { useGalleryCMS } from "@/hooks/cms/useGalleryCMS";

/** Returns the number of grid columns based on current viewport width */
function getColumns(width: number): number {
  if (width >= 1280) return 4; // xl
  if (width >= 768) return 3; // md, lg
  return 2; // sm
}

export function useGallery() {
  const t = useTranslations("Gallery");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [cols, setCols] = useState(4);
  const { gallery: cmsGallery } = useGalleryCMS();

  useEffect(() => {
    const update = () => setCols(getColumns(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const galleryImages: GalleryItem[] = useMemo(() => {
    if (cmsGallery && cmsGallery.length > 0) {
      return cmsGallery.map((item) => ({
        id: item.id,
        image: item.image || "/images/logo.png",
        title: item.title,
      }));
    }

    return Array.from({ length: 8 }).map((_, i) => ({
      id: i + 1,
      image: "/images/logo.png",
      title: t("image_title"),
    }));
  }, [cmsGallery, t]);

  // Break total images into chunks to populate a full slide page
  const itemsPerPage = cols * 2;
  const chunkedPages = [];
  for (let i = 0; i < galleryImages.length; i += itemsPerPage) {
    chunkedPages.push(galleryImages.slice(i, i + itemsPerPage));
  }

  return { chunkedPages, cols, isRTL };
}
