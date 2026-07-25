"use client";

import { useMemo, useState, useDeferredValue } from "react";

/**
 * useFilteredEntities
 *
 * Hook مسؤول عن شيء واحد فقط: فلترة قائمة كيانات بناءً على:
 *   - نص بحث فوري (instant search)
 *   - فلتر الحالة (all / active / disabled)
 */
export type StatusFilter = "all" | "active" | "disabled";

interface UseFilteredEntitiesOptions<T> {
  searchFields: Array<(entity: T) => string | undefined>;
  getStatus: (entity: T) => boolean;
  initialSearch?: string;
  initialStatusFilter?: StatusFilter;
  deferSearch?: boolean;
}

export function useFilteredEntities<T>(
  entities: T[],
  options: UseFilteredEntitiesOptions<T>,
) {
  const {
    searchFields,
    getStatus,
    initialSearch = "",
    initialStatusFilter = "all",
    deferSearch = true,
  } = options;

  const [search, setSearch] = useState(initialSearch);
  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>(initialStatusFilter);

  const deferredSearch = useDeferredValue(search);

  const filteredEntities = useMemo(() => {
    const query = deferredSearch.trim().toLowerCase();

    return entities.filter((entity) => {
      // ─── 1) فحص الـ search ───────────────────────────
      if (query) {
        const matchesSearch = searchFields.some((getField) => {
          const value = getField(entity);
          return value?.toLowerCase().includes(query);
        });
        if (!matchesSearch) return false;
      }

      // ─── 2) فحص الـ status filter ───────────────────
      if (statusFilter === "active") return getStatus(entity);
      if (statusFilter === "disabled") return !getStatus(entity);
      return true;
    });
  }, [entities, deferredSearch, statusFilter, searchFields, getStatus]);

  // ─── Stats  ──────────────
  const totalCount = entities.length;
  const activeCount = useMemo(
    () => entities.filter((e) => getStatus(e)).length,
    [entities, getStatus],
  );
  const disabledCount = totalCount - activeCount;

  return {
    filtered: filteredEntities,
    totalCount,
    activeCount,
    disabledCount,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    isStale: deferSearch && search !== deferredSearch,
  };
}

export default useFilteredEntities;
