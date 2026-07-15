"use client";
import endpoints from "@/lib/api/endpoints";
import type { StateListItem } from "@/types";
import { useGetData } from "@/lib/hooks/useGetData";

interface UseStatesListOptions {
  enabled?: boolean;
}

export function useStatesList({ enabled = true }: UseStatesListOptions = {}) {
  const {
    data,
    loading,
    error,
    refetch: fetchData,
  } = useGetData<StateListItem[]>(endpoints.lookup.statesList, {
    immediate: enabled,
  });

  return {
    states: data ?? [],
    loading,
    error,
    refetch: fetchData,
  };
}
