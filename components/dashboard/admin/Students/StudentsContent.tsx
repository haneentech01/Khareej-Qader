"use client";

import { Users, UserCheck, UserX } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useEntityManagement, parseAccountStatus } from "@/hooks/admin/shared";
import endpoints from "@/lib/api/endpoints";
import { queryKeys } from "@/lib/query/keys";
import type { AdminStudent } from "@/types";
import { EntityManagementView, EntitySkeleton } from "../Layout";

export function StudentsContent() {
  const t = useTranslations("Admin.students");
  const locale = useLocale();

  const mgmt = useEntityManagement<AdminStudent>({
    queryKey: queryKeys.admin.students,
    endpoint: endpoints.admin.students,
    enableEndpoint: (slug) => endpoints.admin.enableStudent(slug),
    disableEndpoint: (slug) => endpoints.admin.disableStudent(slug),
    invalidateKey: queryKeys.admin.students,
    // ✅ تحديث counts في الـ dashboard بعد كل toggle
    additionalInvalidateKeys: [queryKeys.admin.studentsCount],
    searchFields: [
      (s) => s.full_name,
      (s) => s.email,
    ],
    getStatus: (s) => parseAccountStatus(s),
    translationNamespace: "Admin.students",
    // ✅ تجربة POST أولاً، ثم PATCH كـ fallback
    primaryMethod: "post",
    enableFallback: true,
  });

  return (
    <EntityManagementView<AdminStudent>
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
      loading={mgmt.loading}
      error={mgmt.error}
      onRetry={mgmt.refetch}
      header={{
        title: t("title"),
        subtitle: t("subtitle"),
        icon: Users,
        iconVariant: "success",
      }}
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