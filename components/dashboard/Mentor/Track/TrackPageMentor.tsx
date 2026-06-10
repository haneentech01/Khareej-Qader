"use client";

import React from "react";
import { TrackHeader } from "./TrackHeader";
import { TrackSearchFilters } from "./TrackSearchFilters";
import { TrackLessonsTable } from "./TrackLessonsTable";
import { TrackPagination } from "./TrackPagination";
import { useMentorTrack } from "@/hooks/useMentorTrack";

export function TrackPageMentor() {
  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    lessons,
    totalItems,
    totalPages,
    startIndex,
    endIndex,
  } = useMentorTrack();

  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 pb-12 px-4 md:px-0 animate-in fade-in duration-500">
      {/* Header with Breadcrumbs, Title and Description */}
      <TrackHeader />

      <div className="w-full flex flex-col gap-6 bg-white py-4 px-8 rounded-3xl">
        {/* Search and Filters */}
        <TrackSearchFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Lessons Table */}
        <TrackLessonsTable lessons={lessons} />
      </div>

      {/* Pagination Controls */}
      <TrackPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        totalItems={totalItems}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
      />
    </div>
  );
}
