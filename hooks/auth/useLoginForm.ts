"use client";

import { useRouter } from "@/i18n/routing";
import endpoints from "@/lib/api/endpoints";
import { useForm } from "../forms/useForm";
import { LoginFormData, ValidationErrors } from "@/types";
import { useLocale } from "next-intl";

// ─── قواعد الفحص المحلي ──────────────────────────
const validate = (values: LoginFormData): ValidationErrors => {
  const errors: ValidationErrors = {};
  if (!values.username.trim()) errors.username = ["Username is required"];
  return errors;
};

export function useLoginForm() {
  const router = useRouter();
  const locale = useLocale();

  return useForm<LoginFormData>({
    initialValues: {
      username: "",
    },

    endpoint: endpoints.auth.student.login,

    validate,

    successMessage: "تم تسجيل الدخول بنجاح",

    onSuccess: () => {
      router.push("/dashboard");
    },
  });
}
