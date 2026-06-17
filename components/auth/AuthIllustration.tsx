"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";

interface AuthIllustrationProps {
  imageSrc?: string;
  benefits?: string[];
  translationNamespace?: string;
}

export function AuthIllustration({
  imageSrc = "/images/signupLogo.png",
  benefits = ["benefit1", "benefit2", "benefit3", "benefit4"],
  translationNamespace = "Auth",
}: AuthIllustrationProps) {
  const t = useTranslations(translationNamespace as any);

  const parsedBenefits = benefits.map((key) => ({
    key,
    icon: <CheckCircle2 className="w-8 h-8 text-brand-primary" />,
  }));

  return (
    <div className="hidden lg:flex flex-col items-center 
    justify-start w-1/2 pt-3.5 mb-10">
      <div className="w-full max-w-xl">
        {/* Logo */}
        <div className="flex justify-end">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Areisto Academy"
              width={120}
              height={60}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Main Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-12 flex justify-center"
        >
          <Image
            src={imageSrc}
            alt="Illustration"
            width={imageSrc.includes("signupMentorLogo") ? 585 : 609}
            height={imageSrc.includes("signupMentorLogo") ? 562 : 560}
            className="w-full max-w-[450px] lg:max-w-[600px] h-auto object-contain"
            priority
          />
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-2 gap-y-5 gap-x-4">
          {parsedBenefits.map((benefit, index) => (
            <motion.div
              key={benefit.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="flex items-center justify-center gap-2.5 bg-white rounded-[10px] 
              shadow-[0_5px_5px_0px_#0000000D] border border-slate-50 
              max-w-[250px] h-[92px]"
            >
              <div className="shrink-0">
                {benefit.icon}
              </div>
              <span className="font-bold text-black text-sm xl:text-base text-right leading-tight">
                {t(benefit.key)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

