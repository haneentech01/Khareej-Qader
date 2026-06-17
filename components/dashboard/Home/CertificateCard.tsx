"use client";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";

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
    <div className="bg-white rounded-[30px] p-8 border border-slate-100
     shadow-sm flex flex-col items-start h-full">
      {/* icon and title */}
      <div className="flex items-center gap-2.5 mb-4">
        <Image
          src="/images/icons/certificate.png"
          alt="certificate"
          width={40}
          height={40}
          className="flex items-center justify-center w-auto h-auto"
        />
        <h3 className="text-xl font-bold text-brand-base">
          {t("title")}
        </h3>
      </div>

      {/* description */}
      <p className="text-black text-xs mb-5 leading-relaxed">
        {t("description")}
      </p>

      {/* progress */}
      <div className="w-full mb-8">
        <div className="flex justify-between items-center mb-2">
          <p className="text-xs text-brand-muted">
            {t("progress_label")}
          </p>
          <p className="text-xs text-brand-base">
            {t("steps_completed", { completed: completedSteps, total: totalSteps })}
          </p>
        </div>
        <Progress
          value={progressValue}
          aria-label={t("progress_label")}
          className="h-3 bg-[#E6E9E7] 
            [&>div]:bg-brand-base
            rounded-full rtl:rotate-180 
            w-full max-w-[555px]"
        />

      </div>

      {/* button */}
      <Button className="w-full bg-brand-primary hover:bg-brand-hover/90
      cursor-pointer text-white rounded-[10px] h-12 font-semibold">
        {t("details")}
      </Button>
    </div>
  );
}
