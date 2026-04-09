import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  locale: string;
}

export function Pagination({ currentPage, totalPages, onPageChange, locale }: PaginationProps) {
  const isRtl = locale === "ar";
  const PrevIcon = isRtl ? ChevronRight : ChevronLeft;
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;

  return (
    <div className="flex items-center justify-center gap-2 mt-16 pb-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center size-10 rounded-full border border-slate-200 text-slate-400 hover:border-brand-primary hover:text-brand-primary disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-400 transition-all"
      >
        <PrevIcon className="size-5" />
      </button>

      {[...Array(totalPages)].map((_, i) => {
        const pageNum = i + 1;
        const isActive = pageNum === currentPage;

        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={cn(
              "flex items-center justify-center size-10 rounded-full font-bold transition-all",
              isActive
                ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20"
                : "text-slate-600 hover:bg-slate-50"
            )}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center size-10 rounded-full border border-slate-200 text-slate-400 hover:border-brand-primary hover:text-brand-primary disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-400 transition-all"
      >
        <NextIcon className="size-5" />
      </button>
    </div>
  );
}
