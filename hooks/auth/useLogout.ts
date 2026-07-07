"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import endpoints from "@/lib/api/endpoints";
import { clearRoleCookie } from "@/lib/auth/roleCookie";
import { Role } from "@/types";
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

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      await useInsertData(logoutEndpoint);
    } catch (err) {
      const errMsg =
        err instanceof Error ? err.message : "Logout request failed";
      console.warn(
        `[logout] Backend logout failed, clearing local state anyway:`,
        errMsg,
      );
      setError(errMsg);
    } finally {
      clearRoleCookie();
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
