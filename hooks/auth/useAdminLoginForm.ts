"use client";

import { useState, useCallback } from "react";
import { useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { toast } from "react-toastify";
import apiClient from "@/lib/api/client";
import endpoints from "@/lib/api/endpoints";
import type {
  AdminLoginPayload,
  AdminLoginResponse,
  ApiResponse,
} from "@/types";
import { useAdminAuth } from "../admin/useAdminAuth";

export interface AdminLoginFormState {
  username: string;
  password: string;
}

interface UseAdminLoginFormOptions {
  username?: string;
  password?: string;
}

export function useAdminLoginForm({
  username = "",
  password = "",
}: UseAdminLoginFormOptions = {}) {
  const router = useRouter();
  const locale = useLocale();
  const { setAdminAuth } = useAdminAuth();

  const [formData, setFormData] = useState<AdminLoginFormState>({
    username: username,
    password: password,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (loading) return;

      if (!formData.username.trim() || !formData.password.trim()) {
        const msg =
          locale === "ar"
            ? "يرجى إدخال اسم المستخدم وكلمة المرور"
            : "Please enter username and password";
        setError(msg);
        toast.error(msg);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const payload: AdminLoginPayload = {
          username: formData.username,
          password: formData.password,
        };

        const res = await apiClient.post<ApiResponse<AdminLoginResponse>>(
          endpoints.auth.admin.login,
          payload,
        );

        const data = res.data?.data;
        if (!data || !res.data.success) {
          throw new Error(res.data.message || "فشل تسجيل الدخول");
        }

        // 1) تخزين الـ admin + permissions client-side (للـ UI فقط)
        setAdminAuth(data.admin, data.permissions);

        // 2) ضبط الـ role cookie عبر server-side API (httpOnly — آمن)
        try {
          await fetch("/api/auth/role", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ role: "admin" }),
          });
        } catch (err) {
          console.warn("[admin-login] Failed to set role cookie:", err);
        }

        toast.success(
          locale === "ar"
            ? `أهلاً ${data.admin.name}!`
            : `Welcome ${data.admin.name}!`,
        );

        // 3) توجيه لـ /admin
        router.push("/admin");
      } catch (err) {
        const e = err as { message?: string };
        const msg = e?.message || "فشل تسجيل الدخول";
        setError(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    },
    [formData, loading, locale, router, setAdminAuth],
  );

  return {
    formData,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
}
