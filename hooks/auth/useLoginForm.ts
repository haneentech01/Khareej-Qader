"use client";

import { useRouter } from "@/i18n/routing";
import endpoints from "@/lib/api/endpoints";
import { useForm } from "../forms/useForm";
import { LoginFormData, LoginRole, ValidationErrors } from "@/types";
import { useLocale } from "next-intl";
import { toast } from "react-toastify";
import { setRoleCookie } from "@/lib/auth/roleCookie";

// ─── قواعد الفحص المحلي ──────────────────────────
const validate = (values: LoginFormData): ValidationErrors => {
  const errors: ValidationErrors = {};
  if (!values.username.trim()) errors.username = ["Username is required"];
  return errors;
};

/**
 * خريطة: role → endpoint + صفحة التوجيه بعد النجاح.
 *
 * فصلناها هنا عشان useLoginForm يفضل generic ويقبل أي role،
 * والـ LoginForm يختار الـ role بناءً على props أو query params.
 */
const LOGIN_CONFIG: Record<
  LoginRole,
  {
    endpoint: string;
    redirectPath: string;
  }
> = {
  student: {
    endpoint: endpoints.auth.student.login,
    redirectPath: "/dashboard",
  },
  mentor: {
    endpoint: endpoints.auth.mentor.login,
    redirectPath: "/mentor",
  },
  admin: {
    endpoint: endpoints.auth.admin.login,
    redirectPath: "/admin",
  },
};

interface UseLoginFormOptions {
  /** نوع المستخدم اللي بيسجّل دخول — يحدد الـ endpoint + صفحة التوجيه */
  role?: LoginRole;
}

export function useLoginForm({ role = "student" }: UseLoginFormOptions = {}) {
  const router = useRouter();
  const locale = useLocale();

  const config = LOGIN_CONFIG[role];

  return useForm<LoginFormData>({
    initialValues: {
      username: "",
    },

    endpoint: config.endpoint,

    validate,

    successMessage: "تم تسجيل الدخول بنجاح",

    onSuccess: () => {
      // خزّن الـ role في cookie عشان الـ middleware يقدر يحمي المسارات
      // (mentor routes للمدراء فقط، dashboard routes للطلاب فقط)
      setRoleCookie(role);

      // وجّه المستخدم للصفحة المناسبة حسب الـ role
      router.push(config.redirectPath);
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
        "enable-account",
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
