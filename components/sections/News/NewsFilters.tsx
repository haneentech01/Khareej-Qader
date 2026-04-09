import React from "react";
import { Search, Calendar, LayoutGrid } from "lucide-react";
import { useTranslations } from "next-intl";

export function NewsFilters() {
  const t = useTranslations("NewsPage");

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-12">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder={t("search_placeholder")}
          className="w-full h-14 pr-12 pl-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all text-slate-700"
        />
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
      </div>
      
      <div className="flex gap-2">
        <button className="flex items-center justify-center size-14 bg-white border border-slate-200 rounded-2xl hover:border-brand-primary hover:text-brand-primary transition-all text-slate-400">
          <Calendar className="size-5" />
        </button>
        <button className="flex items-center justify-center size-14 bg-white border border-slate-200 rounded-2xl hover:border-brand-primary hover:text-brand-primary transition-all text-slate-400">
          <LayoutGrid className="size-5" />
        </button>
      </div>
    </div>
  );
}
