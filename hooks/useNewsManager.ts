"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { NewsItem } from "@/types";

interface UseNewsManagerOptions {
  initialItems: NewsItem[];
  itemsPerPage?: number;
  debounceMs?: number;
}

export function useNewsManager({
  initialItems,
  itemsPerPage = 6,
  debounceMs = 400,
}: UseNewsManagerOptions) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [isNewestFirst, setIsNewestFirst] = useState(true);

  // Handle search debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveSearch(searchQuery);
    }, debounceMs);
    return () => clearTimeout(timer);
  }, [searchQuery, debounceMs]);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeSearch]);

  // Immediate search trigger
  const triggerImmediateSearch = useCallback(() => {
    setActiveSearch(searchQuery);
  }, [searchQuery]);

  // Filter and Sort logic
  const filteredAndSortedItems = useMemo(() => {
    const searchLower = activeSearch.toLowerCase();
    
    // 1. Filter
    const filtered = initialItems.filter((item) => {
      return (
        item.title?.toLowerCase().includes(searchLower) ||
        item.description?.toLowerCase().includes(searchLower)
      );
    });

    // 2. Sort
    // Note: Dates are strings like "أكتوبر 15, 2023" in the mock.
    // Toggling the internal array order works for this mock setup.
    // In a real app with Date objects, we would use item.date comparison.
    return isNewestFirst ? [...filtered] : [...filtered].reverse();
  }, [initialItems, activeSearch, isNewestFirst]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedItems = useMemo(() => {
    return filteredAndSortedItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedItems, startIndex, itemsPerPage]);

  const toggleSortOrder = useCallback(() => {
    setIsNewestFirst((prev) => !prev);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return {
    state: {
      currentPage,
      searchQuery,
      isNewestFirst,
      totalPages,
      displayedItems,
      totalItems: filteredAndSortedItems.length,
    },
    actions: {
      setSearchQuery,
      setCurrentPage: handlePageChange,
      toggleSortOrder,
      triggerImmediateSearch,
    },
  };
}
