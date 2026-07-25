"use client";

import React from "react";
import { useTranslations } from "next-intl";

export function AdminDashboardHeader() {
  const t = useTranslations("Admin.dashboard.header");

  return (
    <div className="mb-8 md:mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="space-y-1 md:space-y-2 text-right rtl:text-right ltr:text-left">
        <h1 className="text-3xl lg:text-4xl font-bold text-black tracking-tight">
          {t("title")}
        </h1>
        <p className="text-brand-muted text-base lg:text-lg">
          {t("subtitle")}
        </p>
      </div>
    </div>
  );
}

export default AdminDashboardHeader;
