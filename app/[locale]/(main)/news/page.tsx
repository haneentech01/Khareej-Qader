"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { NewsFilters } from "@/components/sections/News/NewsFilters";
import { NewsGrid } from "@/components/sections/News/NewsGrid";
import { Pagination } from "@/components/ui/Pagination";
import { CTASection } from "@/components/sections/CTA";
import { motion } from "framer-motion";
import { NewsItem } from "@/types";
import { useNewsManager } from "@/hooks/useNewsManager";

export default function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const t = useTranslations("NewsPage");
  const tNews = useTranslations("News");
  const { locale } = React.use(params);

  const rawNewsItems = t.raw("news_items") || [];

  const { state, actions } = useNewsManager({
    initialItems: rawNewsItems as NewsItem[],
    itemsPerPage: 6
  });

  const breadcrumbs = [
    { label: t("breadcrumb_home"), href: "/" },
    { label: t("breadcrumb_news") },
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 md:px-10 pt-10">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbs} locale={locale} />

        {/* Page Header */}
        <section className="text-center max-w-7xl mx-auto mb-16">
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
        <NewsFilters
          value={state.searchQuery}
          onChange={actions.setSearchQuery}
          onEnter={actions.triggerImmediateSearch}
          onCalendarClick={actions.toggleSortOrder}
        />

        {/* News Grid */}
        <NewsGrid
          items={state.displayedItems}
          readMoreLabel={tNews("read_more")}
        />

        {/* Pagination - Only shows if more than one page exists */}
        {state.totalPages > 1 && (
          <Pagination
            currentPage={state.currentPage}
            totalPages={state.totalPages}
            onPageChange={actions.setCurrentPage}
            locale={locale}
          />
        )}
      </div>

      {/* Call to Action */}
      <CTASection />
    </div>
  );
}
