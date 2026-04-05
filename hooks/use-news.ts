import { useTranslations } from "next-intl";
import { useMemo } from "react";

export interface NewsItem {
  date: string;
  title: string;
  description: string;
}

/**
 * useNews Hook
 * 
 * Separates data and translation logic from the UI components.
 * Provides localized news items and common labels for the News section.
 */
export function useNews() {
  const t = useTranslations("News");

  const newsItems: NewsItem[] = useMemo(() => [
    {
      date: t("news1_date"),
      title: t("news1_title"),
      description: t("news1_desc"),
    },
    {
      date: t("news2_date"),
      title: t("news2_title"),
      description: t("news2_desc"),
    },
    {
      date: t("news3_date"),
      title: t("news3_title"),
      description: t("news3_desc"),
    }
  ], [t]);

  return {
    newsItems,
    labels: {
      smallSubtitle: t("smallSubtitle"),
      viewAll: t("view_all"),
      readMore: t("read_more"),
    }
  };
}
