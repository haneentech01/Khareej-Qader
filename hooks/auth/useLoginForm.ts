"use client";

import { useRouter } from "@/i18n/routing";
import endpoints from "@/lib/api/endpoints";
import { useForm } from "../forms/useForm";
import { LoginFormData, ValidationErrors } from "@/types";
import { useLocale } from "next-intl";
import { toast } from "react-toastify";

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

    // ─── معالجة خطأ الحساب غير المفعّل ───────────────
    onError: (_errors, message) => {
      const lowerMessage = message.toLowerCase();

      // الباك إند ممكن يرجع رسالة فيها كلمات تدل إن الحساب غير مفعّل
      const activationKeywords = [
        "activate",
        "activation",
        "تفعيل",
        "غير مفعّل",
        "not activated",
        "not verified",
        "verify",
        "email verification",
        "حسابك غير نشط",
        "inactive",
      ];

      const isActivationError = activationKeywords.some((keyword) =>
        lowerMessage.includes(keyword),
      );

      if (isActivationError) {
        toast.error(
          locale === "ar"
            ? "حسابك لم يتم تفعيله بعد. يرجى مراجعة بريدك الإلكتروني والضغط على رابط التفعيل."
            : "Your account has not been activated yet. Please check your email and click the activation link.",
          { autoClose: 6000 },
        );
      }
    },
  });
}
