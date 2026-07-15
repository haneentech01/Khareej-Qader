"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileInfoPillProps {
  icon: LucideIcon;
  text: string;
  iconBgClass?: string;
  iconColorClass?: string;
  className?: string;
}

export function ProfileInfoPill({
  icon: Icon,
  text,
  iconBgClass = "bg-slate-50",
  iconColorClass = "text-brand-primary",
  className,
}: ProfileInfoPillProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2",
        className,
      )}
    >
      <div
        className={cn(
          "size-7 rounded-lg flex items-center justify-center shrink-0",
          iconBgClass,
        )}
      >
        <Icon className={cn("size-3.5", iconColorClass)} />
      </div>
      <span className="text-slate-600 text-xs font-semibold truncate">
        {text}
      </span>
    </div>
  );
}
