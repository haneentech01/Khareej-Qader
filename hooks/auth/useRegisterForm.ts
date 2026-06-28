"use client";

import { useRouter } from "@/i18n/routing";
import endpoints from "@/lib/api/endpoints";
import { useForm } from "../forms/useForm";
import { RegisterFormData, ValidationErrors } from "@/types";

// ─── قواعد الفحص المحلي ──────────────────────────
const validate = (values: RegisterFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!values.full_name.trim()) errors.full_name = ["Full name is required"];
  if (!values.email.trim()) errors.email = ["Email is required"];
  if (!values.mobile_number.trim())
    errors.mobile_number = ["Mobile number is required"];
  if (!values.country_iso) errors.country_iso = ["Country iso is required"];
  if (!values.gender) errors.gender = ["Gender is required"];
  if (!values.university_name)
    errors.university_name = ["University name is required"];
  if (!values.university_major)
    errors.university_major = ["University major is required"];
  if (!values.course_id) errors.course_id = ["Course id is required"];

  return errors;
};

// ─── تحويل البيانات قبل الإرسال ────────────────────
const formatPayload = (values: RegisterFormData) => ({
  ...values,
  course_id: values.course_id ? [values.course_id] : [],
});

export function useRegisterForm() {
  const router = useRouter();

  return useForm<RegisterFormData>({
    initialValues: {
      full_name: "",
      email: "",
      mobile_number: "",
      country_iso: "",
      gender: "",
      university_name: "",
      university_major: "",
      course_id: "",
    },

    endpoint: endpoints.auth.student.register,

    validate,
    formatPayload,

    successMessage:
      "تم إنشاء حسابك بنجاح — يرجى مراقبة بريدك الإلكتروني لتفعيل الحساب",

    onSuccess: () => {
      router.push("/login?registered=true");
    },
  });
}
