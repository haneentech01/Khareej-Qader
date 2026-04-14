"use client";

import { useTranslations } from "next-intl";
import { SectionHeader } from "../../ui/SectionHeader";
import { VideoPlayer } from "./VideoPlayer";
import { motion, Variants } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function AboutSection() {
  const t = useTranslations("About");
  const { ref, controls, variants } = useScrollAnimation({ once: false, amount: 0.2, delay: 0.2 });

    const containerVariants: Variants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <motion.section
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            id="program"
            className="my-10 lg:my-20 bg-white pt-48 pb-5 md:pt-56 lg:pt-60 xl:pt-48 relative overflow-hidden"
        >
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Consistent Section Heading */}
                <motion.div variants={itemVariants} className="text-center mb-16 lg:mb-0">
                    <SectionHeader namespace="About" />
                </motion.div>

                {/* Laptop Video Player */}
                <motion.div variants={itemVariants}>
                    <VideoPlayer playLabel={t("play_video")} />
                </motion.div>
            </div>
        </motion.section>
    );
}
