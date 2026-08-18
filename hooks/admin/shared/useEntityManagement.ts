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
 * Orchestrator hook يربط بين 3 hooks صغيرة.
 *
 * ✅ تحسينات في هذا الإصدار:
 *  - استخدام `||` بدلاً من `??` للـ slug
 *  - fallback متعدد: slug → id → username → email
 *  - logging مفصّل لكل entity لتشخيص المشاكل
 *  - additionalInvalidateKeys لتحديث الـ counts
 */
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
  /** queryKeys إضافية لـ invalidation (مثل counts) */
  additionalInvalidateKeys?: QueryKey[];

  // ─── i18n ───────────────────────────────────────────────────
  translationNamespace: string;

  // ─── Optional ───────────────────────────────────────────────
  initialSearch?: string;
  primaryMethod?: "post" | "patch";
  enableFallback?: boolean;
}

export function useEntityManagement<T extends { account_status?: boolean }>(
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
    additionalInvalidateKeys = [],
    translationNamespace,
    initialSearch,
    primaryMethod,
    enableFallback,
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
    ...(primaryMethod ? { primaryMethod } : {}),
    ...(enableFallback !== undefined ? { enableFallback } : {}),
    additionalInvalidateKeys,
    successMessages: {
      enabled: t("enable.success"),
      disabled: t("disable.success"),
    },
    errorMessages: {
      default: t("error.toggle_failed"),
    },
  });

  // ─── Adapter: يحول (slug, isActive) إلى (entity) ──────────────
  // ✅ fallback متعدد: slug → id → username → email
  const handleToggleAccount = useCallback(
    async (entity: T) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const entityObj = entity as any;

      // ✅ طباعة الـ entity كاملاً لتشخيص المشاكل
      console.log(
        "[useEntityManagement] 📦 Full entity object from backend:",
        entityObj,
      );
      console.log(
        "[useEntityManagement] 🔑 Available keys:",
        Object.keys(entityObj),
      );

      // ✅ fallback chain: slug → id → username → email
      // (الـ backend أحياناً لا يرجّع slug ولا id، فنستخدم username أو email)
      const slug =
        (typeof entityObj.slug === "string" && entityObj.slug.trim()) ||
        (typeof entityObj.id === "number" && String(entityObj.id)) ||
        (typeof entityObj.id === "string" && entityObj.id.trim()) ||
        (typeof entityObj.username === "string" && entityObj.username.trim()) ||
        (typeof entityObj.email === "string" && entityObj.email.trim()) ||
        "";

      if (!slug) {
        console.error(
          "[useEntityManagement] ❌ Entity has no usable identifier!",
          "Tried: slug, id, username, email",
          "Available keys:",
          Object.keys(entityObj),
          "Full object:",
          entityObj,
        );
        return;
      }

      const isCurrentlyActive = getStatus(entity);

      console.log("[useEntityManagement] 🚀 Toggling account:", {
        slug,
        isCurrentlyActive,
        action: isCurrentlyActive ? "DISABLE" : "ENABLE",
        endpoint: isCurrentlyActive
          ? disableEndpoint(slug)
          : enableEndpoint(slug),
      });

      await toggleAccount(slug, isCurrentlyActive);
    },
    [toggleAccount, getStatus, enableEndpoint, disableEndpoint],
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
