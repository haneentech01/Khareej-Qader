"use client";

import { useGetData } from "@/lib/hooks/useGetData";
import type { QueryKey } from "@tanstack/react-query";

interface UseEntityListOptions<T> {
  queryKey: QueryKey;
  endpoint: string;
  enabled?: boolean;
  staleTime?: number;
  select?: (raw: T[]) => T[];
}

export function useEntityList<T>({
  queryKey,
  endpoint,
  enabled = true,
  staleTime,
  select,
}: UseEntityListOptions<T>) {
  const { data, loading, error, refetch } = useGetData<T[]>(
    queryKey,
    endpoint,
    {
      enabled,
      ...(staleTime !== undefined ? { staleTime } : {}),
      ...(select ? { select } : {}),
    },
  );

  return {
    entities: data ?? [],
    loading,
    error,
    refetch,
  };
}

export default useEntityList;
