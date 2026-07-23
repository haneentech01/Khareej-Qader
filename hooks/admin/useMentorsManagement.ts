"use client";

import { useState, useMemo } from "react";
import { useAdminMentors } from "@/hooks/admin/useAdminMentors";
import apiClient from "@/lib/api/client";
import endpoints from "@/lib/api/endpoints";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import type { AdminMentor } from "@/types";

export function useMentorsManagement() {
  const queryClient = useQueryClient();
  const t = useTranslations("Admin.mentors");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "disabled">("all");
  const [loadingSlug, setLoadingSlug] = useState<string | null>(null);

  const { mentors, loading, error, refetch } = useAdminMentors();

  // Filter logic
  const filteredMentors = useMemo(() => {
    return mentors.filter((mentor) => {
      const matchSearch =
        search.trim() === "" ||
        mentor.name?.toLowerCase().includes(search.toLowerCase()) ||
        mentor.email?.toLowerCase().includes(search.toLowerCase()) ||
        mentor.city?.toLowerCase().includes(search.toLowerCase());

      if (!matchSearch) return false;

      if (statusFilter === "active") return mentor.account_status;
      if (statusFilter === "disabled") return !mentor.account_status;
      return true;
    });
  }, [mentors, search, statusFilter]);

  // Stats calculation
  const totalCount = mentors.length;
  const activeCount = useMemo(
    () => mentors.filter((m) => m.account_status).length,
    [mentors]
  );
  const disabledCount = totalCount - activeCount;

  // Enable/Disable Account handler
  const handleToggleAccount = async (mentor: AdminMentor) => {
    const slug = mentor.slug || String(mentor.id);
    if (!slug) return;

    setLoadingSlug(slug);
    const isCurrentlyActive = mentor.account_status;
    const url = isCurrentlyActive
      ? endpoints.admin.disableMentor(slug)
      : endpoints.admin.enableMentor(slug);

    try {
      // Try POST first
      await apiClient.post(url);

      const successMsg = isCurrentlyActive
        ? (t("disable.success") || "تم تعطيل حساب المنتور بنجاح")
        : (t("enable.success") || "تم تفعيل حساب المنتور بنجاح");

      toast.success(successMsg);
      await queryClient.invalidateQueries({ queryKey: queryKeys.admin.mentors });
    } catch (err: unknown) {
      try {
        // Fallback to PATCH if needed
        await apiClient.patch(url);
        const successMsg = isCurrentlyActive
          ? (t("disable.success") || "تم تعطيل حساب المنتور بنجاح")
          : (t("enable.success") || "تم تفعيل حساب المنتور بنجاح");
        toast.success(successMsg);
        await queryClient.invalidateQueries({ queryKey: queryKeys.admin.mentors });
      } catch (patchErr: unknown) {
        const errorObj = patchErr as { response?: { data?: { message?: string } } };
        const msg =
          errorObj?.response?.data?.message ||
          "حدث خطأ أثناء تعديل حالة حساب المنتور";
        toast.error(msg);
      }
    } finally {
      setLoadingSlug(null);
    }
  };

  return {
    mentors: filteredMentors,
    totalCount,
    activeCount,
    disabledCount,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    loadingSlug,
    handleToggleAccount,
    loading,
    error,
    refetch,
  };
}
