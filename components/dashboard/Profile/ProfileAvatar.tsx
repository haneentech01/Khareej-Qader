"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { t } from "media-chrome";

interface ProfileAvatarProps {
  /** URL الصورة (أو null لو مفيش صورة) */
  src?: string | null;
  /** اسم المستخدم — نستخدم أول حرف منه كـ fallback */
  name?: string | null;
  /** حجم الصورة: sm=32px, md=40px, lg=64px, xl=96px */
  size?: "sm" | "md" | "lg" | "xl";
  /** className إضافية */
  className?: string;
  /** هل نعرض مؤشر "online" (نقطة خضرا)؟ */
  showOnlineBadge?: boolean;
}

const SIZE_MAP = {
  sm: "size-8",
  md: "size-10",
  lg: "size-16",
  xl: "size-24",
} as const;

const TEXT_SIZE_MAP = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-xl",
  xl: "text-3xl",
} as const;

/**
 * يستخرج أول حرف صالح من الاسم (آمن للـ emoji والحروف العربية المركّبة).
 * نستخدم Array.from بدل name[0] لتفادي مشكلة الـ surrogates.
 */
function getInitial(name: string | null | undefined): string {
  if (!name) return "";
  const chars = Array.from(name.trim());
  const first = chars.find((c) => c.trim().length > 0);
  return first ? first.toUpperCase() : "";
}

/**
 * ProfileAvatar — Avatar قابل لإعادة الاستخدام لكل صفحات البروفايل.
 *
 * المميزات:
 *  - لو src = null → يعرض أول حرف من name في دائرة خضرا.
 *  - لو src موجود لكن فشل التحميل → يعرض الـ fallback تلقائياً (shadcn Avatar behavior).
 *  - أحجام قياسية: sm (32px), md (40px), lg (64px), xl (96px).
 *  - online badge اختياري (نقطة خضرا في الزاوية).
 *
 * مثال:
 *   <ProfileAvatar src={user.photo} name={user.name} size="lg" showOnlineBadge />
 */
export function ProfileAvatar({
  src,
  name,
  size = "md",
  className,
  showOnlineBadge = false,
}: ProfileAvatarProps) {
  const initial = getInitial(name);

  return (
    <div className="relative inline-block shrink-0">
      <Avatar
        className={cn(
          "border border-gray-100",
          SIZE_MAP[size],
          className,
        )}
      >
        {src && <AvatarImage src={src} alt={name ?? "avatar"} />}
        <AvatarFallback
          className={cn(
            "bg-brand-light-green text-brand-primary font-bold",
            TEXT_SIZE_MAP[size],
          )}
        >
          {initial}
        </AvatarFallback>
      </Avatar>

      {showOnlineBadge && (
        <span
          className="absolute bottom-1 inset-e-1 size-3.5
           bg-brand-primary rounded-full border-2 border-white"
          aria-label="online"
        />
      )}
    </div>
  );
}
