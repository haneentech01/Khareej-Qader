import { Search, Calendar, SlidersHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, Variants } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface NewsFiltersProps {
  value: string;
  onChange: (value: string) => void;
  onEnter: () => void;
  onCalendarClick?: () => void;
}

const filterVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export function NewsFilters({
  value,
  onChange,
  onEnter,
  onCalendarClick,
}: NewsFiltersProps) {
  const t = useTranslations("NewsPage");
  const { ref, controls } = useScrollAnimation<HTMLFormElement>({ once: true, amount: 0.1 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEnter();
  };

  return (
    <motion.form
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={filterVariants}
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-4 mb-12"
    >
      <div className="relative flex-1 max-w-[768px] mx-auto group">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t("search_placeholder")}
          className="w-full h-[58px] 
          rtl:pr-14 rtl:pl-28 ltr:pl-14 ltr:pr-28
          bg-white border border-[#CBD5E1] rounded-full 
          focus:outline-none focus:ring-2 focus:ring-brand-primary/20 
          focus:border-brand-primary transition-all text-brand-muted
          placeholder:text-[#47556999]"
        />
        {/* Search Icon */}
        <Search className="absolute rtl:right-6 ltr:left-6 top-1/2 -translate-y-1/2 size-5 text-brand-muted" />

        {/* Filter Icons */}
        <div
          className="absolute rtl:left-2 ltr:right-2 top-1/2 
        -translate-y-1/2 flex items-center"
        >
          {/* Calendar Icon */}
          <button
            onClick={onCalendarClick}
            className="flex items-center justify-center size-10 
          rounded-full hover:bg-slate-100 transition-colors text-brand-muted
          hover:text-brand-primary"
          >
            <Calendar className="size-5" />
          </button>

          {/* Filter Icon */}
          <button
            className="flex items-center justify-center size-10 
          rounded-full hover:bg-slate-100 transition-colors text-brand-muted 
          hover:text-brand-primary"
          >
            <SlidersHorizontal className="size-5" />
          </button>
        </div>
      </div>
    </motion.form>
  );
}
