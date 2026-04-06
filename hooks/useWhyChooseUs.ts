import { useTranslations } from "next-intl";
import { FeatureItem } from "@/types";

export function useWhyChooseUs() {
  const t = useTranslations("Features");

  const features: FeatureItem[] = [
    { title: t("f1_title"), desc: t("f1_desc"), icon: "/images/icons/wrench.png" },
    { title: t("f2_title"), desc: t("f2_desc"), icon: "/images/icons/user.png" },
    { title: t("f3_title"), desc: t("f3_desc"), icon: "/images/icons/clipboardList.png" },
    { title: t("f4_title"), desc: t("f4_desc"), icon: "/images/icons/verified.png" },
    { title: t("f5_title"), desc: t("f5_desc"), icon: "/images/icons/power.png" },
    { title: t("f6_title"), desc: t("f6_desc"), icon: "/images/icons/briefcase.png" },
  ];

  return { features };
}
