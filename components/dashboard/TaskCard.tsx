"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, Calendar, ClipboardClock } from "lucide-react";
import { useTranslations } from "next-intl";

interface TaskCardProps {
  title: string;
  context: string;
  deadline: string;
}

export function TaskCard({ title, context, deadline }: TaskCardProps) {
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
          <div className="flex items-center gap-2 text-[#93000A]">
            <Calendar className="size-4" />
            <span className="text-sm">
              {t("deadline", { date: deadline })}
            </span>
          </div>
        </div>

        {/* Task Title */}
        <h3 className="text-xl font-bold text-[#191C1B] mb-2.5">
          {title}
        </h3>

        {/* Task Context */}
        <p className="text-brand-muted">
          {t("context", { lesson: context })}
        </p>
      </div>

      <Button className="w-full bg-brand-primary hover:bg-brand-hover/90
      cursor-pointer text-white rounded-[10px] h-12 font-semibold">
        {t("start")}
      </Button>
    </div>
  );
}
