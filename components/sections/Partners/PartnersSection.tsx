"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { SectionHeader } from "../../ui/SectionHeader";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/**
 * PartnersSection component that displays an infinite scrolling list of university logos.
 */
export function PartnersSection() {
  const t = useTranslations("Partners");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const { ref, controls, variants } = useScrollAnimation({ once: true, amount: 0.1 });

  const PARTNERS = [
    { id: 1, name: "Al-Azhar University", logo: "/images/partners/AUG.png" },
    { id: 2, name: "Islamic University", logo: "/images/partners/IUG.png" },
    { id: 3, name: "Palestine University", logo: "/images/partners/UP.png" },
    { id: 4, name: "Al-Aqsa University", logo: "/images/partners/AAU.png" },
    { id: 5, name: "Gaza University", logo: "/images/partners/GU.png" },
    { id: 6, name: "University College of Applied Sciences", logo: "/images/partners/UCAS.png" },
  ];

  const duplicatedPartners = [...PARTNERS, ...PARTNERS, ...PARTNERS];

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="my-10 lg:my-20 py-5 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6 mb-12">
        <SectionHeader namespace="Partners" />
      </div>

      <div className="relative flex overflow-hidden group">
        {/* The scrolling container */}
        <motion.div
          className="flex whitespace-nowrap gap-12 items-center"
          animate={{
            x: isRTL ? ["0%", "33.33%"] : ["0%", "-33.33%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="shrink-0 flex items-center justify-center 
              grayscale hover:grayscale-0 transition-all duration-500 
              opacity-60 hover:opacity-100 p-4 shadow-lg bg-slate-50"
            >
              <div className="relative w-32 h-16 md:w-48 md:h-24">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 128px, 192px"
                />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Gradient overlays for smooth fading at the edges */}
        <div className="absolute inset-y-0 left-0 w-24 
        bg-linear-to-r from-white to-transparent 
        pointer-events-none z-10" />

        <div className="absolute inset-y-0 right-0 w-24 
        bg-linear-to-l from-white to-transparent 
        pointer-events-none z-10" />
      </div>
    </section>
  );
}
