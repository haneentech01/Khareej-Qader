"use client";

import React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileInfoPillProps {
  /** الأيقونة اللي بتظهر قبل النص */
  icon: LucideIcon;
  /** النص */
  text: string;
  /** لون الأيقونة + الخلفية (Tailwind classes) */
  iconBgClass?: string;
  iconColorClass?: string;
  /** className إضافية */
  className?: string;
}

/**
 * ProfileInfoPill — badge صغير يعرض معلومة بأيقونة.
 *
 * يستخدم في:
 *  - MentorProfileHeader: عرض البريد + التخصص + الموقع كـ pills.
 *  - StudentProfileHeader: ممكن يستخدم نفس الـ pattern.
 *  - أي مكان محتاج فيه عرض معلومة سريعة بشكل مرئي.
 *
 * مثال:
 *   <ProfileInfoPill icon={Mail} text="user@example.com" />
 *   <ProfileInfoPill icon={Phone} text="+970..." iconBgClass="bg-blue-50" iconColorClass="text-blue-500" />
 */
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
