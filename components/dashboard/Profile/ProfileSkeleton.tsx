"use client";

import React from "react";

export function ProfileSkeleton() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10 px-4 md:px-0">
      {/* Section #1: Account Info */}
      <SkeletonSection>
        {/* Username field (with lock) */}
        <SkeletonField />
        {/* Avatar field (image + upload) */}
        <div className="space-y-2">
          <div className="h-4 w-24 bg-slate-100 rounded-md animate-pulse" />
          <div className="flex items-center gap-4">
            <div className="size-16 rounded-full bg-slate-200 animate-pulse" />
            <div className="h-12 flex-1 bg-slate-100 rounded-[10px] animate-pulse" />
          </div>
        </div>
      </SkeletonSection>

      {/* Section #2: Personal Info */}
      <SkeletonSection>
        <SkeletonField />
        <SkeletonField />
        <SkeletonField />
        <SkeletonField />
      </SkeletonSection>

      {/* Section #3: Educational Info */}
      <SkeletonSection>
        <SkeletonField />
        <SkeletonField />
        <div className="md:col-span-2">
          <SkeletonField />
        </div>
      </SkeletonSection>

      {/* Footer: hint + save button */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
        <div className="h-10 w-56 bg-slate-100 rounded-full animate-pulse" />
        <div className="h-14 w-40 bg-slate-200 rounded-[10px] animate-pulse" />
      </div>
    </div>
  );
}

// Sub-skeletons
function SkeletonSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-[20px] md:rounded-[30px] p-5 md:p-7 border border-gray-50 shadow-xs">
      {/* Section title */}
      <div className="flex items-center gap-2 mb-8">
        <div className="size-7 bg-slate-200 rounded-lg animate-pulse" />
        <div className="h-7 w-40 bg-slate-200 rounded-lg animate-pulse" />
      </div>
      {/* Fields grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {children}
      </div>
    </div>
  );
}

/** حقل واحد (label + input). */
function SkeletonField() {
  return (
    <div className="space-y-2">
      <div className="h-4 w-24 bg-slate-100 rounded-md animate-pulse" />
      <div className="h-12 w-full bg-slate-100 rounded-xl animate-pulse" />
    </div>
  );
}
