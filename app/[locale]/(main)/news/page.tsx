"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { NewsFilters } from "@/components/sections/News/NewsFilters";
import { NewsGrid } from "@/components/sections/News/NewsGrid";
import { Pagination } from "@/components/ui/Pagination";
import { CTASection } from "@/components/sections/CTA";
import { motion } from "framer-motion";
import { NewsItem } from "@/types";

export default function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const t = useTranslations("NewsPage");
  const tNews = useTranslations("News");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [isNewestFirst, setIsNewestFirst] = useState(true);
  const { locale } = React.use(params);

  const ITEMS_PER_PAGE = 6;
  const rawNewsItems = t.raw("news_items") || [];

  // Handle Search Debounce (5 seconds as requested)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setActiveSearch(searchQuery);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeSearch]);

  const handleImmediateSearch = () => {
    setActiveSearch(searchQuery);
  };

  // Filter items based on active search
  const filteredItems = (rawNewsItems as NewsItem[]).filter((item) => {
    const searchLower = activeSearch.toLowerCase();
    return (
      item.title?.toLowerCase().includes(searchLower) ||
      item.description?.toLowerCase().includes(searchLower)
    );
  });

  // Sort items (Date sorting - very basic since dates are strings in the mock)
  // In a real app, we'd parse the date. Here we'll just toggle the order of the mock items.
  const sortedItems =
    isNewestFirst
      ? [...filteredItems]
      : [...filteredItems].reverse();

  const totalPages = Math.ceil(sortedItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedItems = sortedItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Scroll to top when page changes
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

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
          value={searchQuery}
          onChange={setSearchQuery}
          onEnter={handleImmediateSearch}
          onCalendarClick={() => setIsNewestFirst(!isNewestFirst)}
        />

        {/* News Grid */}
        <NewsGrid
          items={displayedItems}
          readMoreLabel={tNews("read_more")}
        />

        {/* Pagination - Only shows if more than one page exists */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            locale={locale}
          />
        )}
      </div>

      {/* Call to Action */}
      <CTASection />
    </div>
  );
}
