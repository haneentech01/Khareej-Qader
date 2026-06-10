"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  CloudUpload,
  FileImage,
  Trash2,
  Loader2,
  User,
  Briefcase,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function TrainerForm() {
  const t = useTranslations("BecomeTrainer");
  const locale = useLocale();

  const [profilePicture, setProfilePicture] = React.useState<File | null>(null);
  const [isDragActive, setIsDragActive] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    phone: "",
    phoneCode: "+970",
    specialization: "",
    country: "",
    portfolioLink: "",
    aboutMe: "",
    agreed: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setProfilePicture(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) setProfilePicture(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <form className="flex flex-col gap-5 text-right" onSubmit={handleSubmit}>

      {/* ── Section 1: Basic Info ── */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-dashed border-gray-200 pb-2">
          <User className="size-4 text-brand-primary shrink-0" />
          <h4 className="text-sm font-bold text-black">
            {t("basic_information")}
          </h4>
        </div>

        {/* Name + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-black">{t("full_name")}</label>
            <Input
              name="name"
              value={values.name}
              onChange={handleInputChange}
              placeholder={t("full_name_placeholder")}
              className="h-11 rounded-xl border-slate-200 bg-gray-50 focus-visible:ring-brand-primary/20 text-sm"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-black">{t("email")}</label>
            <Input
              type="email"
              name="email"
              value={values.email}
              onChange={handleInputChange}
              placeholder={t("email_placeholder")}
              className="h-11 rounded-xl border-slate-200 bg-gray-50 focus-visible:ring-brand-primary/20 text-sm"
            />
          </div>
        </div>

        {/* Phone + Country */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-black">{t("phone")}</label>
            <div className="flex gap-2">
              <select
                name="phoneCode"
                value={values.phoneCode}
                onChange={handleInputChange}
                className="h-11 px-2 bg-gray-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 cursor-pointer"
              >
                <option value="+970">🇵🇸 +970</option>
                <option value="+972">🇵🇸 +972</option>
                <option value="+966">🇸🇦 +966</option>
                <option value="+971">🇦🇪 +971</option>
                <option value="+20">🇪🇬 +20</option>
                <option value="+962">🇯🇴 +962</option>
              </select>
              <Input
                name="phone"
                value={values.phone}
                onChange={handleInputChange}
                placeholder={t("phone_placeholder")}
                className="flex-1 h-11 rounded-xl border-slate-200 bg-gray-50 focus-visible:ring-brand-primary/20 text-sm"
                dir="ltr"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-black">{t("country")}</label>
            <Input
              name="country"
              value={values.country}
              onChange={handleInputChange}
              placeholder={t("country_placeholder")}
              className="h-11 rounded-xl border-slate-200 bg-gray-50 focus-visible:ring-brand-primary/20 text-sm"
            />
          </div>
        </div>

        {/* Profile Picture Upload */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-black">{t("profile_picture")}</label>
          {profilePicture ? (
            <div className="flex items-center gap-2.5 bg-emerald-50 border border-brand-primary/20 px-3 h-11 rounded-xl">
              <FileImage className="size-4 text-brand-primary shrink-0" />
              <span className="text-xs font-bold text-black truncate flex-1">{profilePicture.name}</span>
              <span className="text-[10px] text-brand-muted shrink-0">
                {(profilePicture.size / 1024).toFixed(1)} KB
              </span>
              <button
                type="button"
                onClick={() => setProfilePicture(null)}
                className="text-brand-muted hover:text-red-500 transition-colors"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ) : (
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={cn(
                "relative flex items-center justify-center gap-2 w-full h-11 border border-dashed rounded-xl transition-all cursor-pointer",
                isDragActive
                  ? "border-brand-primary bg-emerald-50/40"
                  : "border-slate-200 hover:border-brand-primary/50 hover:bg-emerald-50/10"
              )}
            >
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <CloudUpload className="size-4 text-brand-muted" />
              <span className="text-xs font-semibold text-brand-muted">
                {t("profile_picture_hint")}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Section 2: Professional Info ── */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-dashed border-gray-200 pb-2">
          <Briefcase className="size-4 text-brand-primary shrink-0" />
          <h4 className="text-sm font-bold text-black">
            {t("professional_information")}
          </h4>
        </div>

        {/* Specialization + Portfolio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-black">{t("specialization")}</label>
            <Input
              name="specialization"
              value={values.specialization}
              onChange={handleInputChange}
              placeholder={t("specialization_placeholder")}
              className="h-11 rounded-xl border-slate-200 bg-gray-50 focus-visible:ring-brand-primary/20 text-sm"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-black">{t("portfolio_link")}</label>
            <Input
              name="portfolioLink"
              value={values.portfolioLink}
              onChange={handleInputChange}
              placeholder={t("portfolio_placeholder")}
              className="h-11 rounded-xl border-slate-200 bg-gray-50 focus-visible:ring-brand-primary/20 text-sm"
              dir="ltr"
            />
          </div>
        </div>

        {/* About Me */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-black">{t("about_me")}</label>
          <textarea
            name="aboutMe"
            value={values.aboutMe}
            onChange={handleInputChange}
            placeholder={t("about_me_placeholder")}
            rows={3}
            className="w-full bg-gray-50 border border-slate-200 rounded-xl p-3 text-sm resize-none focus:ring-2 focus:ring-brand-primary/20 focus:outline-none focus:border-brand-primary/30 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Terms */}
      <div className="flex items-start gap-2.5">
        <input
          type="checkbox"
          id="terms"
          name="agreed"
          checked={values.agreed}
          onChange={handleInputChange}
          className="mt-0.5 accent-brand-primary size-4 cursor-pointer rounded shrink-0"
        />
        <label
          htmlFor="terms"
          className="text-[11px] font-medium text-brand-muted leading-relaxed cursor-pointer select-none"
        >
          {t("terms_text")}
        </label>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white h-12 rounded-2xl text-base font-bold shadow-lg shadow-brand-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2"
      >
        {loading ? (
          <Loader2 className="size-5 animate-spin" />
        ) : (
          t("become_a_trainer")
        )}
      </Button>
    </form>
  );
}
