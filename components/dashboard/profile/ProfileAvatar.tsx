"use client";

import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { getImageUrl } from "@/lib/utils/imageUrl";

interface ProfileAvatarProps {
  src?: string | null;
  name?: string | null;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
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

function getInitial(name: string | null | undefined): string {
  if (!name) return "؟";
  const chars = Array.from(name.trim());
  const first = chars.find((c) => c.trim().length > 0);
  return first ? first.toUpperCase() : "؟";
}


export function ProfileAvatar({
  src,
  name,
  size = "md",
  className,
  showOnlineBadge = false,
}: ProfileAvatarProps) {
  const initial = getInitial(name);
  const resolvedSrc = getImageUrl(src) !== "/images/default-avatar.svg" ? getImageUrl(src) : null;

  return (
    <div className="relative inline-block shrink-0">
      <Avatar
        className={cn(
          "border border-gray-100",
          SIZE_MAP[size],
          className,
        )}
      >
        {resolvedSrc && (
          <AvatarImage src={resolvedSrc} alt={name ?? "avatar"} />
        )}
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
          className="absolute bottom-1 inset-e-1 size-3.5 bg-emerald-500 rounded-full border-2 border-white"
          aria-label="online"
        />
      )}
    </div>
  );
}
