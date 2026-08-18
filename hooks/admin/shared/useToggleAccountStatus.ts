"use client";

import { useState, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import apiClient from "@/lib/api/client";
import axios from "axios";
import type { QueryKey } from "@tanstack/react-query";

/**
 * useToggleAccountStatus
 *
 * Hook مسؤول عن تفعيل/تعطيل حساب كيان.
 *
 * ✅ Features:
 *  - يستخدم react-query useMutation
 *  - يعرض toast تلقائياً عند النجاح/الفشل
 *  - loadingSlug لكل كيان على حدة
 *
 * ✅ POST → PATCH fallback:
 *    الـ backend أحياناً يتوقع PATCH وليس POST.
 *    الكود الأصلي كان يجرب POST ثم fallback إلى PATCH.
 *    أعدنا هذا السلوك لكن بشكل أنظف.
 *
 * ✅ Logging:
 *    يطبع URL والـ method والـ response لمساعدتك في الـ debugging.
 *
 * @example
 * const { loadingSlug, toggleAccount } = useToggleAccountStatus({
 *   enableEndpoint: (slug) => endpoints.admin.enableStudent(slug),
 *   disableEndpoint: (slug) => endpoints.admin.disableStudent(slug),
 *   invalidateKey: queryKeys.admin.students,
 *   successMessages: { enabled: "...", disabled: "..." },
 *   errorMessages: { default: "..." },
 * });
 */
interface UseToggleAccountStatusOptions {
  enableEndpoint: (slug: string) => string;
  disableEndpoint: (slug: string) => string;
  invalidateKey: QueryKey;
  successMessages: {
    enabled: string;
    disabled: string;
  };
  errorMessages: {
    default: string;
  };
  /** HTTP method رئيسي (default: "post") */
  primaryMethod?: "post" | "patch";
  /** تفعيل fallback للـ method الثاني (default: true) */
  enableFallback?: boolean;
  /** queryKeys إضافية يجب invalidatation (مثل counts) */
  additionalInvalidateKeys?: QueryKey[];
}

export function useToggleAccountStatus(options: UseToggleAccountStatusOptions) {
  const {
    enableEndpoint,
    disableEndpoint,
    invalidateKey,
    successMessages,
    errorMessages,
    primaryMethod = "post",
    enableFallback = true,
    additionalInvalidateKeys = [],
  } = options;

  const queryClient = useQueryClient();
  const [loadingSlug, setLoadingSlug] = useState<string | null>(null);

  /**
   * إرسال الطلب مع fallback تلقائي:
   *   - جرّب primaryMethod (default: POST)
   *   - لو فشل بـ 405 أو 404، جرّب الـ method الآخر (PATCH)
   *   - لو فشل بأي خطأ آخر، ارمِ الخطأ
   */
  const sendRequest = useCallback(
    async (url: string): Promise<void> => {
      const fallbackMethod = primaryMethod === "post" ? "patch" : "post";

      // ─── 1) جرّب الـ primary method ──────────────────────────
      try {
        const res = await apiClient[primaryMethod](url);
        console.log(
          `[toggleAccount] ✅ ${primaryMethod.toUpperCase()} ${url} →`,
          res.status,
        );
        return;
      } catch (primaryErr) {
        // لو الخطأ ليس 405/404، لا حاجة للـ fallback
        if (!enableFallback || !axios.isAxiosError(primaryErr)) {
          throw primaryErr;
        }

        const status = primaryErr.response?.status;
        const shouldFallback = status === 405 || status === 404;

        if (!shouldFallback) {
          throw primaryErr;
        }

        // ─── 2) Fallback للـ method الآخر ────────────────────
        console.warn(
          `[toggleAccount] ⚠️ ${primaryMethod.toUpperCase()} failed (${status}), trying ${fallbackMethod.toUpperCase()}...`,
        );

        try {
          const res = await apiClient[fallbackMethod](url);
          console.log(
            `[toggleAccount] ✅ ${fallbackMethod.toUpperCase()} ${url} →`,
            res.status,
          );
          return;
        } catch (fallbackErr) {
          throw fallbackErr;
        }
      }
    },
    [primaryMethod, enableFallback],
  );

  const mutation = useMutation({
    mutationFn: async ({
      slug,
      isCurrentlyActive,
    }: {
      slug: string;
      isCurrentlyActive: boolean;
    }) => {
      const url = isCurrentlyActive
        ? disableEndpoint(slug)
        : enableEndpoint(slug);

      console.log(`[toggleAccount] 🚀 Calling:`, {
        url,
        isCurrentlyActive,
        action: isCurrentlyActive ? "DISABLE" : "ENABLE",
      });

      await sendRequest(url);
      return { success: true, wasEnabled: !isCurrentlyActive };
    },
    onSuccess: (result) => {
      const msg = result.wasEnabled
        ? successMessages.enabled
        : successMessages.disabled;
      toast.success(msg);

      // ─── Invalidations ────────────────────────────────────
      // 1. القائمة الرئيسية (طلاب / منتورات)
      queryClient.invalidateQueries({ queryKey: invalidateKey });

      // 2. queryKeys إضافية (counts في الـ dashboard)
      additionalInvalidateKeys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });
    },
    onError: (err: unknown) => {
      console.error(`[toggleAccount] ❌ Error:`, err);

      let msg = errorMessages.default;

      if (axios.isAxiosError(err)) {
        // أخطاء axios
        msg =
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          msg;
        console.error("[toggleAccount] Response data:", err.response?.data);
      } else if (err instanceof Error) {
        msg = err.message || msg;
      }

      toast.error(msg);
    },
    onSettled: () => {
      setLoadingSlug(null);
    },
  });

  const toggleAccount = useCallback(
    async (slug: string, isCurrentlyActive: boolean) => {
      if (!slug) {
        console.warn("[toggleAccount] ⚠️ No slug provided — aborting");
        toast.error("Missing entity identifier (slug)");
        return;
      }
      setLoadingSlug(slug);
      await mutation.mutateAsync({ slug, isCurrentlyActive });
    },
    [mutation],
  );

  return {
    loadingSlug,
    toggleAccount,
    isPending: mutation.isPending,
  };
}

export default useToggleAccountStatus;
