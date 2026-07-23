"use client";

import React from "react";

export function StudentsSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white border border-slate-100 p-5 rounded-3xl flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.015)] h-24"
          >
            <div className="space-y-2 flex-1">
              <div className="h-3 w-20 bg-slate-100 rounded" />
              <div className="h-6 w-12 bg-slate-100 rounded" />
            </div>
            <div className="size-12 bg-slate-100 rounded-2xl" />
          </div>
        ))}
      </div>

      {/* Filter Bar Skeleton */}
      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.015)] flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="h-11 w-full md:w-96 bg-slate-100 rounded-2xl" />
        <div className="h-11 w-full md:w-64 bg-slate-100 rounded-2xl" />
      </div>

      {/* List Skeleton */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.015)] overflow-hidden divide-y divide-slate-100">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="size-12 rounded-2xl bg-slate-100 shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-32 bg-slate-100 rounded" />
                <div className="h-3 w-48 bg-slate-100 rounded" />
              </div>
            </div>
            <div className="h-11 w-28 bg-slate-100 rounded-2xl shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
