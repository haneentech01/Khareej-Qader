"use client";

import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

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

function normalizeImageUrl(url?: string | null): string | null {
  if (!url) return null;
  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("data:") ||
    url.startsWith("blob:")
  ) {
    return url;
  }
  const proxyBase = "/api/proxy/";
  const cleanPath = url.startsWith("/") ? url.slice(1) : url;
  if (cleanPath.startsWith("storage/")) {
    return `${proxyBase}${cleanPath}`;
  }
  return `${proxyBase}storage/${cleanPath}`;
}

export function ProfileAvatar({
  src,
  name,
  size = "md",
  className,
  showOnlineBadge = false,
}: ProfileAvatarProps) {
  const initial = getInitial(name);
  const normalizedSrc = normalizeImageUrl(src);

  return (
    <div className="relative inline-block shrink-0">
      <Avatar
        className={cn(
          "border border-gray-100",
          SIZE_MAP[size],
          className,
        )}
      >
        {normalizedSrc && (
          <AvatarImage src={normalizedSrc} alt={name ?? "avatar"} />
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
