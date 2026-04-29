"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion, Variants } from "framer-motion";
import { useScrollAnimation } from "@/hook/useScrollAnimation";

/**
 * Footer component providing site navigation, contact information,
 * and social media links with a high-end branding consistent with the landing page.
 */
export function Footer() {
  const t = useTranslations("Footer");
  const h = useTranslations("Header");
  const { ref, controls } = useScrollAnimation({ once: false, amount: 0.1, delay: 0.1 });

  const socialLinks = [
    { icon: FaFacebook, href: "https://www.facebook.com/profile.php?id=61585324196967#" },
    { icon: FaInstagram, href: "https://www.instagram.com/areisto.co/" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/company/areisto/posts/?feedView=all" },
  ];

  const quickLinks = [
    { label: h("home"), href: "/" },
    { label: h("program"), href: "#program" },
    { label: h("tracks"), href: "#tracks" },
    { label: h("success_stories"), href: "#success-stories" },
    { label: h("gallery"), href: "#gallery" },
    { label: h("faq"), href: "#faq" },
  ];

  const footerItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <footer ref={ref} className="pt-20 pb-10 bg-[#F8FAF8] overflow-hidden">
      <motion.div
        initial="hidden"
        animate={controls}
        variants={staggerContainer}
        className="container mx-auto px-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 xl:gap-20 mb-20 md:mb-24 px-4 lg:px-0">
          {/* Brand Column */}
          <motion.div variants={footerItemVariants} className="flex flex-col max-w-sm">
            <Link href="/" className="inline-block transition-transform hover:scale-105 active:scale-95">
              <Image
                src="/images/logo.png"
                alt="Khareej Qader"
                width={180}
                height={108}
                className="w-[131px] md:w-[150px] h-auto"
              />
            </Link>
            <p className="text-brand-muted text-sm lg:text-base mt-4 leading-relaxed">
              {t("description")}
            </p>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div variants={footerItemVariants}>
            <h4 className="text-xl md:text-lg font-bold text-black mb-6 after:content-[''] after:block after:w-8 after:h-1 after:bg-brand-primary after:mt-2 after:rounded-full">
              {t("quick_links")}
            </h4>
            <ul className="grid grid-cols-3 lg:grid-cols-1 gap-4">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-brand-muted text-sm md:text-base hover:text-brand-primary hover:translate-x-3 transition-all inline-block focus:translate-x-3 focus:text-brand-primary font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Column */}
          <motion.div variants={footerItemVariants}>
            <h4 className="text-sm md:text-lg font-bold text-black mb-6 after:content-[''] after:block after:w-8 after:h-1 after:bg-brand-primary after:mt-2 after:rounded-full">
              {t("support")}
            </h4>
            <ul className="grid grid-cols-3 lg:grid-cols-1 gap-4">
              {[
                { label: t("contact_us_link"), href: "#contact" },
                { label: t("help_center"), href: "#help" },
                { label: t("privacy_policy"), href: "#privacy" },
                { label: t("terms_conditions"), href: "#terms" },
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-brand-muted text-sm md:text-base hover:text-brand-primary hover:translate-x-3 transition-all inline-block focus:translate-x-3 focus:text-brand-primary focus:scale-105 focus:font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Subscribe Column */}
          <motion.div variants={footerItemVariants}>
            <h4 className="text-sm md:text-lg font-bold text-black mb-6 after:content-[''] after:block after:w-8 after:h-1 after:bg-brand-primary after:mt-2 after:rounded-full">
              {t("subscribe_title")}
            </h4>
            <p className="text-brand-muted text-sm md:text-base leading-relaxed mb-6">
              {t("subscribe_desc")}
            </p>
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t("email_placeholder")}
                className="w-full px-6 py-4 bg-white border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-slate-700 placeholder:text-slate-400 font-medium"
                required
              />
              <button
                type="submit"
                className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-bold py-4 rounded-xl transition-colors duration-200"
              >
                {t("subscribe_btn")}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Copyright Section */}
        <motion.div variants={footerItemVariants} className="pt-10 border-t border-[#BCC9C433] flex flex-col md:flex-row items-center justify-between gap-6 px-4 lg:px-0">
          <div className="flex gap-4">
            {socialLinks.map((social, i) => {
              const Icon = social.icon;
              return (
                <a key={i} href={social.href} className="size-8 md:size-10 bg-[#EEEEEC] shadow-sm rounded-full flex items-center justify-center text-brand-muted border border-slate-100 hover:bg-brand-primary hover:text-white transition-all transform hover:-translate-y-1">
                  <Icon className="size-4 md:size-5" />
                </a>
              );
            })}
          </div>
          <div>
            <p className="text-brand-muted text-sm md:text-base font-medium text-center">
              {t("rights")}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}

