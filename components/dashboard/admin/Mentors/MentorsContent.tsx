"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { AlertCircle, Users2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMentorsManagement } from "@/hooks/admin/useMentorsManagement";
import { MentorsStats } from "./MentorsStats";
import { MentorsTable } from "./MentorsTable";
import { MentorsSkeleton } from "./MentorsSkeleton";

export function MentorsContent() {
  const t = useTranslations("Admin.mentors");
  const {
    mentors,
    totalCount,
    activeCount,
    disabledCount,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    loadingSlug,
    handleToggleAccount,
    loading,
    error,
    refetch,
  } = useMentorsManagement();

  if (loading && mentors.length === 0) {
    return <MentorsSkeleton />;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-16">
        <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
          <div className="size-16 rounded-3xl bg-red-50 flex items-center justify-center">
            <AlertCircle className="size-8 text-red-500" />
          </div>
          <p className="text-red-500 font-semibold text-center max-w-md">
            حدث خطأ أثناء تحميل البيانات
          </p>
          <Button onClick={() => refetch()} variant="outline" className="rounded-xl">
            إعادة المحاولة
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-black tracking-tight flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
              <Users2 className="size-6 text-blue-600" />
            </div>
            {t("title")}
          </h1>
          <p className="text-brand-muted text-base">{t("subtitle")}</p>
        </div>

        <Button
          onClick={() => refetch()}
          variant="outline"
          className="rounded-2xl border-slate-200 text-slate-600 hover:bg-slate-50 gap-2"
        >
          <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
          <span>{t("refresh-btn")}</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <MentorsStats
        totalCount={totalCount}
        activeCount={activeCount}
        disabledCount={disabledCount}
      />

      {/* Mentors Filter + Table */}
      <MentorsTable
        mentors={mentors}
        totalCount={totalCount}
        activeCount={activeCount}
        disabledCount={disabledCount}
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        loadingSlug={loadingSlug}
        handleToggleAccount={handleToggleAccount}
      />
    </div>
  );
}
