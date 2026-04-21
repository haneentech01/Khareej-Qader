"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";

interface TaskCardProps {
  title: string;
  context: string;
  deadline: string;
}

export function TaskCard({ title, context, deadline }: TaskCardProps) {
  const t = useTranslations("Dashboard.tasks");

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between h-full">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-brand-base">
            <ClipboardCheck className="size-5" />
            <span className="text-sm font-bold">{t("upcoming")}</span>
          </div>
          <div className="flex items-center gap-1.5 text-red-500 bg-red-50 px-3 py-1 rounded-full">
            <Calendar className="size-3.5" />
            <span className="text-[10px] font-bold">{t("deadline", { date: deadline })}</span>
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 text-sm">{t("context", { lesson: context })}</p>
      </div>
      
      <Button className="w-full bg-brand-base hover:bg-brand-hover text-white rounded-xl h-12 font-bold">
        {t("start")}
      </Button>
    </div>
  );
}
