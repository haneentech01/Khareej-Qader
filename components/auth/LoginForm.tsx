"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useLoginForm } from "@/hooks/auth/useLoginForm";

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

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        {/* username */}
        <div>
          <Input
            id="username"
            type="text"
            name="username"
            value={formData.full_name}
            onChange={handleChange}
            className="h-11 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
            placeholder={t("username")}
            required
          />
        </div>

        {/* password */}
        {/* <div>
          <div className="relative">
            <Input
              className="h-11"
              type={show ? "text" : "password"}
              placeholder={t("password")}
            />

            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted"
            >
              {show
                ? <EyeOff size={18} />
                : <Eye size={18} />}
            </button>
          </div>

          <div className="flex items-center justify-between mt-2.5">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="remember" className="h-4 w-4" />
              <label htmlFor="remember" className="text-sm text-gray-600">
                {t("remember_me")}
              </label>
            </div>
            <Link href="#" className="text-sm text-brand-primary hover:underline">
              {t("forgot_password")}
            </Link>
          </div>
        </div> */}

        {/* Login Button */}
        <Button className="w-full h-14 bg-brand-primary hover:bg-brand-hover text-white text-lg font-bold rounded-2xl shadow-lg shadow-brand-primary/20 transition-all mt-4">
          {t("register_btn")}
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
