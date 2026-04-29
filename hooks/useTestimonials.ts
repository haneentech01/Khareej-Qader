import { useTranslations } from "next-intl";
import { TestimonialItem } from "@/types";

export function useTestimonials() {
  const t = useTranslations("Testimonials");

  const testimonials: TestimonialItem[] = [
    {
      id: 1,
      quote: t("quote1"),
      name: t("name1"),
      role: t("role1"),
      badge: t("badge1"),
      image: "/images/personsImages.png",
      rating: 5,
    },
    {
      id: 2,
      quote: t("quote1"),
      name: t("name1"),
      role: t("role1"),
      badge: t("badge1"),
      image: "/images/personsImages.png",
      rating: 5,
    },
    {
      id: 3,
      quote: t("quote1"),
      name: t("name1"),
      role: t("role1"),
      badge: t("badge1"),
      image: "/images/personsImages.png",
      rating: 5,
    },
  ];

  return { testimonials };
}
