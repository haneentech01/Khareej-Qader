"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function TrackHeader() {
  const t = useTranslations("MentorTrack");
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-brand-muted text-xs md:text-sm">
        <Link href={`/${locale}/mentor`} className="hover:text-black transition-colors">
          {t("breadcrumbs.home")}
        </Link>
        {isRtl ? (
          <ChevronLeft className="size-4 shrink-0" />
        ) : (
          <ChevronRight className="size-4 shrink-0" />
        )}
        <span className="text-brand-primary font-medium">
          {t("breadcrumbs.track")}
        </span>
      </div>

      {/* Title & Description with Icon */}
      <div className="flex flex-col gap-2 items-start text-right rtl:text-right ltr:text-left">
        <h1 className="text-2xl md:text-3xl font-extrabold text-black tracking-tight">
          {t("header.title")}
        </h1>
        <p className="text-brand-muted text-sm md:text-base font-medium">
          {t("header.subtitle")}
        </p>
      </div>
    </div>
  );
}
