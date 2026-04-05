"use client";

import React from "react";
import { useNews } from "../../../hooks/use-news";
import { NewsHeader } from "./news-header";
import { NewsList } from "./news-list";

/**
 * NewsSection Component
 * 
 * High-level orchestrator for the News section.
 * - Extracts data via useNews hook (SRP).
 * - Delegates presentation to atomic components (Composition).
 * - Organized in a scalable grid layout.
 */
export function NewsSection() {
  const { newsItems, labels } = useNews();

  return (
    <section className="py-20 lg:py-32 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:items-start gap-12 lg:gap-12">
          
          {/* Header & Breadcrumb Part */}
          <NewsHeader 
            subtitle={labels.smallSubtitle} 
            viewAllLabel={labels.viewAll} 
          />

          {/* Dynamic News Entries List */}
          <NewsList 
            items={newsItems} 
            readMoreLabel={labels.readMore} 
            viewAllLabel={labels.viewAll} 
          />

        </div>
      </div>
    </section>
  );
}
