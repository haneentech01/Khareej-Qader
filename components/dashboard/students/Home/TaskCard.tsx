"use client";

import { Button } from "@/components/ui/button";
import { Calendar, ClipboardClock } from "lucide-react";
import { useTranslations } from "next-intl";

interface TaskCardProps {
  title: string;
  context: string;
  deadline?: string;
  description: string;
  videoName?: string;
}

export function TaskCard({ title, context, deadline, description, videoName }: TaskCardProps) {
  const t = useTranslations("Dashboard.tasks");

  return (
    <div className="bg-white rounded-[30px] p-8
     shadow-sm border border-slate-100
     flex flex-col h-full">
      <div className="mb-7">
        <div className="flex justify-between items-center mb-7">
          {/* Upcoming */}
          <div className="flex items-center gap-2 text-brand-primary">
            <ClipboardClock className="size-6" />
            <span className="text-xl font-bold">
              {t("upcoming")}
            </span>
          </div>
          {/* Deadline */}

          {deadline ? (
            <div className="flex items-center gap-2 text-[#93000A]">
              <Calendar className="size-4" />
              <span className="text-sm">
                {t("deadline", { date: deadline })}
              </span>
            </div>
          ) : null}
        </div>

        {/* Task Title */}
        <h3 className="text-xl font-bold text-black mb-1">
          {title}
        </h3>

        <p className="text-brand-muted mb-7">
          {description}
        </p>

        {/* Task Context */}
        <p className="text-brand-primary font-bold">
          {t("context", { lesson: context })}
          {videoName}
        </p>
      </div>
    </div>
  );
}
