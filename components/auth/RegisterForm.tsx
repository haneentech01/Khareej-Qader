"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import endpoints from "@/lib/api/endpoints";
import { useGetData } from "@/lib/hooks/useGetData";
import { Country, CourseListItem, Major, University } from "@/types";
import { useRegisterForm } from "@/hooks/auth/useRegisterForm";

export function RegisterForm() {
  const t = useTranslations("Auth");

  // ─── Hook للتسجيل (POST) ──────────────────────
  const { formData, fieldErrors, loading, handleChange, handleSubmit } =
    useRegisterForm();

  // ─── Hook لجلب الدول (GET) ──────────────────────
  const { data: countries } = useGetData<Country[]>(
    endpoints.lookup.codeCountries
  );

  const { data: universities } = useGetData<University[]>(
    endpoints.lookup.universities
  );

  const { data: majors } = useGetData<Major[]>(
    endpoints.lookup.majors
  );

  const { data: courses } = useGetData<CourseListItem[]>(
    endpoints.lookup.coursesList
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
      {/* title + subtitle */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">
          {t("register_title")}
        </h1>
        <p className="text-brand-muted text-base">
          {t("subtitle")}
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* full name */}
        <div>
          <Input
            id="full_name"
            name="full_name"
            type="text"
            value={formData.full_name}
            onChange={handleChange}
            placeholder={t("full_name")}
            className="h-11 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
            required />

          {fieldErrors.full_name?.[0] && (
            <p className="text-sm text-red-500 mt-1">
              {fieldErrors.full_name[0]}
            </p>
          )}
        </div>

        {/* email */}
        <div>
          <Input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("email")}
            className="h-11 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
            required />

          {fieldErrors.email?.[0] && (
            <p className="text-sm text-red-500 mt-1">
              {fieldErrors.email[0]}
            </p>
          )}
        </div>

        {/* phone */}
        <div>
          <div className="flex gap-2">
            <div className="w-1/3 min-w-[120px]">
              <Select
                id="country_iso"
                name="country_iso"
                value={formData.country_iso}
                onChange={handleChange}
                required
                className="h-12 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
              >
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
                id="mobile_number"
                name="mobile_number"
                type="tel"
                value={formData.mobile_number}
                onChange={handleChange}
                placeholder={t("phone")}
                className="h-12 ltr:text-left rtl:text-right focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                required />
            </div>
          </div>

          {fieldErrors.country_iso?.[0] && (
            <p className="text-sm text-red-500 mt-1">
              {fieldErrors.country_iso[0]}
            </p>
          )}
          {fieldErrors.mobile_number?.[0] && (
            <p className="text-sm text-red-500 mt-1">
              {fieldErrors.mobile_number[0]}
            </p>
          )}
        </div>


        {/* gender */}
        <div>
          <Select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
            required
          >
            <option disabled value="">{t("gender")}</option>
            <option value="male">{t("male")}</option>
            <option value="female">{t("female")}</option>
          </Select>

          {fieldErrors.gender?.[0] && (
            <p className="text-sm text-red-500 mt-1">
              {fieldErrors.gender[0]}
            </p>
          )}
        </div>

        {/* university */}
        <div>
          <Select
            id="university_name"
            name="university_name"
            value={formData.university_name}
            onChange={handleChange}
            className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
            required>
            <option value="" disabled>{t("university")}</option>
            {Array.isArray(universities) &&
              universities.map((university) => (
                <option key={university.id} value={university.id}>
                  {university.un_name}
                </option>
              ))}
          </Select>
          {fieldErrors.university_name?.[0] && (
            <p className="text-sm text-red-500 mt-1">
              {fieldErrors.university_name[0]}
            </p>
          )}
        </div>

        {/* major */}
        <div>
          <Select
            id="university_major"
            name="university_major"
            value={formData.university_major}
            onChange={handleChange}
            className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
            required
          >
            <option>{t("major")}</option>
            {Array.isArray(majors) &&
              majors.map((major) => (
                <option key={major.id} value={major.id}>
                  {major.name}
                </option>
              ))}
          </Select>
          {fieldErrors.university_major?.[0] && (
            <p className="text-sm text-red-500 mt-1">
              {fieldErrors.university_major[0]}
            </p>
          )}
        </div>

        {/* training path */}
        <div>
          <Select
            id="course_id"
            name="course_id"
            value={formData.course_id}
            onChange={handleChange}
            className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none" required>
            <option value="" disabled>{t("training_path")}</option>
            {Array.isArray(courses) &&
              courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
          </Select>
          {fieldErrors.course_id?.[0] && (
            <p className="text-sm text-red-500 mt-1">
              {fieldErrors.course_id[0]}
            </p>
          )}
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
