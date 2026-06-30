"use client";

import React from "react";
import { SubmissionsTable } from "./SubmissionsTable";
import { SubmissionsHeader } from "./SubmissionsHeader";
// import { SubmissionsPagination } from "./SubmissionsPagination";
// import { SubmissionsSearchFilters } from "./SubmissionsSearchFilters";
import { useMentorSubmissions } from "@/hooks/useMentorSubmissions";


export function SubmissionsPageMentor() {
  const {
    // searchQuery,
    // setSearchQuery,
    // statusFilter,
    // setStatusFilter,
    // sortBy,
    // setSortBy,
    // currentPage,
    // setCurrentPage,
    // itemsPerPage,
    // setItemsPerPage,
    submissions,
    // totalItems,
    // totalPages,
    // startIndex,
    // endIndex,
    // stats,
  } = useMentorSubmissions();

  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 pb-12 px-4 md:px-0 animate-in fade-in duration-500">
      {/* Header with Breadcrumbs & Title */}
      <SubmissionsHeader />

      {/* Submissions Stats Cards */}
      {/* <SubmissionsStats stats={stats} /> */}

      {/* Table & Filters Card wrapper */}
      <div className="w-full flex flex-col gap-6 bg-white py-6 px-6 md:px-8 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.01)]">
        {/* Search Input & Dropdown Filters */}
        {/* <SubmissionsSearchFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        /> */}

        {/* Dynamic Data Table (using Tanstack Table) */}
        <SubmissionsTable submissions={submissions} />
      </div>

      {/* Pagination Controls */}
      {/* <SubmissionsPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        totalItems={totalItems}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
      /> */}
    </div>
  );
}
