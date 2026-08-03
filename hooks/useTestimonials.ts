import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { TestimonialItem } from "@/types";
import { useTestimonialsCMS } from "@/hooks/cms/useTestimonialsCMS";

export function useTestimonials() {
  const t = useTranslations("Testimonials");
  const { testimonials: cmsTestimonials } = useTestimonialsCMS();

  const testimonials: TestimonialItem[] = useMemo(() => {
    if (cmsTestimonials && cmsTestimonials.length > 0) {
      return cmsTestimonials.map((item) => ({
        id: item.id,
        name: item.name,
        role: item.role,
        quote: item.quote,
        badge: item.badge || t("badge1"),
        image: item.image || "/images/personsImages.png",
        rating: item.rating || 5,
      }));
    }

    return [
      {
        id: 1,
        quote: t("quote1"),
        name: t("name1"),
        role: t("role1"),
        badge: t("badge1"),
        image: "/images/personsImages.png",
        rating: 5,
      },
    ];
  }, [cmsTestimonials, t]);

  return { testimonials };
}
