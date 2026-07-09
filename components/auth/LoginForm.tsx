"use client";

import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { useSearchParams as useNextSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useLoginForm } from "@/hooks/auth/useLoginForm";
import { Loader2, GraduationCap, Briefcase } from "lucide-react";

import { cn } from "@/lib/utils";
import { Role } from "@/types";

interface LoginFormProps {
  showActivationMessage?: boolean;
  role?: Role;
}

function useLoginRole(propRole?: Role): Role {
  const searchParams = useNextSearchParams();
  const queryRole = searchParams.get("role");

  if (propRole) return propRole;
  if (queryRole === "mentor" || queryRole === "student" || queryRole === "admin") {
    return queryRole;
  }
  return "student";
}


function RoleTabs({ currentRole }: { currentRole: Role }) {
  const t = useTranslations("Auth");
  const router = useRouter();
  const searchParams = useNextSearchParams();

  const handleRoleChange = (newRole: Role) => {
    if (newRole === currentRole) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("role", newRole);
    params.delete("redirect");
    router.push(`/login?${params.toString()}`);
  };

  const tabs: { role: Role; label: string; desc: string; icon: typeof GraduationCap }[] = [
    { role: "student", label: t("role_student"), desc: t("role_student_desc"), icon: GraduationCap },
    { role: "mentor", label: t("role_mentor"), desc: t("role_mentor_desc"), icon: Briefcase },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 mb-8">
      {tabs.map((tab) => {
        const isActive = currentRole === tab.role;
        const Icon = tab.icon;

        return (
          <button
            key={tab.role}
            type="button"
            onClick={() => handleRoleChange(tab.role)}
            className={cn(
              "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer",
              isActive
                ? "border-brand-primary bg-brand-primary/5 text-brand-primary"
                : "border-gray-200 text-gray-500 hover:border-brand-primary/40 hover:bg-gray-50",
            )}
            aria-pressed={isActive}
          >
            <Icon className={cn("size-6", isActive ? "text-brand-primary" : "text-gray-400")} />
            <span className={cn("text-sm font-bold", isActive ? "text-brand-primary" : "text-gray-600")}>
              {tab.label}
            </span>
            <span className="text-[10px] text-gray-400 text-center leading-tight">
              {tab.desc}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function LoginForm({ showActivationMessage = false, role: propRole }: LoginFormProps) {
  const t = useTranslations("Auth");
  const role = useLoginRole(propRole);
  const { formData, fieldErrors, loading, handleChange, handleSubmit } =
    useLoginForm({ role });

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-[10px]
      shadow-[0_20px_40px_0px_#0000000D]
      p-8 md:p-12 border border-slate-50 mt-28"
    >
      {/* title + subtitle */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-black mb-4">
          {t("login_title")}
        </h1>
        <p className="text-brand-muted text-base">
          {t("subtitle")}
        </p>
      </div>

      <RoleTabs currentRole={role} />


      {showActivationMessage && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.4 }}
          className="mb-6 p-4 rounded-2xl border border-green-100 bg-green-50"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-base font-semibold text-green-900">
                {t("activation_required_title")}
              </h4>
              <p className="text-sm text-green-800 mt-1">
                {t("activation_required_message")}
              </p>
              <p className="text-xs text-green-700 mt-2">
                {t("check_spam")}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* username */}
        <div>
          <Input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            className="h-11 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
            placeholder={t("username")}
            required
          />
          {fieldErrors.username?.[0] && (
            <p className="text-sm text-red-500 mt-1">
              {fieldErrors.username[0]}
            </p>
          )}
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          disabled={loading}
          className="cursor-pointer w-full h-14 bg-brand-primary hover:bg-brand-hover text-white text-lg font-bold rounded-2xl shadow-lg shadow-brand-primary/20 transition-all mt-4">

          {loading
            ? <Loader2 className="w-6 h-6 animate-spin mx-auto" />
            : t("register_btn")}
        </Button>

        {/* Register Button */}
        <div className="text-center mt-8">
          <p className="text-sm text-slate-500">
            {t("no_account")}{" "}
            <Link href="/register" className="text-brand-primary font-bold hover:underline">
              {t("create_account")}
            </Link>
          </p>
        </div>
      </form>
    </motion.div>
  );
}
