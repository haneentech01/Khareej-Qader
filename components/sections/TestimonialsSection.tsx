"use client";

import { useTranslations, useLocale } from "next-intl";
import { SectionHeader } from "../ui/SectionHeader";
import Image from "next/image";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CarouselDots } from "../ui/carousel-dots";

const MOCK_TESTIMONIALS = [1, 2, 3]; // Used to generate multiple slides

export function TestimonialsSection() {
  const t = useTranslations("Testimonials");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <section id="success-stories" className="py-20 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader namespace="Testimonials" />

        <div className="max-w-7xl mx-auto mt-16 md:mt-24 relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              direction: isRTL ? "rtl" : "ltr",
            }}
            className="w-full"
          >
            {/* Fix RTL/LTR Margin Offset */}
            <CarouselContent className={isRTL ? "ml-0 -mr-4" : "mr-0 -ml-4"}>
              {MOCK_TESTIMONIALS.map((_, index) => (
                <CarouselItem key={index} className={isRTL ? "pl-0 pr-4" : "pr-0 pl-4"}>
                  {/* Testimonial Layout Container */}
                  <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-[18px] px-2 md:px-12 lg:px-16 pb-8">

                    {/* Right: Premium Quote Card */}
                    <div className="w-full lg:w-2/3 xl:w-1/2 z-10">
                      <motion.div
                        initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-[20px] 
                        p-8 md:p-[46px] md:py-16 shadow-[0_20px_70px_rgba(0,0,0,0.07)] 
                        border border-slate-50 relative"
                      >
                        {/* Quote Icon */}
                        <div className="flex justify-start mb-5">
                          <Image
                            width="45"
                            height="35"
                            src="/images/quote.png"
                            alt="Quote"
                          />
                        </div>

                        {/* Star Rating */}
                        <div className="flex gap-1 mb-5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="size-5 md:size-6 fill-[#ffce00] text-[#ffce00]" />
                          ))}
                        </div>

                        {/* Quote Text */}
                        <blockquote className="mb-[73px] text-start">
                          <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#1B1C31] leading-[1.6] md:leading-[1.4]">
                            "{t("quote1")}"
                          </p>
                        </blockquote>

                        {/* Author Section */}
                        <div className="flex flex-col md:flex-row md:items-center lg:items-start gap-8">
                          <div className="flex flex-col gap-1 text-start">
                            <h4 className="text-lg md:text-xl font-black text-black">{t("name1")}</h4>
                            <p className="text-brand-muted text-base font-medium">{t("role1")}</p>
                          </div>

                          {/* Status Badge */}
                          <div className="flex items-center gap-2 bg-[#34B89814] px-4 py-2 lg:px-2 lg:py-3 xl:px-4 xl:py-2 rounded-full border border-[#28bca1]/10">
                            <Image
                              width="12"
                              height="12"
                              src="/images/icons/star.png"
                              alt="Status"
                            />
                            <span className="text-[#28bca1] font-bold text-sm md:text-base lg:text-sm xl:text-base">
                              {t("badge1")}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Left: Person Container */}
                    <div className="relative w-full h-[406px] lg:w-1/2 lg:h-[606px] max-w-[510px]">
                      <div className="w-full h-full">
                        <Image
                          src="/images/personsImages.png"
                          alt="Student Image"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>

                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Nav Arrows inside the Carousel container */}
            <CarouselPrevious className={`hidden md:flex size-14 
              bg-white shadow-xl hover:text-brand-primary 
              active:scale-95 absolute top-1/2 -translate-y-1/2 left-auto 
              right-auto 
              ${isRTL
                ? "-right-5 xl:-right-2"
                : "-left-5 xl:-left-12"
              }`} />
            <CarouselNext className={`hidden md:flex size-14 
            bg-white shadow-xl hover:text-brand-primary 
            active:scale-95 absolute top-1/2 -translate-y-1/2 left-auto 
            right-auto 
            ${isRTL
                ? "-left-5 xl:left-14"
                : "-right-5 xl:-right-12"
              }`} />

            <CarouselDots className="mt-4" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
