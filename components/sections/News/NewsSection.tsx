"use client";

import { useNews } from "@/hooks/useNews";
import { NewsHeader } from "./NewsHeader";
import { NewsList } from "./NewsList";
import { motion, Variants } from "framer-motion";

export function NewsSection() {
  const { newsItems, labels } = useNews();

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
    <section className="my-10 lg:my-20 py-5 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
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
    </section>
  );
}
