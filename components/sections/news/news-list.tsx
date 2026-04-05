import React from "react";
import { MoveLeft } from "lucide-react";
import { NewsItem } from "../../../hooks/use-news";
import { NewsCard } from "./news-card";

interface NewsListProps {
  items: NewsItem[];
  readMoreLabel: string;
  viewAllLabel: string;
}

/**
 * NewsList Component
 * 
 * Renders the map of news items and handles the mobile-only (lg:hidden) 
 * "View All" CTA for smaller screens where the sidebar is not visible.
 */
export const NewsList = ({ items, readMoreLabel, viewAllLabel }: NewsListProps) => {
  return (
    <div className="lg:col-span-7 flex flex-col gap-6">
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
        <button className="w-full flex items-center justify-center gap-3 bg-brand-primary text-white 
        py-5 rounded-[24px] font-bold text-lg 
        shadow-[0_15px_40px_rgba(30,165,134,0.3)] 
        hover:bg-brand-dark transition-all transform hover:-translate-y-1">
          {viewAllLabel}
          <MoveLeft className="size-5" />
        </button>
      </div>
    </div>
  );
};
