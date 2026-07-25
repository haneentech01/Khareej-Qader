"use client";

import { Users2, UserCheck, UserX } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useEntityManagement } from "@/hooks/admin/shared";
import endpoints from "@/lib/api/endpoints";
import { queryKeys } from "@/lib/query/keys";
import type { AdminMentor } from "@/types";
import { EntityManagementView, EntitySkeleton } from "../Layout";

export function MentorsContent() {
  const t = useTranslations("Admin.mentors");
  const locale = useLocale();

  const mgmt = useEntityManagement<AdminMentor>({
    queryKey: queryKeys.admin.mentors,
    endpoint: endpoints.admin.mentors,
    enableEndpoint: (slug) => endpoints.admin.enableMentor(slug),
    disableEndpoint: (slug) => endpoints.admin.disableMentor(slug),
    invalidateKey: queryKeys.admin.mentors,
    searchFields: [
      (m) => m.name,
      (m) => m.email,
      (m) => m.city,
    ],
    getStatus: (m) => m.account_status,
    translationNamespace: "Admin.mentors",
  });

  return (
    <EntityManagementView<AdminMentor>
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
      // header config
      header={{
        title: t("title"),
        subtitle: t("subtitle"),
        icon: Users2,
        iconVariant: "info",
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
        total: Users2,
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
      // selectors for AdminMentor
      getEntityId={(m) => m.slug || String(m.id)}
      getEntityName={(m) => m.name}
      getEntityEmail={(m) => m.email}
      getEntityCreatedAt={(m) => m.created_at}
      getEntityAvatarVariant={() => "blue"}
      getExtraContact={(m) => m.city}
      inactiveVariant="info"
      skeleton={<EntitySkeleton />}
    />
  );
}

export default MentorsContent;