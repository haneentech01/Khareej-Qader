"use client";

import { useTranslations } from "next-intl";
import { SectionHeader } from "../../ui/SectionHeader";
import { VideoPlayer } from "./VideoPlayer";
import { motion, Variants } from "framer-motion";

export function AboutSection() {
    const t = useTranslations("About");

    const containerVariants: Variants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    return (
        <section
            id="program"
            className="my-10 lg:my-20 bg-white pt-28 md:pt-44 lg:pt-32 xl:pt-20 relative overflow-hidden"
        >
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="container mx-auto px-4 md:px-6 relative z-10"
            >
                <motion.div variants={itemVariants} className="text-center mb-16 lg:mb-0">
                    <SectionHeader namespace="About" />
                </motion.div>

                <motion.div variants={itemVariants}>
                    <VideoPlayer playLabel={t("play_video")} />
                </motion.div>
            </motion.div>
        </section>
    );
}
