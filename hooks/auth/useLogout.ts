"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import apiClient from "@/lib/api/client";
import endpoints from "@/lib/api/endpoints";
import { clearRoleCookie } from "@/lib/auth/roleCookie";
import { Role } from "@/types";

interface UseLogoutOptions {
  /** role بتاع الـ user الحالي (student / mentor / admin) */
  role: Role;
  /** المسار اللي راح نوجّه إليه بعد الـ logout (default: /login?role={role}) */
  redirectPath?: string;
}

/**
 * Hook موحّد لتسجيل الخروج — يشتغل لأي role (student / mentor / admin).
 *
 * الـ flow:
 *  1. يطلب من الـ backend يسجّل خروج (يمسح الـ token cookie) عبر endpoint
 *     خاص بكل role:
 *     - student → POST /students/auth/logout
 *     - mentor  → POST /mentor/auth/logout
 *     - admin   → POST /admin/auth/logout
 *  2. يمسح الـ role cookie محلياً (client side) عبر clearRoleCookie().
 *  3. يعمل router.refresh() لتفريغ أي cached server data (يمنع ظهور
 *     بيانات الـ user القديمة بعد الـ logout).
 *  4. يوجّه المستخدم لصفحة الـ login (default: /login?role={role}).
 *
 * ⚠️ Fail-safe: لو الـ backend request فشل (مثلاً الـ token منتهي بالفعل،
 * أو الـ backend offline)، نكمّل الـ flow لحد الأخير — نمسح الـ role cookie
 * ونوجّه للـ login. ما نلصقش المستخدم في صفحة معطّلة.
 *
 * مثال الاستخدام:
 *   const { logout, loading } = useLogout({ role: "student" });
 *   <button onClick={logout} disabled={loading}>Logout</button>
 *
 *   // أو مع redirect مخصص:
 *   const { logout } = useLogout({ role: "mentor", redirectPath: "/custom-login" });
 */
export function useLogout({ role, redirectPath }: UseLogoutOptions) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // اختيار الـ endpoint المناسب حسب الـ role
  const logoutEndpoint =
    role === "mentor"
      ? endpoints.auth.mentor.logout
      : role === "admin"
        ? endpoints.auth.admin.logout
        : endpoints.auth.student.logout;

  // المسار النهائي للـ redirect
  const finalRedirect = redirectPath ?? `/login?role=${role}`;

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      await apiClient.post(logoutEndpoint);
    } catch (err) {
      // لو الـ request فشل (مثلاً الـ token منتهي)، نكمّل برضو
      // لأن الهدف النهائي هو تسجيل الخروج محلياً + redirect للـ login
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
      // في كل الحالات (نجح أو فشل):
      //  1) امسح الـ role cookie
      clearRoleCookie();

      //  2) اعمل refresh لتفريغ الـ server cache (بيانات الـ user القديمة)
      //     مهم جداً: لو ما عملناش refresh، الـ layout ممكن يفضل يعرض
      //     الـ sidebar بتاع الـ user القديم لمدة ثانية قبل ما يRedirect.
      router.refresh();

      //  3) وجّه للـ login
      router.push(finalRedirect);

      setLoading(false);
    }
  };

  return {
    /** دالة الـ logout اللي تستدعيها الـ UI */
    logout,
    /** true أثناء إرسال طلب الـ logout — استخدمها لتعطيل الزر وإظهار spinner */
    loading,
    /** رسالة الخطأ الأخيرة (إن وُجدت) — نتجاهلها عادة لأننا نوجّه للـ login بأي حال */
    error,
  };
}
