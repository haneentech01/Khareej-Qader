"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { CloudUpload, EyeIcon, EyeOff, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";

export function TrainerForm() {
  const t = useTranslations("BecomeTrainer");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative bg-white p-8 rounded-4xl 
      border border-slate-50
     mx-auto z-20 overflow-y-auto max-h-[90vh]">

      <DialogClose asChild>
        <button
          type="button"
          className={cn(
            "absolute top-4 text-brand-muted hover:text-black transition-colors rounded-full p-2 bg-gray-50 hover:bg-gray-100",
            isRtl ? "left-4" : "right-4"
          )}
        >
          <XIcon className="size-5" />
          <span className="sr-only">Close</span>
        </button>
      </DialogClose>

      <h3 className="text-2xl font-bold text-black mb-8 text-center md:text-right">
        {t("form_title")}
      </h3>

      <form className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-black px-1">
              {t("full_name")}
            </label>
            <Input
              placeholder={t("full_name_placeholder")}
              className="bg-gray-bg border-none h-12 rounded-xl focus-visible:ring-brand-primary/20"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-black px-1">
              {t("email")}
            </label>
            <Input
              type="email"
              placeholder={t("email_placeholder")}
              className="bg-gray-bg border-none h-12 rounded-xl focus-visible:ring-brand-primary/20"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-black px-1">
              {t("phone")}
            </label>
            <Input
              placeholder={t("phone_placeholder")}
              className="bg-gray-bg border-none h-12 rounded-xl focus-visible:ring-brand-primary/20 text-left"
              dir="ltr"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-black px-1">
              {t("specialization")}
            </label>
            <Input
              placeholder={t("specialization_placeholder")}
              className="bg-gray-bg border-none h-12 rounded-xl focus-visible:ring-brand-primary/20"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-black px-1">
              {t("country")}
            </label>
            <Input
              placeholder={t("country_placeholder")}
              className="bg-gray-bg border-none h-12 rounded-xl focus-visible:ring-brand-primary/20"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-black px-1">
              {t("profile_picture")}
            </label>
            <div className="relative">
              <CloudUpload className="size-5 text-brand-primary absolute top-1/2 left-4 -translate-y-1/2 pointer-events-none rtl:left-auto rtl:right-4" />
              <label className={cn(
                "flex items-center justify-start cursor-pointer transition-all hover:bg-white hover:border-brand-primary/20",
                "bg-gray-bg text-brand-muted text-xs font-medium h-12 rounded-xl border border-transparent",
                isRtl ? "pr-11" : "pl-11"
              )}>
                <span className="text-brand-muted">
                  {t("profile_picture_hint")}</span>
                <input type="file" className="hidden" accept="image/*" />
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-black px-1">
            {t("portfolio_link")}
          </label>
          <div className="relative">
            <Input
              placeholder={t("portfolio_placeholder")}
              className="bg-gray-bg border-none h-12 rounded-xl focus-visible:ring-brand-primary/20"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-black px-1">{t("about_me")}</label>
          <textarea
            placeholder={t("about_me_placeholder")}
            className="w-full bg-gray-bg border-none rounded-xl p-4 min-h-[100px] text-sm focus:ring-2 focus:ring-brand-primary/20 outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-black px-1">
            {t("password")}
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder={t("password_placeholder")}
              className={`bg-gray-bg border-none h-12 rounded-xl 
                  ${isRtl ? "pr-10" : "pl-10"}
                focus-visible:ring-brand-primary/20`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 text-brand-muted cursor-pointer hover:text-brand-primary transition-colors",
                isRtl ? "right-4" : "left-4"
              )}
            >
              {showPassword ? (
                <EyeIcon className="size-5" />
              ) : (
                <EyeOff className="size-5" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-start gap-3 py-2">
          <input type="checkbox" id="terms" className="mt-1 accent-brand-primary size-4 cursor-pointer" />
          <label htmlFor="terms" className="text-xs text-brand-muted leading-relaxed cursor-pointer">
            {t("terms_text")}
          </label>
        </div>

        <Button className="w-full bg-brand-base hover:bg-brand-base/90 text-white h-14 rounded-2xl text-lg font-bold shadow-lg shadow-brand-primary/20 transition-all active:scale-95">
          {t("become_a_trainer")}
        </Button>
      </form>
    </div>
  );
}
