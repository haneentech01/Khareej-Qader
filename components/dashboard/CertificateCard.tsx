"use client";

import React from "react";
import { Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface CertificateCardProps {
  progressValue: number;
  totalSteps: number;
  completedSteps: number;
}

export function CertificateCard({
  progressValue,
  totalSteps,
  completedSteps,
}: CertificateCardProps) {
  const t = useTranslations("Dashboard.certificate");

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col items-center text-center h-full">
      <div className="size-16 bg-brand-surface text-brand-base rounded-2xl flex items-center justify-center mb-6">
        <Award className="size-8" />
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">{t("title")}</h3>
      <p className="text-gray-500 text-xs mb-8 max-w-[200px] leading-relaxed">
        {t("description")}
      </p>

      <div className="w-full mb-8">
        <div className="flex justify-between items-center mb-2">
          <p className="text-[10px] font-bold text-gray-400">{t("progress_label")}</p>
          <p className="text-[10px] font-bold text-brand-base">
            {t("steps_completed", { completed: completedSteps, total: totalSteps })}
          </p>
        </div>
        <Progress value={progressValue} className="h-2 bg-gray-100 rounded-full" />
      </div>

      <Button className="w-full bg-brand-base hover:bg-brand-hover text-white rounded-xl h-12 font-bold mt-auto">
        {t("details")}
      </Button>
    </div>
  );
}
