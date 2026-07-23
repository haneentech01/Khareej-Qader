"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RoleTabs } from "./RoleTabs";
import { Role } from "@/types";
import { useLoginForm } from "@/hooks/auth/useLoginForm";
import { useLoginRole } from "@/hooks/auth/useLoginRole";
import { useActivationHighlight } from "@/hooks/auth/useActivationHighlight";
import { RegisterModal } from "@/components/layout/RegisterModal";

interface LoginFormProps {
  role?: Role;
  showActivationMessage?: boolean;
}

export function LoginForm({
  role: propRole,
  showActivationMessage = false,
}: LoginFormProps) {
  const t = useTranslations("Auth");
  const role = useLoginRole(propRole);
  const { isRegistered, highlightedRole } = useActivationHighlight();
  const { formData, fieldErrors, loading, handleChange, handleSubmit } = useLoginForm({ role });
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0, }}
      transition={{ duration: 0.5, }}
      className="
        bg-white rounded-[10px]
        shadow-[0_20px_40px_0px_#0000000D]
        p-8 md:p-12
        border border-slate-50 mt-28"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-black mb-4">
          {t("login_title")}
        </h1>

        <p className="text-brand-muted">
          {t("subtitle")}
        </p>
      </div>

      {/* Registration Banner */}
      {isRegistered &&
        highlightedRole && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-6"
          >
            <div className="p-4 rounded-2xl border border-green-100 bg-green-50">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="size-6 text-green-600" />

                <div>
                  <h4 className="font-semibold text-green-900">
                    {highlightedRole ===
                      "mentor"
                      ? t("registration_success_mentor")
                      : t("registration_success_student")}
                  </h4>

                  <p className="text-sm text-green-800">
                    {t("activation_required_message")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

      {/* Activation Banner */}
      {showActivationMessage &&
        !isRegistered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-6"
          >
            <div className="p-4 rounded-2xl border border-green-100 bg-green-50">
              <h4 className="font-semibold text-green-900">
                {t("activation_required_title")}
              </h4>

              <p className="text-sm text-green-800 mt-1">
                {t("activation_required_message")}
              </p>
            </div>
          </motion.div>
        )}

      <RoleTabs
        currentRole={role}
        highlightedRole={highlightedRole}
      />

      <form
        className="space-y-6"
        onSubmit={handleSubmit}
      >
        <div>
          <Input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder={t("username")}
            required
            className="
              h-11
              focus-visible:ring-0
              focus-visible:ring-offset-0
              focus-visible:outline-none"
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

        <div className="text-center">
          <p className="text-sm text-slate-500">
            {t("no_account")}{" "}
            <button
              type="button"
              onClick={() =>
                setIsRegisterOpen(true)
              }
              className="
                text-brand-primary font-bold hover:underline"
            >
              {t("create_account")}
            </button>
          </p>
        </div>
      </form>

      <RegisterModal
        open={isRegisterOpen}
        onOpenChange={setIsRegisterOpen}
      />
    </motion.div>
  );
}