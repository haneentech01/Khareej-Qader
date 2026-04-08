"use client";

import { useTranslations } from "next-intl";
import { SectionHeader } from "../../ui/SectionHeader";
import { VideoPlayer } from "./VideoPlayer";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function AboutSection() {
  const t = useTranslations("About");
  const { ref, controls, variants } = useScrollAnimation({ once: false, amount: 0.2, delay: 0.2 });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      id="program"
      className="bg-white pt-48 pb-0 md:pt-56 lg:pt-60 xl:pt-40 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Consistent Section Heading */}
        <div className="text-center mb-16 lg:mb-0">
          <SectionHeader namespace="About" />
        </div>

        {/* Laptop Video Player */}
        <VideoPlayer playLabel={t("play_video")} />
      </div>
    </motion.section>
  );
}
