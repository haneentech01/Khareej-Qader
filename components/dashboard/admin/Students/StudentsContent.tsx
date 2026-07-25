// "use client";

// import { useTranslations } from "next-intl";
// import { AlertCircle, Users } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useStudentsManagement } from "@/hooks/admin/useStudentsManagement";
// import { StudentsStats } from "./StudentsStats";
// import { StudentsTable } from "./StudentsTable";
// import { SkeletonPage } from "../Layout/SkeletonPage";

// export function StudentsContent() {
//   const t = useTranslations("Admin.students");
//   const {
//     students,
//     totalCount,
//     activeCount,
//     disabledCount,
//     search,
//     setSearch,
//     statusFilter,
//     setStatusFilter,
//     loadingSlug,
//     handleToggleAccount,
//     loading,
//     error,
//     refetch,
//   } = useStudentsManagement();

//   if (loading && students.length === 0) {
//     return <SkeletonPage />;
//   }

//   if (error) {
//     return (
//       <div className="max-w-7xl mx-auto py-16">
//         <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
//           <div className="size-16 rounded-3xl bg-red-50 flex items-center justify-center">
//             <AlertCircle className="size-8 text-red-500" />
//           </div>
//           <p className="text-red-500 font-semibold text-center max-w-md">
//             حدث خطأ أثناء تحميل البيانات
//           </p>
//           <Button onClick={() => refetch()} variant="outline" className="rounded-xl">
//             إعادة المحاولة
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8 max-w-7xl mx-auto">
//       {/* Page Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div className="space-y-1">
//           <h1 className="text-3xl font-extrabold text-black tracking-tight flex items-center gap-3">
//             <div className="size-10 rounded-2xl bg-brand-light-green flex items-center justify-center shrink-0">
//               <Users className="size-6 text-brand-primary" />
//             </div>
//             {t("title")}
//           </h1>
//           <p className="text-brand-muted text-base">
//             {t("subtitle")}
//           </p>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <StudentsStats
//         totalCount={totalCount}
//         activeCount={activeCount}
//         disabledCount={disabledCount}
//       />

//       {/* Students Filter + Table */}
//       <StudentsTable
//         students={students}
//         totalCount={totalCount}
//         activeCount={activeCount}
//         disabledCount={disabledCount}
//         search={search}
//         setSearch={setSearch}
//         statusFilter={statusFilter}
//         setStatusFilter={setStatusFilter}
//         loadingSlug={loadingSlug}
//         handleToggleAccount={handleToggleAccount}
//       />
//     </div>
//   );
// }

"use client";

import React from "react";
import { Users, UserCheck, UserX } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useEntityManagement } from "@/hooks/admin/shared";

import endpoints from "@/lib/api/endpoints";
import { queryKeys } from "@/lib/query/keys";
import type { AdminStudent } from "@/types";
import { EntityManagementView, EntitySkeleton } from "../Layout";

/**
 * StudentsContent
 *
 * صفحة إدارة الطلاب — تستخدم المكونات المشتركة (EntityManagementView)
 * والـ hook الموحّد (useEntityManagement).
 *
 * Responsibility:
 *  - تعريف config الكيان (endpoint, queryKey, fields)
 *  - تمرير الـ labels المترجمة
 *  - تمرير الـ selectors الخاصة بـ AdminStudent
 *
 * أصبحت الآن 60 سطر بدلاً من 90+ سطر مع تكرار 90% مع MentorsContent.
 */
export function StudentsContent() {
  const t = useTranslations("Admin.students");
  const locale = useLocale();

  const mgmt = useEntityManagement<AdminStudent>({
    queryKey: queryKeys.admin.students,
    endpoint: endpoints.admin.students,
    enableEndpoint: (slug) => endpoints.admin.enableStudent(slug),
    disableEndpoint: (slug) => endpoints.admin.disableStudent(slug),
    invalidateKey: queryKeys.admin.students,
    searchFields: [
      (s) => s.full_name,
      (s) => s.email,
    ],
    getStatus: (s) => s.account_status,
    translationNamespace: "Admin.students",
  });

  return (
    <EntityManagementView<AdminStudent>
      // data + filters + toggle
      entities={mgmt.entities}
      totalCount={mgmt.totalCount}
      activeCount={mgmt.activeCount}
      disabledCount={mgmt.disabledCount}
      search={mgmt.search}
      onSearchChange={mgmt.setSearch}
      statusFilter={mgmt.statusFilter}
      onStatusFilterChange={mgmt.setStatusFilter}
      loadingSlug={mgmt.loadingSlug}
      onToggleAccount={mgmt.handleToggleAccount}
      // states
      loading={mgmt.loading}
      error={mgmt.error}
      onRetry={mgmt.refetch}
      // header config
      header={{
        title: t("title"),
        subtitle: t("subtitle"),
        icon: Users,
        iconVariant: "success",
        showRefreshButton: true,
        refreshLabel: t("refresh-btn"),
      }}
      // stats labels + icons
      statsLabels={{
        total: t("stats.total"),
        active: t("stats.active"),
        disabled: t("stats.disabled"),
      }}
      statsIcons={{
        total: Users,
        active: UserCheck,
        disabled: UserX,
      }}
      // table labels
      tableLabels={{
        search: t("search_placeholder"),
        viewAll: t("view.all"),
        viewActive: t("view.active"),
        viewDisabled: t("view.disabled"),
        joinDate: t("join_date"),
        colEntity: t("col.entity"),
        colStatus: t("col.status"),
        colContact: t("col.contact"),
        colActions: t("col.actions"),
        activeLabel: t("account.active"),
        disabledLabel: t("account.disabled"),
        disableLabel: t("account.disable"),
        enableLabel: t("account.enable"),
        emptyTitle: t("empty.title"),
      }}
      entityName={{
        singular: t("entity.singular"),
        plural: t("entity.plural"),
      }}
      locale={locale}
      // selectors for AdminStudent
      getEntityId={(s) => s.slug || String(s.id)}
      getEntityName={(s) => s.full_name}
      getEntityEmail={(s) => s.email}
      getEntityCreatedAt={(s) => s.created_at}
      getEntityAvatarVariant={() => "emerald"}
      inactiveVariant="success"
      skeleton={<EntitySkeleton />}
    />
  );
}

export default StudentsContent;
