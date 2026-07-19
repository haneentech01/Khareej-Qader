"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api/client";
import endpoints from "@/lib/api/endpoints";
import { queryKeys } from "@/lib/query/keys";
import type { ApiResponse } from "@/types";
import { useTranslations } from "next-intl";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif", "image/jfif"];
const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "gif", "jfif"];

function isAllowedFile(file: File): boolean {
  // Check MIME type first (may be empty for JFIF in some browsers)
  if (file.type && ALLOWED_TYPES.includes(file.type.toLowerCase())) return true;
  // Fallback: check extension
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return ALLOWED_EXTENSIONS.includes(ext);
}

interface UploadResult {
  success: boolean;
  message?: string;
  imageUrl?: string;
}

// POST /upload-profile-image
export function useUploadProfileImage() {
  const queryClient = useQueryClient();
  const t = useTranslations("Dashboard.profile.useUploadProfileImage");

  const mutation = useMutation({
    mutationFn: async (file: File) => {
      // ─── Client-side validation ──────────────────────────────────────────
      if (!isAllowedFile(file)) {
        throw new Error(t("error_file_type"));
      }
      if (file.size > MAX_SIZE) {
        throw new Error(t("error_size"));
      }

      // ─── Build FormData ──────────────────────────────────────────────────
      const formData = new FormData();
      formData.append("profile_image", file);

      // ─── Send request ────────────────────────────────────────────────────
      const res = await apiClient.post<ApiResponse<unknown>>(
        endpoints.student.uploadProfileImage,
        formData,
        { headers: { "Content-Type": undefined } },
      );
      if (!res.data.success) {
        throw new Error(res.data.message);
      }
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.student.dashboard,
      });
    },
  });

  const uploadProfileImage = async (file: File): Promise<UploadResult> => {
    try {
      const data = await mutation.mutateAsync(file);
      const url = typeof data?.data === "string" ? data.data : undefined;
      return {
        success: true,
        message: data?.message ?? undefined,
        imageUrl: url,
      };
    } catch (err) {
      const e = err as { message?: string };
      return {
        success: false,
        message: e?.message || t("error_network"),
      };
    }
  };

  return {
    uploadProfileImage,
    loading: mutation.isPending,
    error: mutation.error ? (mutation.error as Error).message : null,
    successMessage: mutation.data?.message ?? null,
    imageUrl:
      typeof mutation.data?.data === "string" ? mutation.data.data : null,
    reset: mutation.reset,
  };
}
