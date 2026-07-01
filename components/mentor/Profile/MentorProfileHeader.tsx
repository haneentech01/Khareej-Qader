"use client";

import React from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { ChevronLeft, ChevronRight, Mail, Phone, MapPin, GraduationCap } from "lucide-react";
import { MentorProfile } from "@/types";

interface MentorProfileHeaderProps {
  mentor: MentorProfile | null;
  loading?: boolean;
}

export function MentorProfileHeader({ mentor, loading }: MentorProfileHeaderProps) {
  const t = useTranslations("MentorProfilePage");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const Chevron = isRtl ? ChevronLeft : ChevronRight;

  return (
    <div className="space-y-5">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs md:text-sm font-semibold text-slate-400">
        <Link href="/mentor" className="hover:text-brand-primary transition-colors">
          {t("breadcrumbs.home")}
        </Link>
        <Chevron className="size-3.5 shrink-0 text-slate-300" />
        <span className="text-slate-700 font-bold">{t("breadcrumbs.profile")}</span>
      </nav>

      {/* Profile Hero Card */}
      <div className="relative bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
        {/* Gradient Banner */}
        <div
          className="h-32 w-full"
          style={{
            background: "linear-gradient(135deg, #22b48d 0%, #006857 50%, #005096 100%)",
          }}
        >
          {/* subtle pattern overlay */}
          <div
            className="absolute inset-0 h-32 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Content below banner */}
        <div className="px-6 pb-6">
          {/* Avatar + name row */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-12 mb-5">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="relative size-24 rounded-2xl overflow-hidden border-4 border-white shadow-xl ring-2 ring-slate-100">
                {loading ? (
                  <div className="size-full bg-slate-200 animate-pulse" />
                ) : (
                  <Image
                    src={mentor?.avatar || "/images/default-avatar.svg"}
                    alt={mentor?.name || ""}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              {/* Online indicator */}
              <span className="absolute bottom-1 end-1 size-3.5 bg-emerald-500 rounded-full border-2 border-white" />
            </div>

            {/* Name + role */}
            <div className="flex-1 text-center sm:text-start sm:pb-1">
              {loading ? (
                <div className="space-y-2">
                  <div className="h-7 w-40 bg-slate-200 animate-pulse rounded-lg mx-auto sm:mx-0" />
                  <div className="h-4 w-24 bg-slate-100 animate-pulse rounded-lg mx-auto sm:mx-0" />
                </div>
              ) : (
                <>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-black tracking-tight">
                    {mentor?.name || "—"}
                  </h1>
                  <p className="text-brand-muted font-semibold text-sm mt-0.5">
                    {mentor?.role || t("default_role")}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Info pills row */}
          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
            {mentor?.email && (
              <InfoPill icon={Mail} text={mentor.email} />
            )}
            {mentor?.major && (
              <InfoPill icon={GraduationCap} text={mentor.major} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-component ─────────────────────────────────────────────────────────────
function InfoPill({
  icon: Icon,
  text,
}: {
  icon: React.FC<{ className?: string }>;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2">
      <Icon className="size-3.5 text-brand-primary shrink-0" />
      <span className="text-slate-600 text-xs font-semibold">{text}</span>
    </div>
  );
}
