"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useLoginForm } from "@/hooks/auth/useLoginForm";
import { Loader2 } from "lucide-react";

export function LoginForm() {
  const t = useTranslations("Auth");

  // ─── Hook للتسجيل (POST) ──────────────────────
  const { formData, fieldErrors, loading, handleChange, handleSubmit } =
    useLoginForm();

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
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-black mb-4">
          {t("login_title")}
        </h1>
        <p className="text-brand-muted text-base">
          {t("subtitle")}
        </p>
      </div>

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
