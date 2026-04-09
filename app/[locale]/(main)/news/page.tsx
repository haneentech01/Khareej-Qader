"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { NewsFilters } from "@/components/sections/News/NewsFilters";
import { NewsGrid } from "@/components/sections/News/NewsGrid";
import { Pagination } from "@/components/ui/Pagination";
import { CTASection } from "@/components/sections/CTA";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";

export default function NewsPage({ params }: { params: { locale: string } }) {
  const t = useTranslations("NewsPage");
  const tAuth = useTranslations("Auth"); // For footer/cta reuse if needed
  const [currentPage, setCurrentPage] = useState(1);
  const locale = params.locale;

  // Mock news data strictly following the image
  const newsItems = [
    {
      title: "إطلاق مسار الذكاء الاصطناعي الجديد",
      date: "25 أبريل 2026",
      description: "انضم الآن لتعلم أساسيات وتقنيات الذكاء الاصطناعي وكيفية تطبيقها في سوق العمل الحديث.",
    },
    {
      title: "بدء التدريب العملي للمرحلة الثانية",
      date: "18 أبريل 2026",
      description: "نعلن عن انطلاق جلسات التدريب العملي المباشرة مع نخبة من الخبراء في مختلف المسارات التقنية.",
    },
    {
      title: "إعلان فرصة تدريبية مع إحدى الشركات الكبرى",
      date: "28 أبريل 2026",
      description: "اغتنم الفرصة للتدريب مع واحدة من الشركات الكبرى الرائدة في مجالها لتطوير مهاراتك.",
    },
    {
      title: "فتح باب التسجيل للدفعة الجديدة",
      date: "10 أبريل 2026",
      description: "الفرصة الآن متاحة للانضمام إلى برنامج خريج قادر. بادر بحجز مقعدك وابدأ رحلتك المهنية.",
    },
    {
      title: "إطلاق مسار الذكاء الاصطناعي الجديد",
      date: "25 أبريل 2026",
      description: "انضم الآن لتعلم أساسيات وتقنيات الذكاء الاصطناعي وكيفية تطبيقها في سوق العمل الحديث.",
    },
    {
      title: "بدء التدريب العملي للمرحلة الثانية",
      date: "18 أبريل 2026",
      description: "نعلن عن انطلاق جلسات التدريب العملي المباشرة مع نخبة من الخبراء في مختلف المسارات التقنية.",
    },
    {
      title: "إعلان فرصة تدريبية مع إحدى الشركات الكبرى",
      date: "28 أبريل 2026",
      description: "اغتنم الفرصة للتدريب مع واحدة من الشركات الكبرى الرائدة في مجالها لتطوير مهاراتك.",
    },
    {
      title: "فتح باب التسجيل للدفعة الجديدة",
      date: "10 أبريل 2026",
      description: "الفرصة الآن متاحة للانضمام إلى برنامج خريج قادر. بادر بحجز مقعدك وابدأ رحلتك المهنية.",
    },
  ];

  const breadcrumbs = [
    { label: t("breadcrumb_home"), href: "/" },
    { label: t("breadcrumb_news") },
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="container mx-auto px-4 md:px-10 lg:px-20 pt-10">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbs} locale={locale} />

        {/* Page Header */}
        <section className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-black mb-6 leading-tight"
          >
            {t("page_title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-brand-muted leading-relaxed"
          >
            {t("page_subtitle")}
          </motion.p>
        </section>

        {/* Filters & Search */}
        <NewsFilters />

        {/* News Grid */}
        <NewsGrid items={newsItems} readMoreLabel={useTranslations("News")("read_more")} />

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={2}
          onPageChange={setCurrentPage}
          locale={locale}
        />
      </div>

      {/* Call to Action */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
