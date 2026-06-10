"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function TrainerIllustration() {
  const t = useTranslations("BecomeTrainer");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const benefits = [
    { key: "feature1", icon: <CheckCircle2 className="w-6 h-6 text-brand-primary" /> },
    { key: "feature2", icon: <CheckCircle2 className="w-6 h-6 text-brand-primary" /> },
    { key: "feature3", icon: <CheckCircle2 className="w-6 h-6 text-brand-primary" /> },
    { key: "feature4", icon: <CheckCircle2 className="w-6 h-6 text-brand-primary" /> },
  ];

  return (
    <div className="hidden lg:flex flex-col items-center justify-between w-[38%] bg-[#F6FBFA] p-8 relative overflow-hidden border-e border-slate-100">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/5 rounded-bl-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-base/5 rounded-tr-full pointer-events-none" />

      <div className="w-full flex flex-col items-center justify-start gap-6 z-10">
        {/* Logo */}
        <div className="w-full flex justify-start">
          <Image
            src="/images/logo.png"
            alt="Areisto Academy"
            width={120}
            height={60}
            className="object-contain w-36 h-auto"
            priority
          />
        </div>

        {/* Main 3D Illustration with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-[280px] aspect-square flex items-center justify-center"
        >
          <Image
            src="/images/signupLogo.png"
            alt="Trainer Illustration"
            fill
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Benefits Grid */}
        <div className="w-full flex flex-col gap-3 mt-2">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.key}
              initial={{ opacity: 0, x: isRtl ? 15 : -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.08 }}
              className="flex items-start gap-3 bg-white p-3 rounded-2xl shadow-[0_4px_12px_0px_#00000004] border border-slate-50/50 hover:shadow-md hover:border-brand-primary/10 transition-all duration-300"
            >
              <div className="mt-0.5 shrink-0">
                {benefit.icon}
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-black text-sm">
                  {t(`${benefit.key}_title`)}
                </span>
                <span className="text-brand-muted text-xs leading-normal">
                  {t(`${benefit.key}_desc`)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
