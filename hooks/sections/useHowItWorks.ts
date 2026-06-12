import { useTranslations } from "next-intl";
import { StepItem } from "@/types";

export function useHowItWorks() {
  const t = useTranslations("HowItWorks");

  const steps: StepItem[] = [
    {
      number: "01",
      title: t("step1_title"),
      desc: t("step1_desc"),
      icon: "/images/icons/userPlus.png",
    },
    {
      number: "02",
      title: t("step2_title"),
      desc: t("step2_desc"),
      icon: "/images/icons/registerForTheProgram.png",
    },
    {
      number: "03",
      title: t("step3_title"),
      desc: t("step3_desc"),
      icon: "/images/icons/learnAndApply.png",
    },
    {
      number: "04",
      title: t("step4_title"),
      desc: t("step4_desc"),
      icon: "/images/icons/certificate.png",
    },
  ];

  return { steps };
}
