"use client";

import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { useHero } from "@/hooks/useHero";
import { HeroStats } from "./HeroStats";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function HeroSection() {
  const { heroData, heroStats } = useHero();
  const { ref, controls, variants } = useScrollAnimation({ delay: 0.1 });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="relative 
      bg-[url('/images/heroSectionBGMobilePic.png')]
      md:bg-[url('/images/heroSectionBGTablet.png')] 
      lg:bg-[url('/images/heroSectionBG.png')] 
      pt-8 pb-36 md:pt-16 md:pb-60 xl:pt-24 xl:pb-60 
      bg-cover bg-center overflow-visible"
    >
      <div className="container mx-auto px-5 md:px-10">
        <div className="max-w-[900px]">
          {/* Text Content */}
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tight 
            md:text-6xl lg:text-[70px] text-balance
            leading-[55px] md:leading-[90px] lg:leading-[100px]">
              {heroData.titleStart} <br className="hidden sm:block" />
              <span className="text-brand-primary">{heroData.brandName}</span>
            </h1>

            <p className="md:w-96 lg:w-full max-w-[610px] text-lg text-brand-muted 
            md:text-xl xl:text-2xl leading-relaxed">
              {heroData.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                className="bg-brand-primary hover:bg-brand-dark
               text-white font-semibold h-[60px] text-base lg:text-lg 
               rounded-lg transition-all shadow-md hover:shadow-lg
               w-full sm:w-[180px] lg:w-[205px]">
                {heroData.registerButton}
              </Button>

              <Button size="lg" variant="outline" className="border-2 
              border-[#CBD5E1] text-[#0F172A]
              hover:text-[#0F172A] hover:bg-brand-surface 
              h-[60px] text-base lg:text-lg rounded-lg transition-all
              w-full sm:w-[180px] lg:w-[205px] gap-2">
                {heroData.learnMore}
                <PlayCircle className="size-6 rotate-180" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Hero Stats */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 z-30">
        <HeroStats stats={heroStats} />
      </div>
    </motion.section>
  );
}
