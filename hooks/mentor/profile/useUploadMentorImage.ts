"use client";

import { useQueryClient } from "@tanstack/react-query";
import endpoints from "@/lib/api/endpoints";
import { queryKeys } from "@/lib/query/keys";
import { useInsertData } from "@/lib/hooks/useInsertData";
import { useTranslations } from "next-intl";
import type { ApiResponse } from "@/types";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/jfif",
];
const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "gif", "jfif"];

function isAllowedFile(file: File): boolean {
  if (file.type && ALLOWED_TYPES.includes(file.type.toLowerCase())) return true;
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return ALLOWED_EXTENSIONS.includes(ext);
}

interface UploadResult {
  success: boolean;
  message?: string;
  imageUrl?: string;
}

// POST /mentor/upload-profile-image
export function useUploadMentorImage() {
  const queryClient = useQueryClient();
  const t = useTranslations("Dashboard.ProfilePage.upload_profile_image");

  const { loading, error, insertData, reset } = useInsertData(
    endpoints.mentor.uploadProfileImage,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.mentor.dashboard,
        });
      },
    },
  );

  const uploadProfileImage = async (file: File): Promise<UploadResult> => {
    if (!isAllowedFile(file)) {
      return { success: false, message: t("error_file_type") };
    }
    if (file.size > MAX_SIZE) {
      return { success: false, message: t("error_size") };
    }

    const formData = new FormData();
    formData.append("profile_image", file);

    const result = await insertData(formData);

    if (result.success) {
      const resData = result.data as ApiResponse<unknown> | null;
      const url =
        typeof resData?.data === "string" ? resData.data : undefined;
      return {
        success: true,
        message: resData?.message ?? undefined,
        imageUrl: url,
      };
    }

    return {
      success: false,
      message: result.message ?? t("error_network"),
    };
  };

  return {
    uploadProfileImage,
    loading,
    error,
    successMessage: null,
    imageUrl: null,
    reset,
  };
}
