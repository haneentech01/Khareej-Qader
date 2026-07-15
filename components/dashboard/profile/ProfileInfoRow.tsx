"use client";

import React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileInfoRowProps {
  label: string;
  value?: string | null;
  icon: LucideIcon;
  loading?: boolean;
  className?: string;
}

export function ProfileInfoRow({
  label,
  value,
  icon: Icon,
  loading = false,
  className,
}: ProfileInfoRowProps) {
  const displayValue = value || "—";

  return (
    <div
      className={cn(
        "flex items-center justify-between py-3.5 gap-4",
        className,
      )}
    >
      {loading ? (
        <div className="h-4 bg-slate-100 animate-pulse rounded-md w-1/2" />
      ) : (
        <span className="text-slate-800 font-bold text-sm truncate max-w-[55%] text-right rtl:text-right ltr:text-left">
          {displayValue}
        </span>
      )}

      <div className="flex items-center gap-1.5 shrink-0">
        <span className="text-slate-400 font-semibold text-xs md:text-sm">
          {label}
        </span>
        <div className="size-7 rounded-lg bg-slate-50 flex items-center justify-center">
          <Icon className="size-3.5 text-slate-400" />
        </div>
      </div>
    </div>
  );
}
