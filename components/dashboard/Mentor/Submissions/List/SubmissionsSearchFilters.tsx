"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Search, Filter, ArrowUpDown, ChevronDown, Check } from "lucide-react";
import { SubmissionStatus } from "@/types";

interface SubmissionsSearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: "all" | SubmissionStatus;
  setStatusFilter: (filter: "all" | SubmissionStatus) => void;
  sortBy: "newest" | "oldest" | "student_name";
  setSortBy: (sort: "newest" | "oldest" | "student_name") => void;
}

export function SubmissionsSearchFilters({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
}: SubmissionsSearchFiltersProps) {
  const t = useTranslations("MentorSubmissionsList");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
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

  const statusOptions: { value: "all" | SubmissionStatus; label: string }[] = [
    { value: "all", label: t("filters.all") },
    { value: "pending", label: t("stats.awaiting_evaluation") },
    { value: "evaluated", label: t("stats.evaluated") },
    { value: "late", label: t("stats.late") },
    { value: "not_submitted", label: t("stats.not_submitted") },
  ];

  const sortOptions: { value: typeof sortBy; label: string }[] = [
    { value: "newest", label: t("sorting.newest") },
    { value: "oldest", label: t("sorting.oldest") },
    { value: "student_name", label: t("sorting.student_name") },
  ];

  const activeStatusLabel = statusOptions.find((opt) => opt.value === statusFilter)?.label || t("filters.all");

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 items-stretch md:items-center justify-between w-full select-none">
      {/* Filters and Sorting Controls (Left Side in RTL) */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        {/* Status Dropdown labeled "الكل" or current status */}
        <div className="relative" ref={filterRef}>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200/80 hover:border-slate-350 rounded-xl text-xs md:text-sm font-bold text-slate-700 hover:text-black transition-all shadow-2xs cursor-pointer"
          >
            <span>{activeStatusLabel}</span>
            <ChevronDown
              className={`size-4 text-slate-400 transition-transform duration-300 ${
                isFilterOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isFilterOpen && (
            <div
              className={`absolute z-30 mt-2 w-48 bg-white border border-slate-150 rounded-2xl shadow-xl p-1.5 animate-in fade-in slide-in-from-top-2 duration-200 ${
                isRtl ? "right-0" : "left-0"
              }`}
            >
              {statusOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setStatusFilter(opt.value);
                    setIsFilterOpen(false);
                  }}
                  className={`flex items-center justify-between w-full px-3.5 py-2 text-right rtl:text-right ltr:text-left text-xs md:text-sm rounded-lg hover:bg-slate-50 font-bold transition-colors ${
                    statusFilter === opt.value ? "text-brand-primary bg-emerald-50/50" : "text-slate-700"
                  }`}
                >
                  <span>{opt.label}</span>
                  {statusFilter === opt.value && <Check className="size-4 text-brand-primary" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filter Icon Button (Green Highlighted Box) */}
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center justify-center p-2.5 rounded-xl border transition-all cursor-pointer shadow-2xs ${
              statusFilter !== "all"
                ? "bg-brand-light border-brand-primary/50 text-brand-primary"
                : "bg-white border-slate-200/80 hover:border-slate-350 text-brand-primary"
            }`}
          >
            <Filter className="size-4" />
          </button>
        </div>

        {/* Sort Dropdown labeled "ترتيب التسليمات" */}
        <div className="relative" ref={sortRef}>
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200/80 hover:border-slate-350 rounded-xl text-xs md:text-sm font-bold text-slate-700 hover:text-black transition-all shadow-2xs cursor-pointer"
          >
            <ArrowUpDown className="size-4 text-slate-500" />
            <span>{t("filters.sort_label")}</span>
            <ChevronDown
              className={`size-4 text-slate-400 transition-transform duration-300 ${
                isSortOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isSortOpen && (
            <div
              className={`absolute z-30 mt-2 w-52 bg-white border border-slate-150 rounded-2xl shadow-xl p-1.5 animate-in fade-in slide-in-from-top-2 duration-200 ${
                isRtl ? "right-0" : "left-0"
              }`}
            >
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    setSortBy(opt.value);
                    setIsSortOpen(false);
                  }}
                  className={`flex items-center justify-between w-full px-3.5 py-2 text-right rtl:text-right ltr:text-left text-xs md:text-sm rounded-lg hover:bg-slate-50 font-bold transition-colors ${
                    sortBy === opt.value ? "text-brand-primary bg-emerald-50/50" : "text-slate-700"
                  }`}
                >
                  <span>{opt.label}</span>
                  {sortBy === opt.value && <Check className="size-4 text-brand-primary" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Search Input (Right Side in RTL) */}
      <div className="relative w-full md:w-80">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t("filters.search_placeholder")}
          className="w-full pl-4 pr-10 rtl:pr-10 rtl:pl-4 py-2.5 bg-slate-50/50 hover:bg-slate-100/40 focus:bg-white border border-slate-200/50 focus:border-brand-primary/50 focus:outline-hidden rounded-xl text-xs md:text-sm font-semibold transition-all shadow-2xs placeholder-slate-400 text-slate-800"
        />
        <div className={`absolute top-1/2 -translate-y-1/2 text-slate-400 ${isRtl ? "right-3.5" : "left-3.5"}`}>
          <Search className="size-4" />
        </div>
      </div>
    </div>
  );
}
