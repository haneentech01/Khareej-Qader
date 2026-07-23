"use client";

import { useTranslations } from "next-intl";
import { AlertCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStudentsManagement } from "@/hooks/admin/useStudentsManagement";
import { StudentsStats } from "./StudentsStats";
import { StudentsTable } from "./StudentsTable";
import { StudentsSkeleton } from "./StudentsSkeleton";

export function StudentsContent() {
  const t = useTranslations("Admin.students");
  const {
    students,
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
  } = useStudentsManagement();

  if (loading && students.length === 0) {
    return <StudentsSkeleton />;
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
            <div className="size-10 rounded-2xl bg-brand-light-green flex items-center justify-center shrink-0">
              <Users className="size-6 text-brand-primary" />
            </div>
            {t("title")}
          </h1>
          <p className="text-brand-muted text-base">
            {t("subtitle")}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <StudentsStats
        totalCount={totalCount}
        activeCount={activeCount}
        disabledCount={disabledCount}
      />

      {/* Students Filter + Table */}
      <StudentsTable
        students={students}
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
