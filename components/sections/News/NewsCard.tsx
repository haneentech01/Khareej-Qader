import React from "react";
import { Calendar, ArrowLeft } from "lucide-react";
import { NewsItem } from "@/types";
import { motion, Variants } from "framer-motion";

interface NewsCardProps {
  item: NewsItem;
  readMoreLabel: string;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const NewsCard = React.memo(({ item, readMoreLabel }: NewsCardProps) => {
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="group border-s-4 border-s-brand-base
      flex flex-col md:flex-row md:items-center justify-between 
      p-6 md:p-8 bg-white rounded-[20px]
      shadow-[0_5px_20px_rgba(0,0,0,0.02)]
      transition-all duration-300 
      hover:shadow-lg hover:-translate-y-1"
    >
      <div className="flex flex-col gap-3 max-w-xl">
        {/* Category & Date Label */}
        <div className="flex items-center gap-3 text-brand-muted
        font-bold uppercase tracking-wider text-sm md:text-base">
          <div className="flex items-center gap-2">
            <Calendar className="size-4" />
            {item.date}
          </div>
        </div>

        {/* Article Title */}
        <h3 className="text-xl md:text-2xl font-bold text-black leading-snug">
          {item.title}
        </h3>

        {/* Article Description */}
        <p className="text-sm md:text-base text-brand-muted leading-snug">
          {item.description}
        </p>
      </div>

      {/* Read More Button (Transformed on Hover) */}
      <div className="mt-6 md:mt-0 opacity-40 group-hover:opacity-100 
      transition-all transform group-hover:-translate-x-2 shrink-0">
        <div className="flex items-center gap-1 rounded-full 
        whitespace-nowrap text-brand-primary font-bold text-sm md:text-base">
          {readMoreLabel}
          <ArrowLeft className="size-4 md:size-5 transition-transform group-hover:-translate-x-1" />
        </div>
      </div>
    </motion.div>
  );
});

NewsCard.displayName = "NewsCard";
