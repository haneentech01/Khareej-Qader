"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Users, Banknote, BadgeCheck, BrainCog } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function TrainerFeatures() {
  const t = useTranslations("BecomeTrainer");

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
    <div className="flex flex-col">
      {/* Header */}
      <div className="space-y-6">
        <div className="inline-flex items-center px-4 py-1.5 
        rounded-full bg-brand-primary text-white text-sm font-bold">
          {t("badge")}
        </div>
        <SectionHeader namespace="BecomeTrainer" centered={false} />
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
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
    </div>
  );
}
