"use client";

import React from "react";
import { Check, Play, LockKeyholeIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { LessonItemProps } from "@/types";

export function LessonItem({
  id,
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
      textClass: "text-black font-bold",
      badge: t("status_completed"),
      containerClass: "",
    },
    current: {
      icon: Play,
      iconClass: "bg-white cursor-pointer transition-all duration-300 text-brand-base border-brand-base shadow-[0_0_0_4px_rgba(52,184,152,0.1)]",
      lineClass: "bg-gray-100",
      textClass: "text-black font-bold",
      badge: t("status_current"),
      containerClass: "bg-[#F4F7F5] w-full cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 border border-[#006B561A] py-4 px-8 rounded-[48px]",
    },
    locked: {
      icon: LockKeyholeIcon,
      iconClass: "bg-gray-100 text-gray-400 border-gray-100",
      lineClass: "bg-gray-100",
      textClass: "text-[#808080] font-bold",
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
      <div className={cn(
        "flex-1 pb-10 transition-all duration-300",
        status === "current" && "pb-6")
      }>
        {status === "current" ? (
          <Link
            href={`/dashboard/my-track/lessons/${id}`}
            className={cn(
              "flex flex-col transition-all duration-300",
              config.containerClass
            )}
          >
            <div className="flex items-center flex-col md:flex-row justify-between gap-4">
              <div>
                <p className="text-xs text-brand-primary font-bold mb-1">
                  {t("lesson_prefix")} {number}
                </p>
                <h4 className={cn("text-lg", config.textClass)}>
                  {title}
                </h4>
              </div>

              {duration && (
                <span className="bg-white px-3 py-1.5 rounded-md 
                text-brand-base text-xs font-bold shadow-sm">
                  {duration}
                </span>
              )}
            </div>
          </Link>
        ) : (
          <div className={cn(
            "flex flex-col transition-all duration-300",
            config.containerClass
          )}>
            <div className="flex items-center flex-col md:flex-row justify-between gap-4">
              <div>
                <p className="text-xs text-brand-primary font-bold mb-1">
                  {t("lesson_prefix")} {number}
                </p>
                <h4 className={cn("text-lg", config.textClass)}>
                  {title}
                </h4>
              </div>

              {status === "completed" && duration && (
                <span className="bg-gray-100 px-3 py-1.5 rounded-md 
                text-gray-500 text-xs font-bold shadow-sm">
                  {duration}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
