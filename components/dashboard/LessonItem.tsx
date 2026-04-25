"use client";

import React from "react";
import { Check, Play, Lock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export type LessonStatus = "completed" | "current" | "locked";

interface LessonItemProps {
  number: number;
  title: string;
  duration?: string;
  status: LessonStatus;
  isLast?: boolean;
}

export function LessonItem({
  number,
  title,
  duration,
  status,
  isLast,
}: LessonItemProps) {
  const t = useTranslations("Dashboard.MyTrack");

  const statusConfig = {
    completed: {
      icon: Check,
      iconClass: "bg-brand-base text-white border-brand-base",
      lineClass: "bg-brand-base",
      textClass: "text-black",
      badge: t("status_completed"),
      containerClass: "",
    },
    current: {
      icon: Play,
      iconClass: "bg-white text-brand-base border-brand-base shadow-[0_0_0_4px_rgba(52,184,152,0.1)]",
      lineClass: "bg-gray-100",
      textClass: "text-black font-bold",
      badge: t("status_current"),
      containerClass: "bg-[#F4F7F5] border border-brand-surface py-6 px-10 rounded-[30px]",
    },
    locked: {
      icon: Lock,
      iconClass: "bg-gray-100 text-gray-400 border-gray-100",
      lineClass: "bg-gray-100",
      textClass: "text-gray-400",
      badge: t("status_locked"),
      containerClass: "",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className="flex gap-6 items-stretch min-h-[100px]">
      {/* Timeline Line & Icon */}
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "size-10 rounded-full border-2 flex items-center justify-center z-10 shrink-0 transition-all duration-300",
            config.iconClass
          )}
        >
          <Icon className="size-5" />
        </div>
        {!isLast && (
          <div
            className={cn(
              "w-0.5 grow mt-2 mb-2 transition-colors duration-300",
              config.lineClass
            )}
          />
        )}
      </div>

      {/* Content */}
      <div className={cn("flex-1 pb-10 transition-all duration-300", status === "current" && "pb-6")}>
        <div className={cn("inline-flex flex-col gap-1 transition-all duration-300", config.containerClass)}>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-xs text-brand-muted mb-1">
                {t("lesson_prefix")} {number}
              </p>
              <h4 className={cn("text-lg", config.textClass)}>{title}</h4>
            </div>

            {status === "current" && duration && (
              <span className="bg-white px-3 py-1.5 rounded-full text-brand-base text-xs font-bold shadow-sm">
                {duration}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
