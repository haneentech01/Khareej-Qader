import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { NewsItem, NewsLabels } from "@/types";

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

  const labels: NewsLabels = {
    smallSubtitle: t("smallSubtitle"),
    viewAll: t("view_all"),
    readMore: t("read_more"),
  };

  return { newsItems, labels };
}
