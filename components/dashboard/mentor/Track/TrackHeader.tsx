"use client";

import { useTranslations } from "next-intl";

export function TrackHeader() {
  const t = useTranslations("MentorTrack");

  return (
    <div className="space-y-6">
      {/* Title & Description with Icon */}
      <div className="flex flex-col gap-2 items-start text-right rtl:text-right ltr:text-left">
        <h1 className="text-2xl md:text-3xl font-extrabold text-black tracking-tight">
          {t("header.title")}
        </h1>
        <p className="text-brand-muted text-xs md:text-sm">
          {t("header.subtitle")}
        </p>
      </div>
    </div>
  );
}
