"use client";

import React from "react";
import { useNews } from "@/hooks/useNews";
import { NewsHeader } from "./NewsHeader";
import { NewsList } from "./NewsList";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function NewsSection() {
  const { newsItems, labels } = useNews();
  const { ref, controls, variants } = useScrollAnimation({ once: false, amount: 0.15, delay: 0.2 });

  return (
    <motion.section 
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="py-20 lg:py-32 bg-slate-50 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:items-start gap-12 lg:gap-12">
          <NewsHeader 
            subtitle={labels.smallSubtitle} 
            viewAllLabel={labels.viewAll} 
          />

          <NewsList 
            items={newsItems} 
            readMoreLabel={labels.readMore} 
            viewAllLabel={labels.viewAll} 
          />
        </div>
      </div>
    </motion.section>
  );
}
