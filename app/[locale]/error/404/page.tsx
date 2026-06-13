"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Error404Page() {
  const t = useTranslations("Error");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brand-light">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center w-full flex flex-col items-center"
      >
        <div className="relative rounded-2xl w-full max-w-[400px] aspect-square mb-4">
          <Image
            src="/images/error404.png"
            alt="404 - Page Not Found"
            fill
            className="object-contain"
            priority
          />
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2 leading-tight">
          {t("title_404")}
        </h1>

        <p className="text-brand-muted text-sm md:text-base mb-4 leading-relaxed">
          {t("desc_404")}
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 h-12 bg-brand-primary hover:bg-brand-accent text-white font-bold rounded-xl shadow-lg shadow-brand-primary/20 transition-all cursor-pointer active:scale-95 text-base"
        >
          {t("back_home")}
        </Link>
      </motion.div>
    </div>
  );
}
