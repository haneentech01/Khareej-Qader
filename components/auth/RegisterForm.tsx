"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { UploadCloud, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export function RegisterForm() {
  const t = useTranslations("Auth");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      password_confirmation: formData.get("password_confirmation"),
      phone: `${formData.get("phoneCode")}${formData.get("phone")}`,
      gender: formData.get("gender"),
      university: formData.get("university"),
      major: formData.get("major"),
      training_path: formData.get("trainingPath"),
      // CV upload might require FormData instead of JSON, but following API route convention
    };

    try {
      const res = await fetch("/api/students/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setErrorMsg(result.message || "حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.");
      } else {
        router.push("/login");
      }
    } catch (err) {
      setErrorMsg("تعذر الاتصال بالخادم. تأكد من اتصالك بالإنترنت.");
    } finally {
      setIsLoading(false);
    }
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
        {errorMsg && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg text-center">
            {errorMsg}
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
          disabled={isLoading}
          className="w-full h-14 bg-brand-primary hover:bg-brand-accent text-white text-lg font-bold rounded-lg shadow-lg shadow-brand-primary/20 transition-all"
        >
          {isLoading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : t("register_btn")}
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
