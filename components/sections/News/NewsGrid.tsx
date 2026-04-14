import React from "react";
import { NewsItem } from "@/types";
import { NewsCard } from "./NewsCard";
import { motion, Variants } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface NewsGridProps {
  items: NewsItem[];
  readMoreLabel: string;
}

export function NewsGrid({ items, readMoreLabel }: NewsGridProps) {
  const { ref, controls } = useScrollAnimation<HTMLDivElement>({ once: true, amount: 0.1 });

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.6,
        delayChildren: 0.6,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 150,
      },
    },
  };

  if (items.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-20 px-4"
      >
        <p className="text-xl text-brand-muted font-medium">
          {/* We'll use a hardcoded fallback or we could pass a label, 
              but for now a sensible default is fine as this component is internal to News */}
          لا توجد نتائج تطابق بحثك حالياً.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
    >
      {items.map((item, index) => (
        <motion.div key={`${item.title}-${index}`} variants={itemVariants}>
          <NewsCard
            item={item}
            readMoreLabel={readMoreLabel}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
