"use client";

import { useState, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import apiClient from "@/lib/api/client";
import type { QueryKey } from "@tanstack/react-query";

// Hook مسؤول عن شيء واحد فقط: تفعيل/تعطيل حساب كيان.

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
  method?: "post" | "patch";
}

export function useToggleAccountStatus(options: UseToggleAccountStatusOptions) {
  const {
    enableEndpoint,
    disableEndpoint,
    invalidateKey,
    successMessages,
    errorMessages,
    method = "post",
  } = options;

  const queryClient = useQueryClient();
  const [loadingSlug, setLoadingSlug] = useState<string | null>(null);

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

      const res = await apiClient[method](url);
      return { success: true, data: res.data, wasEnabled: !isCurrentlyActive };
    },
    onSuccess: (result) => {
      const msg = result.wasEnabled
        ? successMessages.enabled
        : successMessages.disabled;
      toast.success(msg);

      queryClient.invalidateQueries({ queryKey: invalidateKey });
    },
    onError: (err: unknown) => {
      let msg = errorMessages.default;
      const errorObj = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      msg = errorObj?.response?.data?.message || errorObj?.message || msg;

      toast.error(msg);
    },
    onSettled: () => {
      setLoadingSlug(null);
    },
  });

  const toggleAccount = useCallback(
    async (slug: string, isCurrentlyActive: boolean) => {
      if (!slug) return;
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
