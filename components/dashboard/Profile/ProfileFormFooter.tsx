"use client";

import { useTranslations } from "next-intl";
import { Info, Loader2, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfileFormFooterProps {
    isSaving: boolean;
    hasChanges: boolean;
    saveError: string | null;
    saveSuccess: string | null;
    imageError?: string | null;
}

// form (info pill + save button).
export function ProfileFormFooter({
    isSaving,
    hasChanges,
    saveError,
    saveSuccess,
    imageError,
}: ProfileFormFooterProps) {
    const t = useTranslations("Dashboard.ProfilePage");

    return (
        <div className="space-y-4">
            {/* ─── Success / Error messages ─────────────────────────────────────── */}
            {saveSuccess && !saveError && (
                <div
                    role="status"
                    className="bg-brand-light text-brand-base text-sm font-bold px-4 py-3 rounded-xl border border-[#A7F3D0]/60 flex items-center gap-2 animate-in fade-in duration-300"
                >
                    <Check className="size-4 shrink-0" />
                    {t("update_success")}
                </div>
            )}

            {saveError && (
                <div
                    role="alert"
                    className="bg-red-50 text-red-700 text-sm font-bold px-4 py-3 rounded-xl border border-red-200 flex items-center gap-2 animate-in fade-in duration-300"
                >
                    <AlertCircle className="size-4 shrink-0" />
                    {saveError}
                </div>
            )}

            {imageError && !saveError && !saveSuccess && (
                <div
                    role="alert"
                    className="bg-red-50 text-red-700 text-sm font-bold px-4 py-3 rounded-xl border border-red-200 flex items-center gap-2 animate-in fade-in duration-300"
                >
                    <AlertCircle className="size-4 shrink-0" />
                    {imageError}
                </div>
            )}

            {/* ─── Footer row: hint + save button ───────────────────────────────── */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
                <div className="bg-[#BCCAC31A] px-8 py-3 rounded-full flex items-center gap-2 text-brand-muted text-sm">
                    <Info className="size-4 text-brand-primary" />
                    {t("locked_info_hint")}
                </div>

                <Button
                    type="submit"
                    disabled={isSaving || !hasChanges}
                    className="bg-brand-primary hover:bg-brand-hover/90 cursor-pointer text-white h-14 px-12 rounded-[10px] font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {isSaving ? (
                        <>
                            <Loader2 className="size-5 animate-spin" />
                            {t("saving_btn")}
                        </>
                    ) : (
                        t("save_btn")
                    )}
                </Button>
            </div>
        </div>
    );
}
