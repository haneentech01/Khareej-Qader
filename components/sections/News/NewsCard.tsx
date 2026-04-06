import React from "react";
import { Calendar, ArrowLeft } from "lucide-react";
import { NewsItem } from "@/types";

interface NewsCardProps {
  item: NewsItem;
  readMoreLabel: string;
}

export const NewsCard = React.memo(({ item, readMoreLabel }: NewsCardProps) => {
  return (
    <div
      className="group border-r-4 border-r-brand-base
      flex flex-col md:flex-row md:items-center justify-between 
      p-8 md:p-10 bg-white rounded-2xl
      shadow-[0_5px_20px_rgba(0,0,0,0.02)]
      transition-all duration-300 
      hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1"
    >
      <div className="flex flex-col gap-4 max-w-xl">
        {/* Category & Date Label */}
        <div className="flex items-center gap-3 text-slate-400 font-bold uppercase tracking-wider text-sm md:text-base">
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
      <div className="mt-6 md:mt-0 opacity-40 group-hover:opacity-100 transition-all transform group-hover:-translate-x-4 shrink-0">
        <div className="flex items-center gap-2 rounded-full whitespace-nowrap text-brand-primary font-bold text-sm md:text-base">
          {readMoreLabel}
          <ArrowLeft className="size-4 md:size-5 transition-transform group-hover:-translate-x-1" />
        </div>
      </div>
    </div>
  );
});

NewsCard.displayName = "NewsCard";
