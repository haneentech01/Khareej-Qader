"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAdminLoginForm } from "@/hooks/auth/useAdminLoginForm";
import Image from "next/image";
import { useState } from "react";


export function AdminLoginForm() {
  const t = useTranslations("Admin.login");
  const { formData, loading, error, handleChange, handleSubmit } =
    useAdminLoginForm();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#F6FBFA] p-6 md:p-10">
      {/* Form Section */}
      <div className="flex items-center justify-center px-6 py-10">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-150 bg-white rounded-[10px]
          shadow-[0_20px_40px_0px_#0000000D]
          p-8 md:p-12 border border-slate-50"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">
              {t("title")}
            </h1>

            <p className="text-brand-muted">
              {t("subtitle")}
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit} >
            <Input
              id="admin-username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder={t("username_placeholder")}
              className="h-11 focus-visible:ring-0
              focus-visible:ring-offset-0
              focus-visible:outline-none"
              required
            />

            <div className="relative">
              <Input
                id="admin-password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder={t("password_placeholder")}
                required
                className="h-11 focus-visible:ring-0
              focus-visible:ring-offset-0
              focus-visible:outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className=" w-full h-14 bg-brand-primary text-white rounded-2xl"
            >
              {loading ? (
                <Loader2 className="size-6 animate-spin mx-auto" />
              ) : (
                t("submit")
              )}
            </Button>
          </form>
        </motion.div>
      </div>

      {/* Illustration Section */}
      <div className="hidden lg:flex items-center justify-center px-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/images/signupAdminLogo.png"
            alt="Admin Login"
            width={600}
            height={550}
            className=" w-full max-w-150 h-auto object-contain"
            priority
          />
        </motion.div>
      </div>
    </div>
  );


}
