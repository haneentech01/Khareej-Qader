import React from "react";
import { NewsItem } from "@/types";
import { NewsCard } from "./NewsCard";

interface NewsGridProps {
  items: NewsItem[];
  readMoreLabel: string;
}

export function NewsGrid({ items, readMoreLabel }: NewsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      {items.map((item, index) => (
        <NewsCard
          key={`${item.title}-${index}`}
          item={item}
          readMoreLabel={readMoreLabel}
        />
      ))}
    </div>
  );
}
