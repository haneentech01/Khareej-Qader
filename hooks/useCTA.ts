import { useTranslations } from "next-intl";
import { CtaData } from "@/types";

export function useCTA(): CtaData {
  const t = useTranslations("CTA");
  return {
    title: t("title"),
    subtitle: t("subtitle"),
    buttonText: t("button"),
  };
}
