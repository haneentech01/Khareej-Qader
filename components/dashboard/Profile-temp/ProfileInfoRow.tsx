"use client";

import React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileInfoRowProps {
  /** الـ label (مثال: "الاسم الكامل") */
  label: string;
  /** الـ value (مثال: "أحمد محمد") */
  value?: string | null;
  /** الأيقونة اللي بتظهر قبل الـ label */
  icon: LucideIcon;
  /** هل نحن في حالة تحميل؟ → نعرض skeleton */
  loading?: boolean;
  /** className إضافية */
  className?: string;
}

/**
 * ProfileInfoRow — صف معلومات read-only للعرض (مش تعديل).
 *
 * يستخدم في:
 *  - MentorProfileInfo: عرض الاسم / البريد / التخصص / المسار.
 *  - StudentProfileInfo (لو حابب تعرضها بشكل read-only بدل form inputs).
 *  - أي مكان محتاج فيه صف "label + value" بترتيب RTL.
 *
 * الترتيب (RTL):
 *   [value على اليمين] [label + icon على اليسار]
 *
 * مثال:
 *   <ProfileInfoRow label="البريد" value="user@example.com" icon={Mail} />
 */
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
      {/* Value على اليمين (RTL) */}
      {loading ? (
        <div className="h-4 bg-slate-100 animate-pulse rounded-md w-1/2" />
      ) : (
        <span className="text-slate-800 font-bold text-sm truncate max-w-[55%] text-right rtl:text-right ltr:text-left">
          {displayValue}
        </span>
      )}

      {/* Label + icon على اليسار (RTL) */}
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
