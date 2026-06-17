"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ChevronLeft } from "lucide-react";

interface RegisterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RegisterModal({ open, onOpenChange }: RegisterModalProps) {
  const t = useTranslations("RegisterModal");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-white rounded-3xl p-7 sm:p-10 max-w-[480px] w-full border-none shadow-2xl text-center"
        showCloseButton={true}
      >
        {/* Top Icon */}
        <div className="flex justify-center mb-1">
          <div className="w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center">
            <Image
              src="/images/icons/signupMentorLogo.png"
              alt="register"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
        </div>

        {/* Header */}
        <DialogHeader className="text-center gap-1.5">
          <DialogTitle className="text-2xl font-bold text-brand-dark-text text-center">
            {t("title")}
          </DialogTitle>
          <DialogDescription className="text-brand-muted text-sm text-center">
            {t("subtitle")}
          </DialogDescription>
        </DialogHeader>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-4 mt-2">
          {/* Student Card */}
          <div className="flex flex-col items-center gap-4 
          bg-sidebar-border border border-brand-surface rounded-3xl
           p-5 group hover:border-brand-primary hover:shadow-md 
           transition-all duration-200">
            <div className="w-full flex justify-center">
              <Image
                src="/images/registerAsAStudent.png"
                alt={t("student_alt")}
                width={130}
                height={130}
                className="object-contain"
              />
            </div>
            <p className="text-brand-dark-text font-bold text-base md:text-xl leading-tight">
              {t("student_title")}
            </p>
            <p className="text-brand-muted text-xs leading-relaxed text-center">
              {t("student_desc")}
            </p>
            <Link
              href="/register"
              onClick={() => onOpenChange(false)}
              className="w-full"
            >
              <button
                className="w-full flex items-center justify-center gap-1.5
                bg-brand-primary hover:bg-brand-dark text-white
                text-sm md:text-base font-bold rounded-xl h-10
                transition-all duration-200 cursor-pointer"
              >
                {t("student_btn")}
                <ChevronLeft className="size-4 rtl:rotate-0 ltr:rotate-180" />
              </button>
            </Link>
          </div>

          {/* Mentor Card */}
          <div className="flex flex-col items-center gap-4 bg-sidebar-border 
          border border-blue-100 rounded-3xl p-5 group hover:border-brand-blue 
          hover:shadow-md transition-all duration-200">
            <div className="w-full flex justify-center">
              <Image
                src="/images/registerAsAMentor.png"
                alt={t("mentor_alt")}
                width={130}
                height={130}
                className="object-contain"
              />
            </div>
            <p className="text-brand-dark-text font-bold text-base md:text-xl leading-tight">
              {t("mentor_title")}
            </p>
            <p className="text-brand-muted text-xs leading-relaxed text-center">
              {t("mentor_desc")}
            </p>
            <Link
              href="/register-mentor"
              onClick={() => onOpenChange(false)}
              className="w-full"
            >
              <button
                className="w-full flex items-center justify-center gap-1.5
                bg-brand-blue hover:bg-brand-blue/90 text-white
                text-sm md:text-base font-bold rounded-xl h-10
                transition-all duration-200 cursor-pointer"
              >
                {t("mentor_btn")}
                <ChevronLeft className="size-4 rtl:rotate-0 ltr:rotate-180" />
              </button>
            </Link>
          </div>
        </div>

        {/* Login link */}
        <p className="text-sm text-brand-muted mt-3">
          {t("has_account")}{" "}
          <Link
            href="/login"
            onClick={() => onOpenChange(false)}
            className="text-brand-primary font-semibold hover:underline"
          >
            {t("login_link")}
          </Link>
        </p>
      </DialogContent>
    </Dialog>
  );
}
