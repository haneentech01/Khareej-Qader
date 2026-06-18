"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Briefcase, BriefcaseBusiness, CircleDollarSign, ClockCheck, CloudUpload, HandHeart, Loader2, MapPin, User } from "lucide-react";
import { motion } from "framer-motion";
import endpoints from "@/lib/api/endpoints";
import { useGetData } from "@/lib/hooks/useGetData";
import { Country, Course, Major, University } from "@/types";
import { useRegisterForm } from "@/hooks/auth/useRegisterForm";
import clsx from "clsx";
import { useState } from "react";

export function MentorRegisterForm() {
  const t = useTranslations("Auth");
  const tTrainer = useTranslations("BecomeTrainer");

  type ContributionType = "mentoring" | "jobs" | "financial";

  const [selected, setSelected] = useState<ContributionType[]>([]);

  const handleToggle = (value: ContributionType) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const isSelected = (value: ContributionType) =>
    selected.includes(value);


  // ─── Hook للتسجيل (POST) ──────────────────────
  const { formData, fieldErrors, loading, handleChange, handleSubmit } =
    useRegisterForm();

  // ─── Hook لجلب الدول (GET) ──────────────────────
  const { data: countries } = useGetData<Country[]>(
    endpoints.lookup.countries
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-[10px] 
      shadow-[0_20px_40px_0x_#0000000D] 
      py-8 md:py-8 px-4 lg:px-6"
    >
      {/* Form header */}
      <div className="flex flex-col items-center mb-10">
        <h2 className="text-2xl font-bold text-brand-dark-text mb-2">
          {tTrainer("form_title")}
        </h2>
        <p className="text-sm text-brand-muted max-w-sm mx-auto leading-relaxed">
          {tTrainer("form_description")}
        </p>
      </div>

      {/* Form fields */}
      <form className="w-full flex flex-col gap-5 md:gap-10" onSubmit={handleSubmit}>
        {/* ── Section 1: Basic Info ── */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-dashed border-gray-200 pb-2">
            <User className="size-6 text-brand-primary shrink-0" />
            <h4 className="text-base md:text-lg font-bold text-black">
              {tTrainer("basic_information")}
            </h4>
          </div>
          {/* full name and email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* full name */}
            <div>
              <Input
                id="full_name"
                name="full_name"
                type="text"
                value={formData.full_name}
                onChange={handleChange}
                placeholder={t("full_name")}
                className="h-12 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
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
                className="h-12 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                required />

              {fieldErrors.email?.[0] && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldErrors.email[0]}
                </p>
              )}
            </div>
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
        </div>

        {/* ── Section 2: Information site ── */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-dashed border-gray-200 pb-2">
            <MapPin className="size-6 text-brand-primary shrink-0" />
            <h4 className="text-base md:text-lg font-bold text-black">
              {tTrainer("location_info")}
            </h4>
          </div>

          {/* Address and City */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Address */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-black">
                {tTrainer("address")}</label>
              <Input
                name="address"
                type="text"
                // value={formData.address}
                // onChange={handleChange}
                placeholder={tTrainer("address_placeholder")}
                className="h-12 ltr:text-left rtl:text-right focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                required />
              {fieldErrors.address?.[0] && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldErrors.address[0]}
                </p>
              )}
            </div>

            {/* City */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-black">
                {tTrainer("city")}
              </label>
              <Input
                name="city"
                type="text"
                // value={formData.city}
                // onChange={handleChange}
                placeholder={tTrainer("city_placeholder")}
                className="h-12 ltr:text-left rtl:text-right focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                required
              />
              {fieldErrors.city?.[0] && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldErrors.city[0]}
                </p>
              )}
            </div>
          </div>

          {/* Country */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-black">
              {tTrainer("country")}
            </label>
            <Select
              name="country"
              // value={formData.country}
              // onChange={handleChange}
              className="h-12 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
              required>
              <option value="">
                {tTrainer("country")}
              </option>
              {Array.isArray(countries) &&
                countries.map((country) => (
                  <option key={country.iso} value={country.iso}>
                    {country.countryCode}
                  </option>
                ))}
            </Select>
            {fieldErrors.country?.[0] && (
              <p className="text-sm text-red-500 mt-1">
                {fieldErrors.country[0]}
              </p>
            )}
          </div>
        </div>

        {/* ── Section 3: Professional Info ── */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-dashed border-gray-200 pb-2">
            <Briefcase className="size-6 text-brand-primary shrink-0" />
            <h4 className="text-base md:text-lg font-bold text-black">
              {tTrainer("professional_info")}
            </h4>
          </div>

          {/* Track Specialization */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-black">
              {tTrainer("track")}
            </label>
            <Select
              name="track_placeholder"
              // value={formData.track}
              // onChange={handleChange}
              className="h-12 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
              required>
              <option value="">
                {tTrainer("track_placeholder")}
              </option>
              {Array.isArray(countries) &&
                countries.map((country) => (
                  <option key={country.iso} value={country.iso}>
                    {country.countryCode}
                  </option>
                ))}
            </Select>
            {fieldErrors.country?.[0] && (
              <p className="text-sm text-red-500 mt-1">
                {fieldErrors.country[0]}
              </p>
            )}
          </div>
        </div>

        {/* ── Section 4: Contribution ── */}
        <div className="">
          {/* Contribution title */}
          <div className="flex flex-col gap-2 pb-4">
            <div className="flex items-center gap-2">
              <HandHeart className="size-6 text-brand-primary shrink-0" />
              <h4 className="text-base md:text-lg font-bold text-black">
                {tTrainer("contribution_title")}
              </h4>
            </div>
            <p className="text-xs text-brand-muted">
              {tTrainer("more_than_one_option")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Mentoring */}
            <button
              type="button"
              onClick={() => handleToggle("mentoring")}
              className={clsx(
                "flex flex-col items-center gap-2 px-5 py-7 border-2 rounded-2xl transition-all duration-200",
                isSelected("mentoring")
                  ? "border-brand-primary bg-brand-primary/5"
                  : "border-brand-border hover:border-brand-primary/50"
              )}
            >
              <User className="size-10 text-brand-primary" />

              <p className="text-sm font-bold text-brand-dark-text">
                {tTrainer("contrib_mentoring")}
              </p>

              <p className="text-xs font-medium text-brand-muted">
                {tTrainer("contrib_mentoring_desc")}
              </p>
            </button>

            {/* Jobs */}
            <button
              type="button"
              onClick={() => handleToggle("jobs")}
              className={clsx(
                "flex flex-col items-center gap-2 px-5 py-7 border-2 rounded-2xl transition-all duration-200",
                isSelected("jobs")
                  ? "border-brand-primary bg-brand-primary/5"
                  : "border-brand-border hover:border-brand-primary/50"
              )}
            >
              <BriefcaseBusiness className="size-10 text-brand-primary" />

              <p className="text-sm font-bold text-brand-dark-text">
                {tTrainer("contrib_jobs")}
              </p>

              <p className="text-xs font-medium text-brand-muted">
                {tTrainer("contrib_jobs_desc")}
              </p>
            </button>

            {/* Financial */}
            <button
              type="button"
              onClick={() => handleToggle("financial")}
              className={clsx(
                "flex flex-col items-center gap-2 px-5 py-7 border-2 rounded-2xl transition-all duration-200",
                isSelected("financial")
                  ? "border-brand-primary bg-brand-primary/5"
                  : "border-brand-border hover:border-brand-primary/50"
              )}
            >
              <CircleDollarSign className="size-10 text-brand-primary" />

              <p className="text-sm font-bold text-brand-dark-text">
                {tTrainer("contrib_financial")}
              </p>

              <p className="text-xs font-medium text-brand-muted">
                {tTrainer("contrib_financial_desc")}
              </p>
            </button>
          </div>

        </div>

        {/* Terms */}
        <div className="flex items-center gap-2">
          <ClockCheck className="size-4 text-brand-primary" />
          <p
            className="text-xs font-medium text-brand-muted leading-relaxed cursor-pointer select-none"
          >
            {tTrainer("review_notice")}
          </p>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={loading}
          className="cursor-pointer w-full bg-brand-primary hover:bg-brand-primary/90 text-white h-12 rounded-2xl text-base font-bold shadow-lg shadow-brand-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loader2 className="size-5 animate-spin" />
          ) : (
            tTrainer("become_a_trainer")
          )}
        </Button>
      </form>
    </motion.div >
  );
}
