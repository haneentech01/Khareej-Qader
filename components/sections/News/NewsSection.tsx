"use client";

import React from "react";
import { useNews } from "@/hooks/useNews";
import { NewsHeader } from "./NewsHeader";
import { NewsList } from "./NewsList";
import { motion, Variants } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function NewsSection() {
  const { newsItems, labels } = useNews();
  const { ref, controls, variants } = useScrollAnimation({ once: false, amount: 0.15, delay: 0.2 });

  const gridVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className="my-10 lg:my-20 py-5 bg-slate-50 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          variants={gridVariants}
          className="grid grid-cols-1 lg:grid-cols-12 lg:items-start gap-12 lg:gap-12"
        >
          <NewsHeader
            subtitle={labels.smallSubtitle}
            viewAllLabel={labels.viewAll}
          />

          <NewsList
            items={newsItems}
            readMoreLabel={labels.readMore}
            viewAllLabel={labels.viewAll}
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
