"use client";

import { useState, useEffect, useCallback } from "react";
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
  slug: string;
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
  slug: "",
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
    slug: student.slug ?? "",
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
    error: saveError,
    successMessage,
    reset: resetSave,
  } = useUpdateStudentData();
  const {
    uploadProfileImage,
    loading: isUploadingImage,
    error: imageError,
    successMessage: imageSuccessMsg,
    imageUrl,
    reset: resetImage,
  } = useUploadProfileImage();

  const [formData, setFormData] = useState<StudentFormData>(EMPTY_FORM);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if ((student || course) && !initialized) {
      setFormData(toFormData(student, course));
      setInitialized(true);
    }
  }, [student, course, initialized]);

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
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (successMessage || saveError) resetSave();
      if (imageSuccessMsg || imageError) resetImage();
    },
    [
      successMessage,
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
      }
    },
    [hasChanges, isSaving, formData, student, updateStudentData],
  );

  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      await uploadProfileImage(file);
      if (e.target) e.target.value = "";
    },
    [uploadProfileImage],
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
    saveSuccess: successMessage,
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
