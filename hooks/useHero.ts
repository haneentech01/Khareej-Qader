import { useTranslations } from "next-intl";
import { HeroData, HeroStatItem } from "@/types";

export function useHero() {
  const tHero = useTranslations("HeroSection");
  const tStats = useTranslations("HeroStats");

  const heroData: HeroData = {
    titleStart: tHero("title_start"),
    brandName: tHero("brand_name"),
    description: tHero("description"),
    registerButton: tHero("register_button"),
    learnMore: tHero("learn_more"),
  };

  const heroStats: HeroStatItem[] = [
    {
      key: "students",
      count: tStats("students_count"),
      label: tStats("students"),
      images: "/images/icons/users.png",
    },
    {
      key: "graduates",
      count: tStats("graduates_count"),
      label: tStats("graduates"),
      images: "/images/icons/graduation.png",
    },
    {
      key: "projects",
      count: tStats("projects_count"),
      label: tStats("projects"),
      images: "/images/icons/features.png",
    },
    {
      key: "trainers",
      count: tStats("trainers_count"),
      label: tStats("trainers"),
      images: "/images/icons/vector.png",
    },
  ];

  return { heroData, heroStats };
}
