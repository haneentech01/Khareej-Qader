"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import endpoints from "@/lib/api/endpoints";
import { clearRoleCookie } from "@/lib/auth/roleCookie";
import { queryClient } from "@/lib/query/queryClient";
import type { Role } from "@/types";
import { useInsertData } from "@/lib/hooks/useInsertData";

interface UseLogoutOptions {
  role: Role;
  redirectPath?: string;
}

export function useLogout({ role, redirectPath }: UseLogoutOptions) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const logoutEndpoint =
    role === "mentor"
      ? endpoints.auth.mentor.logout
      : role === "admin"
        ? endpoints.auth.admin.logout
        : endpoints.auth.student.logout;

  const finalRedirect = redirectPath ?? `/login?role=${role}`;

  // Call the hook at the top level of the custom hook (rules-of-hooks)
  const { insertData: callLogout } = useInsertData(logoutEndpoint);

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      // ─── 1) Backend logout (يمسح الـ http-only token cookie) ─────────────
      await callLogout({});
    } catch (err) {
      const errMsg =
        err instanceof Error
          ? err.message
          : typeof err === "object" && err !== null && "message" in err
            ? String((err as { message?: unknown }).message)
            : "Logout request failed";

      console.warn(
        `[logout:${role}] Backend logout failed, clearing local state anyway:`,
        errMsg,
      );
      setError(errMsg);
    } finally {
      clearRoleCookie();
      queryClient.clear();
      router.refresh();
      router.push(finalRedirect);

      setLoading(false);
    }
  };

  return {
    logout,
    loading,
    error,
  };
}
