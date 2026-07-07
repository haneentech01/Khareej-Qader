// components/dashboard/MyTrack/LessonItem.tsx
"use client";

import React from "react";
import { Check, Play, LockKeyholeIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { LessonStatus, PathVideo } from "@/types";

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  if (hours > 0) {
    return `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

interface LessonItemProps {
  video: PathVideo;
  status: LessonStatus;
  isLast?: boolean;
  variant?: "timeline" | "sidebar";
  isActive?: boolean;
}

export function LessonItem({
  video,
  status,
  isLast,
  variant = "timeline",
  isActive = false,
}: LessonItemProps) {

  const isSidebar = variant === "sidebar";

  const t = useTranslations(
    isSidebar ? "Dashboard.LessonViewer" : "Dashboard.MyTrack"
  );

  // ─── Status Config ───────────────────────────────────────────
  const statusConfig = {
    completed: {
      icon: Check,
      iconClass: isSidebar
        ? "w-10 h-10 rounded-full bg-brand-base flex items-center justify-center"
        : "bg-brand-base text-white border-brand-base",
      lineClass: "bg-brand-base",
      textClass: "text-black font-bold",
    },
    current: {
      icon: Play,
      iconClass: isSidebar
        ? "w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center"
        : "bg-white cursor-pointer transition-all duration-300 text-brand-base border-brand-base shadow-[0_0_0_4px_rgba(52,184,152,0.1)]",
      lineClass: "bg-gray-100",
      textClass: isSidebar
        ? cn("font-bold", isActive ? "text-brand-primary" : "text-black")
        : "text-black font-bold",
    },
    locked: {
      icon: LockKeyholeIcon,
      iconClass: isSidebar
        ? "w-8 h-8 rounded-full bg-[#E6E9E7] flex items-center justify-center"
        : "bg-gray-100 text-gray-400 border-gray-100",
      lineClass: "bg-gray-100",
      textClass: isSidebar
        ? "text-[#808080] font-bold opacity-70"
        : "text-[#808080] font-bold",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  // ─── Sidebar Content ──────────────────────────────────────────
  if (isSidebar) {
    const sidebarClass = cn(
      "flex flex-col gap-1 p-4 transition-colors",
      status === "locked" && "opacity-70 cursor-not-allowed",
      status === "current" && isActive
        ? "border-r-4 border-b border-brand-primary bg-[#0068570D]"
        : status !== "locked" && "hover:bg-slate-50 cursor-pointer"
    );

    const content = (
      <div className="flex items-start gap-2">
        <div className="shrink-0">
          <div className={cn("flex items-center justify-center", config.iconClass)}>
            <Icon
              className={cn(
                status === "locked" && "w-4 h-4 text-brand-muted",
                status === "completed" && "w-6 h-6 fill-brand-primary text-white",
                status === "current" && "w-6 h-6 text-white"
              )}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <span className={cn("text-base", config.textClass)}>
            {video.title}
          </span>
          {status === "current" && isActive && (
            <span className="text-sm text-brand-400 font-medium">
              {t("playing_now")}
            </span>
          )}
          {status !== "current" && (
            <span className="text-sm text-[#3D4945]">
              {formatDuration(video.duration)}
            </span>
          )}
        </div>
      </div>
    );

    // locked = div بدون link، غيره = link
    if (status === "locked") {
      return <div className={sidebarClass}>{content}</div>;
    }

    return (
      <Link
        href={`/dashboard/my-track/lessons/${video.id}`}
        className={sidebarClass}
      >
        {content}
      </Link>
    );
  }

  // ─── Timeline Content ─────────────────────────────────────────
  const timelineContent = (
    <div className="flex items-center flex-row justify-between gap-4">
      <div>
        <p className="text-xs text-brand-primary font-bold mb-1">
          {t("lesson_prefix")} {video.index + 1}
        </p>
        <h4 className={cn("text-base", config.textClass)}>
          {video.title}
        </h4>
      </div>

      {video.duration && (
        <span
          dir="ltr"
          className={cn(
            "px-3 py-1.5 rounded-md text-xs font-bold shadow-sm",
            status === "current"
              ? "bg-white text-brand-base"
              : "bg-gray-100 text-gray-500"
          )}
        >
          {formatDuration(video.duration)}
        </span>
      )}
    </div>
  );

  return (
    <div className="flex gap-6 items-stretch min-h-[100px]">
      {/* Icon + Line */}
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "size-10 rounded-full border-2",
            "flex items-center justify-center z-10 shrink-0",
            "transition-all duration-300",
            config.iconClass
          )}
        >
          <Icon className="size-5" />
        </div>
        {!isLast && (
          <div
            className={cn(
              "w-0.5 grow my-2 transition-colors duration-300",
              config.lineClass
            )}
          />
        )}
      </div>

      {/* Content */}
      <div className={cn("flex-1 pb-10", status === "current" && "pb-6")}>
        {status === "locked" ? (
          <div className="flex flex-col">{timelineContent}</div>
        ) : (
          <Link
            href={`/dashboard/my-track/lessons/${video.id}`}
            className={cn(
              "flex flex-col transition-all duration-300",
              status === "current" &&
              "bg-[#F4F7F5] w-full cursor-pointer hover:scale-[1.01] active:scale-[0.99] border border-[#006B561A] py-4 px-8 rounded-[48px]",
              status === "completed" && "cursor-pointer hover:bg-gray-50/50"
            )}
          >
            {timelineContent}
          </Link>
        )}
      </div>
    </div>
  );
}