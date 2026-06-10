"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export function SubmissionsHeader() {
  const t = useTranslations("MentorSubmissionsList");
  const locale = useLocale();

  const breadcrumbItems = [
    { label: t("breadcrumbs.home"), href: "/mentor" },
    { label: t("breadcrumbs.submissions") },
  ];

  return (
    <div className="space-y-4">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} locale={locale} />

      {/* Title & Subtext */}
      <div className="space-y-1.5 text-right rtl:text-right ltr:text-left">
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
