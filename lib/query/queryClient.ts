import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
    mutations: {
      retry: 0,
    },
  },
});

// ─── staleTime مخصصة للبيانات النادرة التحديث ──────────────────
export const STALE_TIMES = {
  frequent: 60_000,
  rare: 5 * 60_000,
  static: 60 * 60_000,
} as const;

// ─── تطبيق الـ staleTimes على الـ queryKeys النادرة ───────────
queryClient.setQueryDefaults(["admin", "courses-count"], {
  staleTime: STALE_TIMES.rare,
});
queryClient.setQueryDefaults(["admin", "mentors-count"], {
  staleTime: STALE_TIMES.rare,
});
queryClient.setQueryDefaults(["admin", "students-count"], {
  staleTime: STALE_TIMES.rare,
});
queryClient.setQueryDefaults(["admin", "courses"], {
  staleTime: STALE_TIMES.rare,
});
queryClient.setQueryDefaults(["lookup"], {
  staleTime: STALE_TIMES.static,
});
