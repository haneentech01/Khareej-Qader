"use client";

import { useCallback, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { FaqItem } from "@/types";

export function useFAQ() {
  const t = useTranslations("FAQ");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = useMemo(
    () => [
      { q: t("q1"), a: t("a1") },
      { q: t("q2"), a: t("a2") },
      { q: t("q3"), a: t("a3") },
    ],
    [t],
  );

  const toggleFAQ = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return { faqs, openIndex, toggleFAQ };
}
