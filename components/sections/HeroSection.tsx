import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { HeroStats } from "./HeroStats";

export function HeroSection() {
  const t = useTranslations("HeroSection");

  return (
    <section className="relative 
    bg-[url('/images/heroSectionBGMobilePic.png')]
    md:bg-[url('/images/heroSectionBGTablet.png')] 
    lg:bg-[url('/images/heroSectionBG.png')] 
    pt-8 pb-36 md:pt-16 md:pb-60 xl:pt-24 xl:pb-60 
    bg-cover bg-center overflow-visible">
      <div className="container mx-auto px-5 md:px-10">
        <div className="max-w-[900px]">
          {/* Text Content */}
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tight 
            md:text-6xl lg:text-[70px] text-balance
            leading-[55px] md:leading-[90px] lg:leading-[100px]">
              {t("title_start")} <br className="hidden sm:block" />
              <span className="text-brand-primary">{t("brand_name")}</span>
            </h1>

            <p className="md:w-96 lg:w-full max-w-[610px] text-lg text-brand-muted 
            md:text-xl xl:text-2xl leading-relaxed">
              {t("description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                className="bg-brand-primary hover:bg-brand-dark
               text-white font-semibold h-[60px] text-base lg:text-lg 
               rounded-lg transition-all shadow-md hover:shadow-lg
               w-full sm:w-[180px] lg:w-[205px]">
                {t("register_button")}
              </Button>

              <Button size="lg" variant="outline" className="border-2 
              border-[#CBD5E1] text-[#0F172A]
              hover:text-[#0F172A] hover:bg-brand-surface 
              h-[60px] text-base lg:text-lg rounded-lg transition-all
              w-full sm:w-[180px] lg:w-[205px] gap-2">
                {t("learn_more")}
                <PlayCircle className="size-6 rotate-180" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Hero Stats */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 z-30">
        <HeroStats />
      </div>
    </section>
  );
}
