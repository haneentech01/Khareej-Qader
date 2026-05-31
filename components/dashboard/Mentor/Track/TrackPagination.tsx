"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ChevronLeft, ChevronRight, ChevronDown, Check } from "lucide-react";

interface TrackPaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (size: number) => void;
  totalItems: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
}

export function TrackPagination({
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
  totalItems,
  totalPages,
  startIndex,
  endIndex,
}: TrackPaginationProps) {
  const t = useTranslations("MentorTrack");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const sizeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sizeRef.current && !sizeRef.current.contains(event.target as Node)) {
        setIsSizeOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 4;

    if (totalPages <= maxVisible + 1) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }

    return pages.map((page, index) => {
      if (page === "...") {
        return (
          <span key={`dots-${index}`} className="px-2 text-slate-400 font-bold select-none">
            ...
          </span>
        );
      }

      const isCurrent = page === currentPage;
      return (
        <button
          key={`page-${page}`}
          onClick={() => setCurrentPage(page as number)}
          className={`size-8 rounded-lg flex items-center justify-center text-xs md:text-sm font-bold transition-all cursor-pointer ${
            isCurrent
              ? "bg-brand-primary text-white shadow-xs"
              : "text-slate-500 hover:bg-slate-100 hover:text-black"
          }`}
        >
          {page}
        </button>
      );
    });
  };

  const sizeOptions = [5, 10, 20, 50];

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between w-full mt-4 select-none">
      {/* Showing entries text */}
      <div className="text-xs md:text-sm font-bold text-slate-500 order-2 md:order-1">
        {t("pagination.showing", {
          start: startIndex,
          end: endIndex,
          total: totalItems,
        })}
      </div>

      {/* Pagination control buttons */}
      <div className="flex items-center gap-1.5 order-1 md:order-2">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold transition-all flex items-center gap-1 cursor-pointer border border-transparent ${
            currentPage === 1
              ? "text-slate-300 pointer-events-none"
              : "text-slate-600 hover:bg-slate-100 hover:text-black"
          }`}
        >
          {isRtl ? <ChevronRight className="size-4 shrink-0" /> : <ChevronLeft className="size-4 shrink-0" />}
          <span>{t("pagination.prev")}</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1 mx-1">{renderPageNumbers()}</div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages || totalPages === 0}
          className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold transition-all flex items-center gap-1 cursor-pointer border border-transparent ${
            currentPage === totalPages || totalPages === 0
              ? "text-slate-300 pointer-events-none"
              : "text-slate-600 hover:bg-slate-100 hover:text-black"
          }`}
        >
          <span>{t("pagination.next")}</span>
          {isRtl ? <ChevronLeft className="size-4 shrink-0" /> : <ChevronRight className="size-4 shrink-0" />}
        </button>
      </div>

      {/* Page Size Dropdown */}
      <div className="relative order-3" ref={sizeRef}>
        <button
          onClick={() => setIsSizeOpen(!isSizeOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200/80 hover:border-slate-300 rounded-lg text-xs md:text-sm font-bold text-slate-600 transition-all cursor-pointer"
        >
          <span>{t("pagination.show_per_page")} {itemsPerPage}</span>
          <ChevronDown className={`size-3.5 text-slate-400 transition-transform duration-300 ${isSizeOpen ? "rotate-180" : ""}`} />
        </button>

        {isSizeOpen && (
          <div className={`absolute z-35 bottom-full mb-1 w-24 bg-white border border-slate-150 rounded-xl shadow-xl p-1 animate-in fade-in duration-200 ${isRtl ? "right-0" : "left-0"}`}>
            {sizeOptions.map((size) => (
              <button
                key={size}
                onClick={() => {
                  setItemsPerPage(size);
                  setIsSizeOpen(false);
                }}
                className={`flex items-center justify-between w-full px-3 py-1.5 text-right rtl:text-right ltr:text-left text-xs md:text-sm font-semibold rounded-lg hover:bg-slate-50 transition-colors ${
                  itemsPerPage === size ? "text-brand-primary bg-emerald-50/50" : "text-slate-700"
                }`}
              >
                <span>{size}</span>
                {itemsPerPage === size && <Check className="size-4 text-brand-primary" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
