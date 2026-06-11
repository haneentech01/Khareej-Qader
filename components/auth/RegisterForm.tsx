"use client";

import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import endpoints from "@/lib/api/endpoints";
import { useInsertData } from "@/lib/hooks/useInsertData";
import { useGetData } from "@/lib/hooks/useGetData";
import { Country, Course, Major, RegisterResponse, University } from "@/types";

export function RegisterForm() {
  const t = useTranslations("Auth");
  const router = useRouter();

  // ─── Hook للتسجيل (POST) ──────────────────────
  const { data, loading, error, insertData } = useInsertData<RegisterResponse>(
    endpoints.auth.student.register
  );

  // ─── Hook لجلب الدول (GET) ──────────────────────
  const { data: countries } = useGetData<Country[]>(
    endpoints.lookup.countries
  );

  const { data: universities } = useGetData<University[]>(
    endpoints.lookup.universities
  );

  const { data: majors } = useGetData<Major[]>(
    endpoints.lookup.majors
  );

  const { data: courses } = useGetData<Course[]>(
    endpoints.lookup.courses
  )

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

      <form className="space-y-6">
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* full name */}
        <div>
          <Input className="h-11"
            id="full_name" name="full_name"
            placeholder={t("full_name")} required />
        </div>

        {/* email */}
        <div>
          <Input className="h-11" id="email" type="email" name="email" placeholder={t("email")} required />
        </div>

        {/* phone */}
        <div>
          <div className="flex gap-2">
            <div className="w-1/3 min-w-[120px]">
              <Select name="country_iso" className="h-12">
                <option value="">{t("country")}</option>

                {Array.isArray(countries) &&
                  countries.map((country) => (
                    <option key={country.iso} value={country.iso}>
                      {country.countryCode}
                    </option>
                  ))}
              </Select>
            </div>

            <div className="flex-1">
              <Input
                type="tel"
                id="mobile_number"
                name="mobile_number" placeholder={t("phone")}
                className="h-12 text-right" required />
            </div>
          </div>
        </div>

        {/* gender */}
        <div className="grid grid-cols-1 gap-4">
          <Select
            defaultValue=""
            id="gender"
            name="gender"
            required
          >
            <option value="" disabled>
              {t("gender")}
            </option>

            <option value="male">
              {t("male")}
            </option>

            <option value="female">
              {t("female")}
            </option>
          </Select>

          {/* university */}
          <Select
            defaultValue=""
            id="university_name"
            name="university_name" required>
            <option value="" disabled>{t("university")}</option>
            {Array.isArray(universities) &&
              universities.map((university) => (
                <option key={university.id} value={university.id}>
                  {university.un_name}
                </option>
              ))}
          </Select>

          {/* major */}
          <Select name="university_major" required>
            <option value="">{t("major")}</option>
            {Array.isArray(majors) &&
              majors.map((major) => (
                <option key={major.id} value={major.id}>
                  {major.name}
                </option>
              ))}
          </Select>

          {/* training path */}
          <Select defaultValue="" id="course_id" name="course_id" required>
            <option value="" disabled>{t("training_path")}</option>
            {Array.isArray(courses) &&
              courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
          </Select>
        </div>

        {/* CV Upload */}
        {/* <div className="">
          <div className="group relative flex flex-col 
          items-center justify-center w-full h-32 
          border-2 border-dashed border-slate-200 
          rounded-2xl hover:border-brand-primary/50 
          hover:bg-emerald-50/30 transition-all cursor-pointer">
            <input type="file" name="cv" className="absolute inset-0 opacity-0 cursor-pointer" />
            <UploadCloud className="w-8 h-8 text-brand-muted 
            group-hover:text-brand-primary transition-colors mb-2" />
            <span className="text-base font-semibold text-black">
              {t("cv_label")}
            </span>
            <span className="text-xs text-brand-muted mt-2.5">
              {t("cv_hint")}
            </span>
          </div>
        </div> */}

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
