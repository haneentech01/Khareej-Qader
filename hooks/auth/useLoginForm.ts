"use client";

import { useRouter } from "@/i18n/routing";
import endpoints from "@/lib/api/endpoints";
import { useForm } from "../forms/useForm";
import { LoginFormData, Role, ValidationErrors } from "@/types";
import { useLocale } from "next-intl";
import { toast } from "react-toastify";
import apiClient from "@/lib/api/client";
import { setRoleCookie } from "@/lib/auth/roleCookie";

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

const DEFAULT_REDIRECT_PATHS: Record<Role, string> = {
  student: "/dashboard",
  mentor: "/mentor",
  admin: "/admin",
};

interface UseLoginFormOptions {
  role?: Role;
}

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

    onSuccess: async (responseData) => {
      const backendRole = extractRoleFromResponse(responseData);

      const finalRole: Role = backendRole ?? selectedRole;

      try {
        setRoleCookie(finalRole);
      } catch (err) {
        console.warn("[login] Failed to set role cookie:", err);
      }

      const redirectPath = DEFAULT_REDIRECT_PATHS[finalRole];
      router.push(redirectPath);

      if (backendRole && backendRole !== selectedRole) {
        console.warn(
          `[login] Role mismatch: user selected "${selectedRole}" but backend returned "${backendRole}". Using backend role.`,
        );
      }
    },

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
