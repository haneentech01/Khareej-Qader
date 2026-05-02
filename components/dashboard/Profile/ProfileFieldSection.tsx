

import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ProfileFieldSectionProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

export function ProfileFieldSection({
  title,
  icon: Icon,
  children,
  className,
}: ProfileFieldSectionProps) {
  return (
    <div className={cn("bg-white rounded-[30px] p-7 border border-gray-50 shadow-xs", className)}>
      <div className="flex items-center gap-2 mb-8 text-brand-primary">
        <Icon className="size-7 font-bold" />
        <h3 className="text-xl md:text-2xl font-bold">{title}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {children}
      </div>
    </div>
  );
}

interface ProfileInputGroupProps {
  label: string;
  children: React.ReactNode;
}

export function ProfileInputGroup({ label, children }: ProfileInputGroupProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm md:text-base font-semibold text-brand-muted block">
        {label}
      </label>
      {children}
    </div>
  );
}
