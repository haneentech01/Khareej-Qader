"use client";

import { useLocale, useTranslations } from "next-intl";
import { Users, Banknote, BadgeCheck, BrainCog } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useRouter } from "next/navigation";


export function TrainerFeatures() {
    const t = useTranslations("BecomeTrainer");
    const router = useRouter();
    const locale = useLocale();

    const features = [
        {
            id: 1,
            title: t("feature1_title"),
            desc: t("feature1_desc"),
            icon: Users,
            color: "text-brand-primary",
            bg: "bg-brand-light",
        },
        {
            id: 2,
            title: t("feature2_title"),
            desc: t("feature2_desc"),
            icon: BrainCog,
            color: "text-brand-primary",
            bg: "bg-brand-light",
        },
        {
            id: 3,
            title: t("feature3_title"),
            desc: t("feature3_desc"),
            icon: Banknote,
            color: "text-brand-primary",
            bg: "bg-brand-light",
        },
        {
            id: 4,
            title: t("feature4_title"),
            desc: t("feature4_desc"),
            icon: BadgeCheck,
            color: "text-brand-primary",
            bg: "bg-brand-light",
        },
    ];

    return (
        <div className="flex flex-col items-center">
            {/* Header */}
            <div className="space-y-6 flex flex-col items-center">
                <div className="inline-flex items-center justify-center px-4 py-1.5 
                rounded-full bg-brand-primary text-white text-sm font-bold">
                    {t("badge")}
                </div>
                <SectionHeader namespace="BecomeTrainer" centered={true} />
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                {features.map((feature, index) => (
                    <motion.div
                        key={feature.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.35 }}
                        className="bg-white p-6 rounded-4xl border border-slate-50 shadow-sm hover:shadow-md transition-all group hover:scale-105"
                    >
                        <div className={`w-12 h-12 rounded-2xl ${feature.bg} flex items-center justify-center mb-4 transition-transform`}>
                            <feature.icon className={`size-6 ${feature.color}`} />
                        </div>
                        <h4 className="text-lg md:text-xl font-bold text-black mb-2">
                            {feature.title}
                        </h4>
                        <p className="text-sm md:text-base text-brand-muted leading-relaxed">
                            {feature.desc}
                        </p>
                    </motion.div>
                ))}
            </div>

            <button
                onClick={() => router.push(`/${locale}/register-mentor`)}
                className="bg-brand-base hover:bg-brand-primary
                text-white font-bold 
                w-[249px] h-[60px] rounded-lg 
                transition-colors cursor-pointer text-lg
                mt-10 md:mt-20"
            >
                {t("become_a_trainer")}
            </button>
        </div >
    );
}