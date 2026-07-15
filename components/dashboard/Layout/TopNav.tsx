"use client";

import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useDashboard } from "@/hooks/dashboard/useDashboard";
import { TopNavVariant } from "@/types";
import { useMentorDashboard } from "@/hooks/mentor/useMentorDashboard";

interface TopNavProps {
  variant?: TopNavVariant;
}

export function TopNav({ variant = "student" }: TopNavProps) {
  const t = useTranslations("Dashboard.topNav");

  const isMentor = variant === "mentor";
  const isStudent = variant === "student";

  const { dashboard } = useDashboard({ enabled: isStudent });
  const { mentorDashboard } = useMentorDashboard({ enabled: isMentor });

  const displayName = isMentor
    ? mentorDashboard?.mentor?.name || t("mentorName")
    : dashboard?.student?.name || t("userName");

  const displayEmail = isMentor
    ? mentorDashboard?.mentor?.email || t("mentorMajor")
    : dashboard?.student?.email || t("userMajor");

  const displayAvatar = isMentor
    ? mentorDashboard?.mentor?.profile_image || "/images/default-avatar.svg"
    : dashboard?.student?.profile_photo || dashboard?.student?.profile_photo || "/images/default-avatar.svg";

  return (
    <header
      className="sticky top-0 z-40 bg-white backdrop-blur-md
      border-b border-gray-100
      px-4 md:px-8 h-20 flex justify-between items-center gap-4"
    >
      {/* Trigger for mobile sidebar */}
      <div className="flex items-center gap-3 lg:hidden">
        <SidebarTrigger className="text-brand-muted hover:text-brand-primary transition-colors" />
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <Search
          className="absolute right-3 top-1/2 -translate-y-1/2
          text-brand-muted size-4"
        />
        <Input
          placeholder={t("search")}
          className="pr-10 bg-[#F4F7F5] border border-[#F1F5F9]
            focus-visible:ring-1 focus:ring-0 focus-visible:ring-brand-base
            rounded-lg h-10 text-brand-muted"
        />
      </div>

      {/* Profile & Notifications */}
      <div className="flex items-center gap-7">
        <div className="flex items-center gap-3">
          <div className="text-left hidden md:block">
            <p className="text-sm font-semibold text-black leading-tight">
              {displayName}
            </p>
            <p className="text-xs text-brand-muted">{displayEmail}</p>
          </div>
          <Avatar className="size-10 border border-brand-surface">
            <AvatarImage src={displayAvatar} />
            <AvatarFallback>
              {displayName ? Array.from(displayName)[0] : "A"}
            </AvatarFallback>
            <AvatarBadge className="bg-green-600 dark:bg-green-800" />
          </Avatar>
        </div>
      </div>
    </header>
  );
}
