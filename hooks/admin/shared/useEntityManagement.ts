"use client";

import { useCallback } from "react";
import { useTranslations } from "next-intl";
import { useEntityList } from "./useEntityList";
import { useFilteredEntities } from "./useFilteredEntities";
import { useToggleAccountStatus } from "./useToggleAccountStatus";
import type { QueryKey } from "@tanstack/react-query";

/**
 * useEntityManagement
 *
 * Orchestrator hook يربط بين 3 hooks صغيرة كل منها مسؤولة عن شيء واحد:
 *   1. useEntityList          → جلب البيانات (data layer)
 *   2. useFilteredEntities    → الفلترة + البحث + stats (view state)
 *   3. useToggleAccountStatus → الـ mutation (action layer)
 **/

interface UseEntityManagementOptions<T> {
  // ─── Data layer ─────────────────────────────────────────────
  queryKey: QueryKey;
  endpoint: string;
  enabled?: boolean;
  staleTime?: number;

  // ─── Filtering ──────────────────────────────────────────────
  searchFields: Array<(entity: T) => string | undefined>;
  getStatus: (entity: T) => boolean;

  // ─── Mutation ───────────────────────────────────────────────
  enableEndpoint: (slug: string) => string;
  disableEndpoint: (slug: string) => string;
  invalidateKey: QueryKey;

  // ─── i18n ───────────────────────────────────────────────────
  translationNamespace: string;

  // ─── Optional ───────────────────────────────────────────────
  initialSearch?: string;
  method?: "post" | "patch";
}

export function useEntityManagement<T extends { account_status: boolean }>(
  options: UseEntityManagementOptions<T>,
) {
  const {
    queryKey,
    endpoint,
    enabled = true,
    staleTime,
    searchFields,
    getStatus,
    enableEndpoint,
    disableEndpoint,
    invalidateKey,
    translationNamespace,
    initialSearch,
    method,
  } = options;

  const t = useTranslations(translationNamespace);

  // ─── 1) Data layer ────────────────────────────────────────────
  const { entities, loading, error, refetch } = useEntityList<T>({
    queryKey,
    endpoint,
    enabled,
    ...(staleTime !== undefined ? { staleTime } : {}),
  });

  // ─── 2) View state (filters + stats) ──────────────────────────
  const {
    filtered,
    totalCount,
    activeCount,
    disabledCount,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
  } = useFilteredEntities<T>(entities, {
    searchFields,
    getStatus,
    initialSearch,
  });

  // ─── 3) Mutation ──────────────────────────────────────────────
  const { loadingSlug, toggleAccount } = useToggleAccountStatus({
    enableEndpoint,
    disableEndpoint,
    invalidateKey,
    method,
    successMessages: {
      enabled: t("enable.success"),
      disabled: t("disable.success"),
    },
    errorMessages: {
      default: t("error.toggle_failed"),
    },
  });

  // ─── Adapter: يحول (slug, isActive) إلى (entity) ──────────────
  const handleToggleAccount = useCallback(
    async (entity: T) => {
      const slug =
        (entity as unknown as { slug?: string; id?: number | string }).slug ??
        String((entity as unknown as { id?: number | string }).id ?? "");
      if (!slug) return;
      await toggleAccount(slug, getStatus(entity));
    },
    [toggleAccount, getStatus],
  );

  return {
    // data
    entities: filtered,
    totalCount,
    activeCount,
    disabledCount,

    // filters
    search,
    setSearch,
    statusFilter,
    setStatusFilter,

    // toggle
    loadingSlug,
    handleToggleAccount,

    // states
    loading,
    error,
    refetch,
  };
}

export default useEntityManagement;
