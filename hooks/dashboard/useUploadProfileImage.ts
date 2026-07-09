"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api/client";
import endpoints from "@/lib/api/endpoints";
import { queryKeys } from "@/lib/query/keys";
import type { ApiResponse } from "@/types";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

interface UploadResult {
  success: boolean;
  message?: string;
  imageUrl?: string;
}

// POST /students/upload-profile-image

export function useUploadProfileImage() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (file: File) => {
      // ─── Client-side validation ──────────────────────────────────────────
      if (!ALLOWED_TYPES.includes(file.type)) {
        throw new Error(
          "نوع الملف غير مدعوم. استخدم JPEG أو PNG أو WebP أو GIF",
        );
      }
      if (file.size > MAX_SIZE) {
        throw new Error("حجم الصورة كبير جداً (الحد الأقصى 5MB)");
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
        message: e?.message || "حدث خطأ أثناء رفع الصورة",
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
