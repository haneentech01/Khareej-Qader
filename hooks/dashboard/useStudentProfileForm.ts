"use client";

import { useState, useCallback, useMemo } from "react";
import { useDashboard } from "@/hooks/dashboard/useDashboard";
import { useUpdateStudentData } from "@/hooks/dashboard/useUpdateStudentData";
import { useUploadProfileImage } from "@/hooks/dashboard/useUploadProfileImage";
import type {
  DashboardCourse,
  DashboardStudent,
  UpdateStudentDataPayload,
} from "@/types";

export interface StudentFormData {
  // editable fields
  name: string;
  email: string;
  mobile_number: string;
  gender: "male" | "female" | "";
  university_name: string;
  university_major: string;
  // locked fields
  username: string;
  course: string;
}

interface UseStudentProfileFormResult {
  student: DashboardStudent | null;
  course: DashboardCourse | null;
  loading: boolean;
  error: string | null;
  formData: StudentFormData;
  formInitialized: boolean;
  hasChanges: boolean;
  isSaving: boolean;
  saveError: string | null;
  saveSuccess: string | null;
  isUploadingImage: boolean;
  imageError: string | null;
  imageSuccess: string | null;
  imageUrl: string | null;
  handleFieldChange: (field: keyof StudentFormData, value: string) => void;
  handleSave: (e: React.FormEvent) => Promise<void>;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleRetry: () => void;
}

const EMPTY_FORM: StudentFormData = {
  name: "",
  email: "",
  mobile_number: "",
  gender: "",
  university_name: "",
  university_major: "",
  username: "",
  course: "",
};

function toFormData(
  student: DashboardStudent | null,
  course: DashboardCourse | null,
): StudentFormData {
  if (!student) return EMPTY_FORM;
  return {
    name: student.name ?? "",
    email: student.email ?? "",
    mobile_number: student.mobile_number ?? "",
    gender: (student.gender as "male" | "female" | "") ?? "",
    university_name: student.university_name ?? "",
    university_major: student.university_major ?? "",
    username: student.username ?? "",
    course: course?.name ?? "",
  };
}

function buildPayload(
  form: StudentFormData,
  original: DashboardStudent | null,
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

  if (form.gender !== (original.gender ?? "")) {
    payload.gender = form.gender;
  }

  if (form.university_name !== (original.university_name ?? "")) {
    payload.university_name = form.university_name;
  }

  if (form.university_major !== (original.university_major ?? "")) {
    payload.university_major = form.university_major;
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

export function useStudentProfileForm(): UseStudentProfileFormResult {
  const { student, course, loading, error, invalidate } = useDashboard();

  const {
    updateStudentData,
    loading: isSaving,
    error: rawSaveError,
    reset: resetSave,
  } = useUpdateStudentData();
  const saveError = typeof rawSaveError === 'string' ? rawSaveError : (rawSaveError as Error | null)?.message ?? null;
  const {
    uploadProfileImage,
    loading: isUploadingImage,
    error: rawImageError,
    reset: resetImage,
  } = useUploadProfileImage();
  const imageError = typeof rawImageError === 'string' ? rawImageError : (rawImageError as Error | null)?.message ?? null;

  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [imageSuccessMsg, setImageSuccessMsg] = useState<string | null>(null);
  const [localImageUrl, setLocalImageUrl] = useState<string | null>(null);

  // Derive initial form data directly from server data — no setState-in-effect
  const serverFormData = useMemo(
    () => toFormData(student, course),
    // We only want to recompute when the server identity changes (username/name)
    [student, course],
  );

  // User edits layered on top of server data
  const [overrides, setOverrides] = useState<Partial<StudentFormData>>({});

  const formData: StudentFormData = useMemo(
    () => ({ ...serverFormData, ...overrides }),
    [serverFormData, overrides],
  );

  // Derived flag: true as soon as server data has arrived (safe to read during render)
  const initialized = !!(student || course);

  const hasChanges =
    initialized &&
    student !== null &&
    (formData.name !== (student.name ?? "") ||
      formData.email !== (student.email ?? "") ||
      formData.mobile_number !== (student.mobile_number ?? "") ||
      formData.gender !== (student.gender ?? "") ||
      formData.university_name !== (student.university_name ?? "") ||
      formData.university_major !== (student.university_major ?? ""));

  // ─── Handlers ────────────────────────────────────────────────────────────
  const handleFieldChange = useCallback(
    (field: keyof StudentFormData, value: string) => {
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
      const result = await updateStudentData(buildPayload(formData, student));
      if (result.success) {
        setSaveSuccess(result.message ?? "تم حفظ التعديلات بنجاح");
      }
    },
    [hasChanges, isSaving, formData, student, updateStudentData],
  );

  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Reset previous state before starting a new upload
      resetImage();
      setImageSuccessMsg(null);
      setLocalImageUrl(null);
      const uploadResult = await uploadProfileImage(file);
      if (uploadResult.success && uploadResult.imageUrl) {
        setLocalImageUrl(uploadResult.imageUrl);
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
    student,
    course,
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
    imageUrl: localImageUrl,
    handleFieldChange,
    handleSave,
    handleImageUpload,
    handleRetry,
  };
}
