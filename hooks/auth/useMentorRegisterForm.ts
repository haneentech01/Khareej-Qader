"use client";

import { useRouter } from "@/i18n/routing";
import endpoints from "@/lib/api/endpoints";
import { useForm } from "../forms/useForm";
import { MentorRegisterFormData, ValidationErrors } from "@/types";

// ─── قواعد الفحص المحلي ──────────────────────────
const validate = (values: MentorRegisterFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!values.name.trim()) errors.name = ["Name is required"];

  if (!values.email.trim()) errors.email = ["Email is required"];

  if (!values.country_iso) errors.country_iso = ["Country iso is required"];

  if (!values.mobile_number.trim())
    errors.mobile_number = ["Mobile number is required"];

  if (!values.address.trim()) errors.address = ["Address is required"];

  if (!values.city) errors.city = ["City name is required"];

  if (!values.state_code) errors.state_code = ["Country is required"];

  if (!values.course) errors.course_id = ["Course is required"];

  if (values.contribution_types.length === 0)
    errors.contribution_types = ["Select at least one contribution type"];

  return errors;
};

// ─── تحويل البيانات قبل الإرسال ────────────────────
const formatPayload = (values: MentorRegisterFormData) => ({
  ...values,
});

export function useMentorRegisterForm() {
  const router = useRouter();

  return useForm<MentorRegisterFormData>({
    initialValues: {
      name: "",
      email: "",
      country_iso: "",
      mobile_number: "",
      address: "",
      city: "",
      state_code: "",
      course: "",
      contribution_types: [],
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
