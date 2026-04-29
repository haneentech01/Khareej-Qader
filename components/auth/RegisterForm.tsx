"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { UploadCloud, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useInsertData } from "@/hooks/useInsertData";
import endpoints from "@/lib/api/endpoints";

export function RegisterForm() {
  const t = useTranslations("Auth");
  const router = useRouter();
  const { insertData, loading, error } = useInsertData(
    endpoints.auth.register
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fields = new FormData(e.currentTarget);

    const formData = new FormData();
    formData.append("name", fields.get("name") as string);
    formData.append("email", fields.get("email") as string);
    formData.append("password", fields.get("password") as string);
    formData.append("password_confirmation", fields.get("password_confirmation") as string);
    formData.append("phone", `${fields.get("phoneCode")}${fields.get("phone")}`);
    formData.append("gender", fields.get("gender") as string);
    formData.append("university", fields.get("university") as string);
    formData.append("major", fields.get("major") as string);
    formData.append("training_path", fields.get("trainingPath") as string);

    const cvFile = fields.get("cv") as File;
    if (cvFile && cvFile.size > 0) {
      formData.append("cv", cvFile);
    }

    const result = await insertData(formData);
    if (result) router.push("/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-[10px] 
      shadow-[0_20px_40px_0x_#0000000D] 
      py-8 md:py-8 px-4 lg:px-11"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">
          {t("register_title")}
        </h1>
        <p className="text-brand-muted text-base">
          {t("subtitle")}
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* full name */}
        <div>
          <Input className="h-11" name="name" placeholder={t("full_name")} required />
        </div>

        {/* email */}
        <div>
          <Input className="h-11" type="email" name="email" placeholder={t("email")} required />
        </div>

        {/* password */}
        <div>
          <Input className="h-11" type="password" name="password" placeholder={t("password")} required />
        </div>

        {/* confirm password */}
        <div>
          <Input className="h-11" type="password" name="password_confirmation" placeholder={t("password_confirmation")} required />
        </div>

        {/* phone */}
        <div>
          <div className="flex gap-2">
            <div className="w-1/3 min-w-[120px]">
              <Select defaultValue="+970" className="h-12" name="phoneCode">
                <option value="+970">🇵🇸 +970</option>
                <option value="+972">🇵🇸 +972</option>
                <option value="+966">🇸🇦 +966</option>
                <option value="+971">🇦🇪 +971</option>
                <option value="+20">🇪🇬 +20</option>
                <option value="+962">🇯🇴 +962</option>
              </Select>
            </div>
            <div className="flex-1">
              <Input type="tel" name="phone" placeholder={t("phone")} className="h-12 text-right" required />
            </div>
          </div>
        </div>

        {/* gender */}
        <div className="grid grid-cols-1 gap-4">
          <Select defaultValue="" name="gender" required>
            <option value="" disabled>{t("gender")}</option>
            <option value="male">ذكر</option>
            <option value="female">أنثى</option>
          </Select>

          {/* university */}
          <Select defaultValue="" name="university" required>
            <option value="" disabled>{t("university")}</option>
            <option value="azhar">جامعة الأزهر</option>
            <option value="islamic">الجامعة الإسلامية</option>
            <option value="aqsa">جامعة الأقصى</option>
            <option value="israa">جامعة الإسراء</option>
            <option value="gaza">جامعة غزة</option>
            <option value="ucas">الكلية التطبيقية للعلوم التطبيقية</option>
          </Select>

          {/* major */}
          <Select defaultValue="" name="major" required>
            <option value="" disabled>{t("major")}</option>
            <option value="se">Software Engineering</option>
            <option value="cs">Computer Science</option>
            <option value="it">Information Technology</option>
          </Select>

          {/* training path */}
          <Select defaultValue="" name="trainingPath" required>
            <option value="" disabled>{t("training_path")}</option>
            <option value="web">Web Development</option>
            <option value="uiux">UI/UX Design</option>
            <option value="marketing">Digital Marketing</option>
          </Select>
        </div>

        {/* CV Upload */}
        <div className="">
          <div className="group relative flex flex-col 
          items-center justify-center w-full h-32 
          border-2 border-dashed border-slate-200 
          rounded-2xl hover:border-brand-primary/50 
          hover:bg-emerald-50/30 transition-all cursor-pointer">
            <input type="file" name="cv" className="absolute inset-0 opacity-0 cursor-pointer" />
            <UploadCloud className="w-8 h-8 text-brand-muted 
            group-hover:text-brand-primary transition-colors mb-2" />
            <span className="text-base font-semibold text-black">{t("cv_label")}</span>
            <span className="text-xs text-brand-muted mt-2.5">{t("cv_hint")}</span>
          </div>
        </div>

        {/* register button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-14 bg-brand-primary hover:bg-brand-accent text-white text-lg font-bold rounded-lg shadow-lg shadow-brand-primary/20 transition-all"
        >
          {loading
            ? <Loader2 className="w-6 h-6 animate-spin mx-auto" />
            : t("register_btn")}
        </Button>

        {/* already have an account */}
        <div className="text-center">
          <p className="text-sm text-brand-muted">
            {t("has_account")}{" "}
            <Link href="/login" className="text-brand-primary font-bold hover:underline">
              {t("login_title")}
            </Link>
          </p>
        </div>
      </form>
    </motion.div>
  );
}
