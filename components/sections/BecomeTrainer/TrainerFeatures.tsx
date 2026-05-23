"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Users, Banknote, BadgeCheck, BrainCog } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { TrainerForm } from "./TrainerForm";

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

      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-10 lg:mt-16 bg-brand-base hover:bg-brand-base/90 
          text-white rounded-2xl text-lg font-bold shadow-lg
          shadow-brand-primary/20 transition-all active:scale-95 cursor-pointer
         w-[249px] h-[60px]">
            {t("become_a_trainer")}
          </Button>
        </DialogTrigger>
        <DialogContent showCloseButton={false}
          className="w-full max-w-2xl border-none mx-auto
         bg-transparent shadow-none p-0">
          <DialogTitle className="sr-only">
            {t("become_a_trainer")}
          </DialogTitle>
          <TrainerForm />
        </DialogContent>
      </Dialog>
    </div >
  );
}
