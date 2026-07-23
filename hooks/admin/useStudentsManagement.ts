"use client";

import { useState, useMemo } from "react";
import { useAdminStudents } from "@/hooks/admin/useAdminStudents";
import apiClient from "@/lib/api/client";
import endpoints from "@/lib/api/endpoints";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import type { AdminStudent } from "@/types";

export function useStudentsManagement() {
  const queryClient = useQueryClient();
  const t = useTranslations("Admin.students");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "disabled">("all");
  const [loadingSlug, setLoadingSlug] = useState<string | null>(null);

  const { students, loading, error, refetch } = useAdminStudents();

  // Filter logic
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchSearch =
        search.trim() === "" ||
        student.full_name?.toLowerCase().includes(search.toLowerCase()) ||
        student.email?.toLowerCase().includes(search.toLowerCase());

      if (!matchSearch) return false;

      if (statusFilter === "active") return student.account_status;
      if (statusFilter === "disabled") return !student.account_status;
      return true;
    });
  }, [students, search, statusFilter]);

  // Stats calculation
  const totalCount = students.length;
  const activeCount = useMemo(
    () => students.filter((s) => s.account_status).length,
    [students]
  );
  const disabledCount = totalCount - activeCount;

  // Enable/Disable Account handler
  const handleToggleAccount = async (student: AdminStudent) => {
    const slug = student.slug;
    if (!slug) return;

    setLoadingSlug(slug);
    const isCurrentlyActive = student.account_status;
    const url = isCurrentlyActive
      ? endpoints.admin.disableStudent(slug)
      : endpoints.admin.enableStudent(slug);

    try {
      // Try POST first
      await apiClient.post(url);

      const successMsg = isCurrentlyActive
        ? (t("disable.success") || "تم تعطيل حساب الطالب بنجاح")
        : (t("enable.success") || "تم تفعيل حساب الطالب بنجاح");

      toast.success(successMsg);
      await queryClient.invalidateQueries({ queryKey: queryKeys.admin.students });
    } catch (err: unknown) {
      try {
        // Fallback to PATCH if needed
        await apiClient.patch(url);
        const successMsg = isCurrentlyActive
          ? (t("disable.success") || "تم تعطيل حساب الطالب بنجاح")
          : (t("enable.success") || "تم تفعيل حساب الطالب بنجاح");
        toast.success(successMsg);
        await queryClient.invalidateQueries({ queryKey: queryKeys.admin.students });
      } catch (patchErr: unknown) {
        const errorObj = patchErr as { response?: { data?: { message?: string } } };
        const msg =
          errorObj?.response?.data?.message ||
          "حدث خطأ أثناء تعديل حالة حساب الطالب";
        toast.error(msg);
      }
    } finally {
      setLoadingSlug(null);
    }
  };

  return {
    students: filteredStudents,
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
