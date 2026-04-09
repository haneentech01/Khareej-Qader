"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function AuthIllustration() {
  const t = useTranslations("Auth");

  const benefits = [
    { key: "benefit1", icon: <CheckCircle2 className="w-8 h-8 text-brand-primary" /> },
    { key: "benefit2", icon: <CheckCircle2 className="w-8 h-8 text-brand-primary" /> },
    { key: "benefit3", icon: <CheckCircle2 className="w-8 h-8 text-brand-primary" /> },
    { key: "benefit4", icon: <CheckCircle2 className="w-8 h-8 text-brand-primary" /> },
  ];

  return (
    <div className="hidden lg:flex flex-col items-center 
    justify-start w-1/2 pt-3.5 mb-10">
      <div className="w-full max-w-xl">
        {/* Logo */}
        <div className="flex justify-end">
          <Image
            src="/images/logo.png"
            alt="Areisto Academy"
            width={120}
            height={60}
            className="object-contain"
          />
        </div>

        {/* Main Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-12"
        >
          <Image
            src="/images/signupLogo.png"
            alt="Student Illustration"
            width={609}
            height={560}
            className="w-full h-auto object-contain"
            priority
          />
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-2 gap-y-5">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="flex items-center justify-center gap-2.5  bg-white rounded-[10px] 
              shadow-[0_5px_5px_0px_#0000000D] border border-slate-50 max-w-[206px] h-[92px]"
            >
              <div className="">
                {benefit.icon}
              </div>
              <span className="font-bold text-black text-base xl:text-lg">
                {t(benefit.key)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
