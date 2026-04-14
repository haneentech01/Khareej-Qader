import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { GalleryItem } from "@/types";

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

  useEffect(() => {
    const update = () => setCols(getColumns(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Create the structured array of generic images for the gallery
  const GALLERY_IMAGES: GalleryItem[] = Array.from({ length: 8 }).map(
    (_, i) => ({
      id: i + 1,
      image: "/images/logo.png",
      title: t("image_title"),
    }),
  );

  // Break total images into chunks to populate a full slide page
  // Usually 2 rows x N cols per slide
  const itemsPerPage = cols * 2;
  const chunkedPages = [];
  for (let i = 0; i < GALLERY_IMAGES.length; i += itemsPerPage) {
    chunkedPages.push(GALLERY_IMAGES.slice(i, i + itemsPerPage));
  }

  return { chunkedPages, cols, isRTL };
}
