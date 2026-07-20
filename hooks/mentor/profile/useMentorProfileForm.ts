"use client";

import { useState, useCallback, useMemo } from "react";

import type {
  MentorDashboardCourse,
  MentorDashboard,
  UpdateStudentDataPayload,
} from "@/types";
import { useMentorDashboard } from "../useMentorDashboard";
import { useUpdateMentorData } from "./useUpdateMentorData";
import { useUploadMentorImage } from "./useUploadMentorImage";

export interface MentorFormData {
  // editable fields
  name: string;
  email: string;
  profile_image?: string;
  mobile_number: string;
  address: string;
  city: string;
  state: string;
  // locked fields
  username: string;
  course: string;
}

interface UseMentorProfileFormResult {
  mentor: MentorDashboard | null;
  course: MentorDashboardCourse | null;
  loading: boolean;
  error: string | null;
  formData: MentorFormData;
  formInitialized: boolean;
  hasChanges: boolean;
  isSaving: boolean;
  saveError: string | null;
  saveSuccess: string | null;
  isUploadingImage: boolean;
  imageError: string | null;
  imageSuccess: string | null;
  imageUrl: string | null;
  handleFieldChange: (field: keyof MentorFormData, value: string) => void;
  handleSave: (e: React.FormEvent) => Promise<void>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleRetry: () => void;
}

const EMPTY_FORM: MentorFormData = {
  name: "",
  email: "",
  mobile_number: "",
  profile_image: "",
  address: "",
  city: "",
  state: "",
  username: "",
  course: "",
};

function toFormData(
  student: MentorDashboard | null,
  course: MentorDashboardCourse | null,
): MentorFormData {
  if (!student) return EMPTY_FORM;
  return {
    name: student.name ?? "",
    email: student.email ?? "",
    mobile_number: student.mobile_number ?? "",
    profile_image: student.profile_image ?? "",
    address: student.address ?? "",
    city: student.city ?? "",
    state: student.state ?? "",
    username: student.username ?? "",
    course: course?.name ?? "",
  };
}

function buildPayload(
  form: MentorFormData,
  original: MentorDashboard | null,
): UpdateStudentDataPayload {
  if (!original) return {};
  const payload: UpdateStudentDataPayload = {};

  if (form.name !== (original.name ?? "")) {
    payload.full_name = form.name;
  }

  if (form.email !== (original.email ?? "")) {
    payload.email = form.email;
  }

  if (form.mobile_number !== (original.mobile_number ?? "")) {
    payload.mobile_number = form.mobile_number;
  }

  if (form.profile_image !== (original.profile_image ?? "")) {
    payload.profile_image = form.profile_image;
  }
  if (form.address !== (original.address ?? "")) {
    payload.address = form.address;
  }
  if (form.city !== (original.city ?? "")) {
    payload.city = form.city;
  }
  if (form.state !== (original.state ?? "")) {
    payload.state = form.state;
  }

  return payload;
}

// ─── Hook ──────────────────────────────────────────────────────────────────

/**
 * يجمع 3 hooks:
 *  1) useStudentProfile     → GET
 *  2) useUpdateStudentData  → PATCH
 *  3) useUploadProfileImage → POST
 */

export function useMentorProfileForm(): UseMentorProfileFormResult {
  const { mentorDashboard, mentor, course, loading, error, invalidate } =
    useMentorDashboard();

  const {
    updateMentorData,
    loading: isSaving,
    error: rawSaveError,
    reset: resetSave,
  } = useUpdateMentorData();
  const saveError = typeof rawSaveError === 'string' ? rawSaveError : (rawSaveError as Error | null)?.message ?? null;
  const {
    uploadProfileImage,
    loading: isUploadingImage,
    error: rawImageError,
    reset: resetImage,
  } = useUploadMentorImage();
  const imageError = typeof rawImageError === 'string' ? rawImageError : (rawImageError as Error | null)?.message ?? null;

  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [imageSuccessMsg, setImageSuccessMsg] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Derive initial form data directly from server data — no setState-in-effect
  const serverFormData = useMemo(
    () => toFormData(mentor, course),
    [mentor, course],
  );

  // User edits layered on top of server data
  const [overrides, setOverrides] = useState<Partial<MentorFormData>>({});

  const formData: MentorFormData = useMemo(
    () => ({ ...serverFormData, ...overrides }),
    [serverFormData, overrides],
  );

  // Derived flag: true as soon as server data has arrived (safe to read during render)
  const initialized = !!(mentor || course);

  const hasChanges =
    initialized &&
    mentor !== null &&
    (formData.name !== (mentor.name ?? "") ||
      formData.email !== (mentor.email ?? "") ||
      formData.mobile_number !== (mentor.mobile_number ?? "") ||
      formData.profile_image !== (mentor.profile_image ?? "") ||
      formData.address !== (mentor.address ?? "") ||
      formData.city !== (mentor.city ?? "") ||
      formData.state !== (mentor.state ?? ""));

  // ─── Handlers ────────────────────────────────────────────────────────────
  const handleFieldChange = useCallback(
    (field: keyof MentorFormData, value: string) => {
      setOverrides((prev) => ({ ...prev, [field]: value }));
      if (saveSuccess || saveError) {
        setSaveSuccess(null);
        resetSave();
      }
      if (imageSuccessMsg || imageError) {
        setImageSuccessMsg(null);
        resetImage();
      }
    },
    [
      saveSuccess,
      saveError,
      imageSuccessMsg,
      imageError,
      resetSave,
      resetImage,
    ],
  );

  const handleSave = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!hasChanges || isSaving) return;
      const result = await updateMentorData(buildPayload(formData, mentor));
      if (result.success) {
        setSaveSuccess(result.message ?? "تم الحفظ بنجاح");
      }
    },
    [hasChanges, isSaving, formData, mentor, updateMentorData],
  );

  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Reset previous state before starting a new upload
      resetImage();
      setImageSuccessMsg(null);
      setImageUrl(null);
      const uploadResult = await uploadProfileImage(file);
      if (uploadResult.success && uploadResult.imageUrl) {
        setImageUrl(uploadResult.imageUrl);
        setImageSuccessMsg(uploadResult.message ?? "تم رفع الصورة بنجاح");
      }
      if (e.target) e.target.value = "";
    },
    [uploadProfileImage, resetImage],
  );

  const handleRetry = useCallback(() => {
    invalidate();
  }, [invalidate]);

  return {
    mentor: mentorDashboard?.mentor ?? null,
    course: mentorDashboard?.course ?? null,
    loading,
    error,
    formData,
    formInitialized: initialized,
    hasChanges,
    isSaving,
    saveError,
    saveSuccess,
    isUploadingImage,
    imageError,
    imageSuccess: imageSuccessMsg,
    imageUrl,
    handleFieldChange,
    handleSave,
    handleImageUpload,
    handleRetry,
  };
}
