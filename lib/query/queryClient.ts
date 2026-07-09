import { QueryClient } from "@tanstack/react-query";

/**
 * QueryClient instance وحيد لكل التطبيق.
 *
 * يعمل كـ "single source of truth" لكل الـ server state.
 * كل الـ queries و mutations بتمر من هنا، فبنضمن:
 *  - Deduplication: نفس الـ queryKey = نفس الـ request
 *  - Cache invalidation: invalidateQueries يحدّث كل الـ consumers
 *  - Background refetch: تلقائي لما الـ data تصير stale
 *
 * Defaults:
 *  - staleTime: 60 ثانية — الـ data تعتبر fresh لمدة دقيقة
 *  - gcTime: 5 دقائق — نحتفظ بالـ cache بعد unmount
 *  - refetchOnWindowFocus: false — منع refetch مزعج
 *  - retry: 1 — إعادة محاولة واحدة بس لو فشل الـ request
 */
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
