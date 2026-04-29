"use client";

import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { useHero } from "@/hooks/useHero";
import { HeroStats } from "./HeroStats";

export function HeroSection() {
  const { heroData, heroStats } = useHero();
  return (
    <section
      id="home"
      className="relative 
      pt-8 pb-36 
      md:pt-16 md:pb-60 
      mb-10 lg:mb-20
      overflow-visible"
    >
      <div className="absolute inset-0 z-0">
        <picture>
          {/* Desktop */}
          <source
            media="(min-width: 1024px)"
            srcSet="/images/heroSectionBG.webp"
          />

          {/* Tablet */}
          <source
            media="(min-width: 768px)"
            srcSet="/images/heroSectionBGTablet.webp"
          />

          {/* Mobile (fallback) */}
          <img
            src="/images/heroSectionBGMobilePic.webp"
            alt="Hero Background"
            fetchPriority="high"
            className="w-full h-full object-cover object-center"
          />
        </picture>
      </div>

      <div className="container relative z-10 px-5 lg:px-10">
        <div className="max-w-[900px]">
          {/* Text Content */}
          <div className="flex flex-col justify-center space-y-6">
            <h1
              className="text-3xl font-bold tracking-tight 
              md:text-5xl lg:text-6xl text-balance
              leading-[50px] md:leading-[70px] lg:leading-[90px]"
            >
              {heroData.titleStart}
              <br className="block" />
              <span className="text-brand-primary">
                {heroData.brandName}
              </span>
            </h1>

            <p
              className="md:w-96 lg:w-full max-w-[610px] text-brand-muted 
              md:text-lg xl:text-xl leading-relaxed"
            >
              {heroData.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link href="/register" aria-label="register now">
                <Button
                  className="bg-brand-primary hover:bg-brand-dark
                  text-white font-semibold h-[60px] text-base lg:text-lg 
                  rounded-lg transition-all shadow-md hover:shadow-lg
                  w-full sm:w-[180px] lg:w-[205px] cursor-pointer"
                >
                  {heroData.registerButton}
                </Button>
              </Link>

              <Link href="/#program" aria-label="learn more">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 
                  border-[#CBD5E1] text-[#0F172A]
                  hover:text-[#0F172A] hover:bg-brand-surface 
                  h-[60px] text-base lg:text-lg rounded-lg transition-all
                  w-full sm:w-[180px] lg:w-[205px] gap-2 cursor-pointer"
                >
                  {heroData.learnMore}
                  <PlayCircle className="size-6 rotate-180" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Hero Stats */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 z-30">
        <HeroStats stats={heroStats} />
      </div>
    </section>
  );
}