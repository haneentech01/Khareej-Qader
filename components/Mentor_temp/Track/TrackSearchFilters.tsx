"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Search, Filter, ArrowUpDown, ChevronDown, Check } from "lucide-react";
import { MentorLessonStatus } from "@/types";

interface TrackSearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: "all" | MentorLessonStatus;
  setStatusFilter: (filter: "all" | MentorLessonStatus) => void;
  sortBy: "newest" | "oldest" | "highest_progress" | "lowest_progress";
  setSortBy: (sort: "newest" | "oldest" | "highest_progress" | "lowest_progress") => void;
}

export function TrackSearchFilters({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
}: TrackSearchFiltersProps) {
  const t = useTranslations("MentorTrack");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const statusOptions: { value: "all" | MentorLessonStatus; label: string }[] = [
    { value: "all", label: t("filters.all") },
    { value: "published", label: t("filters.published") },
    { value: "draft", label: t("filters.draft") },
    { value: "hidden", label: t("filters.hidden") },
  ];

  const sortOptions: { value: typeof sortBy; label: string }[] = [
    { value: "newest", label: t("sorting.newest") },
    { value: "oldest", label: t("sorting.oldest") },
    { value: "highest_progress", label: t("sorting.highest_progress") },
    { value: "lowest_progress", label: t("sorting.lowest_progress") },
  ];

  const activeStatusLabel = statusOptions.find(opt => opt.value === statusFilter)?.label || t("filters.all");

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 items-stretch md:items-center justify-between w-full">
      {/* Filters & Sorting */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        {/* Status Filter Dropdown */}
        <div className="relative" ref={filterRef}>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200/80 hover:border-slate-300 rounded-xl text-xs md:text-sm font-semibold text-slate-700 transition-all shadow-xs cursor-pointer"
          >
            <Filter className="size-4 text-slate-500" />
            <span>{activeStatusLabel}</span>
            <ChevronDown className={`size-4 text-slate-400 transition-transform duration-300 ${isFilterOpen ? "rotate-180" : ""}`} />
          </button>

          {isFilterOpen && (
            <div className={`absolute z-30 mt-2 w-48 bg-white border border-slate-150 rounded-2xl shadow-xl p-1.5 animate-in fade-in slide-in-from-top-2 duration-200 ${isRtl ? "right-0" : "left-0"}`}>
              {statusOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setStatusFilter(opt.value);
                    setIsFilterOpen(false);
                  }}
                  className={`flex items-center justify-between w-full px-3.5 py-2 text-right rtl:text-right ltr:text-left text-xs md:text-sm rounded-lg hover:bg-slate-50 font-medium transition-colors ${statusFilter === opt.value ? "text-brand-primary bg-emerald-50/50" : "text-slate-700"}`}
                >
                  <span>{opt.label}</span>
                  {statusFilter === opt.value && <Check className="size-4 text-brand-primary" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sorting Dropdown */}
        <div className="relative" ref={sortRef}>
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200/80 hover:border-slate-300 rounded-xl text-xs md:text-sm font-semibold text-slate-700 transition-all shadow-xs cursor-pointer"
          >
            <ArrowUpDown className="size-4 text-slate-500" />
            <span>{t("sorting.sort_lessons")}</span>
            <ChevronDown className={`size-4 text-slate-400 transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`} />
          </button>

          {isSortOpen && (
            <div className={`absolute z-30 mt-2 w-56 bg-white border border-slate-150 rounded-2xl shadow-xl p-1.5 animate-in fade-in slide-in-from-top-2 duration-200 ${isRtl ? "right-0" : "left-0"}`}>
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setSortBy(opt.value);
                    setIsSortOpen(false);
                  }}
                  className={`flex items-center justify-between w-full px-3.5 py-2 text-right rtl:text-right ltr:text-left text-xs md:text-sm rounded-lg hover:bg-slate-50 font-medium transition-colors ${sortBy === opt.value ? "text-brand-primary bg-emerald-50/50" : "text-slate-700"}`}
                >
                  <span>{opt.label}</span>
                  {sortBy === opt.value && <Check className="size-4 text-brand-primary" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative w-full md:w-80">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t("search_placeholder")}
          className="w-full pl-10 pr-4 rtl:pr-10 rtl:pl-4 py-2.5 bg-slate-50/80 hover:bg-slate-100/60 focus:bg-white border border-slate-200/50 focus:border-brand-primary/50 focus:outline-hidden rounded-xl text-xs md:text-sm font-medium transition-all shadow-2xs placeholder-slate-400 text-slate-800"
        />
        <div className={`absolute top-1/2 -translate-y-1/2 text-slate-400 ${isRtl ? "right-3.5" : "left-3.5"}`}>
          <Search className="size-4" />
        </div>
      </div>
    </div>
  );
}
