"use client";

import { useRouter } from "@/i18n/routing";
import endpoints from "@/lib/api/endpoints";
import { setRoleCookie } from "@/lib/auth/roleCookie";
import { useForm } from "../forms/useForm";
import { LoginFormData, Role, ValidationErrors } from "@/types";
import { useLocale } from "next-intl";
import { toast } from "react-toastify";

// ─── قواعد الفحص المحلي ──────────────────────────
const validate = (values: LoginFormData): ValidationErrors => {
  const errors: ValidationErrors = {};
  if (!values.username.trim()) errors.username = ["Username is required"];
  return errors;
};

const LOGIN_ENDPOINTS: Record<Role, string> = {
  student: endpoints.auth.student.login,
  mentor: endpoints.auth.mentor.login,
  admin: endpoints.auth.admin.login,
};

/** صفحة التوجيه الافتراضية لكل role (تُستخدم كـ fallback لو الـ backend ما رجّعش role) */
const DEFAULT_REDIRECT_PATHS: Record<Role, string> = {
  student: "/dashboard",
  mentor: "/mentor",
  admin: "/admin",
};

interface UseLoginFormOptions {
  role?: Role;
}

/**
 * يستخرج الـ role من استجابة الـ backend.
 *
 * الـ backend بيرجع:
 * {
 *   success: true,
 *   message: null,
 *   data: {
 *     user: {
 *       slug, name, email, mentor, role: "student" | "mentor" | ...
 *     }
 *   }
 * }
 *
 * نستخرج `data.user.role` ونتأكد إنه قيمة صحيحة.
 * لو الـ backend رجّع role مش صحيح، نرجّع null ونعتمد على الـ role اللي اختاره المستخدم.
 */
function extractRoleFromResponse(data: unknown): Role | null {
  if (!data || typeof data !== "object") return null;

  const response = data as { data?: { user?: { role?: string } } };
  const role = response?.data?.user?.role;

  if (role === "student" || role === "mentor" || role === "admin") {
    return role;
  }

  return null;
}

export function useLoginForm({
  role: selectedRole = "student",
}: UseLoginFormOptions = {}) {
  const router = useRouter();
  const locale = useLocale();

  const endpoint = LOGIN_ENDPOINTS[selectedRole];

  return useForm<LoginFormData>({
    initialValues: {
      username: "",
    },

    endpoint,

    validate,

    successMessage: "تم تسجيل الدخول بنجاح",

    onSuccess: (responseData) => {
      const backendRole = extractRoleFromResponse(responseData);

      // لو الـ backend رجّع role صحيح، نستخدمه.
      // لو لأ (نادر)، نستخدم الـ role اللي اختاره المستخدم كـ fallback.
      const finalRole: Role = backendRole ?? selectedRole;

      setRoleCookie(finalRole);

      // وجّه المستخدم للصفحة المناسبة حسب الـ role الحقيقي
      const redirectPath = DEFAULT_REDIRECT_PATHS[finalRole];
      router.push(redirectPath);

      // لوج للديباج (مفيد لو فيه mismatch بين الـ selected role والـ backend role)
      if (backendRole && backendRole !== selectedRole) {
        console.warn(
          `[login] Role mismatch: user selected "${selectedRole}" but backend returned "${backendRole}". Using backend role.`,
        );
      }
    },

    // ─── معالجة خطأ الحساب غير المفعّل ───────────────
    onError: (_errors, message) => {
      const lowerMessage = message.toLowerCase();

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
