"use client";

import React from "react";
import { Users2, UserCheck, UserX } from "lucide-react";

interface MentorsStatsProps {
  totalCount: number;
  activeCount: number;
  disabledCount: number;
}

export function MentorsStats({
  totalCount,
  activeCount,
  disabledCount,
}: MentorsStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
      {/* Total Mentors */}
      <div className="bg-white border border-slate-100 p-5 rounded-3xl flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.015)]">
        <div className="space-y-1 text-right rtl:text-right ltr:text-left">
          <span className="text-slate-500 text-xs md:text-sm font-bold block">
            إجمالي المنتورات
          </span>
          <span className="text-black font-extrabold text-2xl md:text-3xl block">
            {totalCount}
          </span>
        </div>
        <div className="size-13 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0">
          <Users2 className="size-6 text-slate-600" />
        </div>
      </div>

      {/* Active Mentors */}
      <div className="bg-white border border-emerald-100/60 p-5 rounded-3xl flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.015)]">
        <div className="space-y-1 text-right rtl:text-right ltr:text-left">
          <span className="text-slate-500 text-xs md:text-sm font-bold block">
            الحسابات المفعّلة
          </span>
          <span className="text-brand-primary font-extrabold text-2xl md:text-3xl block">
            {activeCount}
          </span>
        </div>
        <div className="size-13 rounded-2xl bg-brand-light-green flex items-center justify-center shrink-0">
          <UserCheck className="size-6 text-brand-primary" />
        </div>
      </div>

      {/* Disabled Mentors */}
      <div className="bg-white border border-red-100/60 p-5 rounded-3xl flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.015)]">
        <div className="space-y-1 text-right rtl:text-right ltr:text-left">
          <span className="text-slate-500 text-xs md:text-sm font-bold block">
            الحسابات المعطّلة
          </span>
          <span className="text-red-600 font-extrabold text-2xl md:text-3xl block">
            {disabledCount}
          </span>
        </div>
        <div className="size-13 rounded-2xl bg-red-50 flex items-center justify-center shrink-0">
          <UserX className="size-6 text-red-500" />
        </div>
      </div>
    </div>
  );
}
