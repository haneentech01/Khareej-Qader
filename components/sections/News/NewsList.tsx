import { motion, Variants } from "framer-motion";
import { useLocale } from "next-intl";
import { MoveLeft } from "lucide-react";
import { Link } from "@/i18n/routing";
import { NewsItem } from "@/types";
import { NewsCard } from "./NewsCard";

interface NewsListProps {
  items: NewsItem[];
  readMoreLabel: string;
  viewAllLabel: string;
}

export const NewsList = ({ items, readMoreLabel, viewAllLabel }: NewsListProps) => {
  const locale = useLocale();
  const isRTL = locale === "ar";

  const containerVariants: Variants = {
    hidden: { 
      opacity: 0, 
    },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 0.1, // Short duration for container display
        staggerChildren: 0.6,
        ease: "easeOut"
      } 
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      className="lg:col-span-7 flex flex-col gap-6"
    >
      {/* Map through localized news entries */}
      {items.map((item, index) => (
        <NewsCard 
          key={`${item.title}-${index}`} 
          item={item} 
          readMoreLabel={readMoreLabel} 
        />
      ))}

      {/* Mobile-only (below lg) View All Button */}
      <div className="lg:hidden mt-8 w-full">
        <Link href="/news">
          <button className="w-full flex items-center justify-center gap-3 bg-brand-primary text-white 
          py-5 rounded-[24px] font-bold text-lg 
          shadow-[0_15px_40px_rgba(30,165,134,0.3)] 
          hover:bg-brand-dark transition-all transform hover:-translate-y-1">
            {viewAllLabel}
            <MoveLeft className="size-5" />
          </button>
        </Link>
      </div>
    </motion.div>
  );
};
