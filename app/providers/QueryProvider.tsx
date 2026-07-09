"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query/queryClient";

/**
 * QueryProvider — Client boundary لـ React Query.
 *
 * لازم يكون في أعلى شجرة الـ components (في layout.tsx) عشان كل
 * الـ hooks (useQuery / useMutation) تقدر توصل للـ QueryClient.
 *
 * ⚠️ لو حابب تفعّل React Query Devtools:
 *    1. npm install @tanstack/react-query-devtools
 *    2. استخدم الكود المعلّق تحت
 */
export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {/* React Query Devtools — فعّلها لو محتاج debugging
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      )} */}
    </QueryClientProvider>
  );
}

/* لو حابب تفعّل Devtools، Uncomment الـ import ده:
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
*/
