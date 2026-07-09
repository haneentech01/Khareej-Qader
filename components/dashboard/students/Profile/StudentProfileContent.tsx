"use client";

import { useTranslations } from "next-intl";

import { AccountInfoSection } from "./AccountInfoSection";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { EducationalInfoSection } from "./EducationalInfoSection";
import { useStudentProfileForm } from "@/hooks/dashboard/useStudentProfileForm";
import { ProfilePageLayout, ProfileSkeleton } from "../../profile";
import { ProfileFormFooter } from "../../profile/ProfileFormFooter";


export function StudentProfileContent() {
    const t = useTranslations("Dashboard.ProfilePage");
    const form = useStudentProfileForm();

    // ─── Loading ──────────────────────────────────────────────────────────────
    if (form.loading) return <ProfileSkeleton />;

    // ─── Error ────────────────────────────────────────────────────────────────
    if (form.error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <p className="text-red-500 font-semibold text-center max-w-md">
                    {form.error}
                </p>
                <button
                    onClick={form.handleRetry}
                    className="text-brand-primary font-bold hover:underline cursor-pointer"
                >
                    {t("retry", { defaultValue: "إعادة المحاولة" })}
                </button>
            </div>
        );
    }

    return (
        <ProfilePageLayout>
            <form onSubmit={form.handleSave} className="space-y-8">
                <AccountInfoSection
                    student={form.student}
                    imageUrl={form.imageUrl}
                    isUploadingImage={form.isUploadingImage}
                    imageError={form.imageError}
                    imageSuccess={form.imageSuccess}
                    onImageChange={form.handleImageUpload}
                />

                <PersonalInfoSection
                    formData={form.formData}
                    disabled={form.isSaving}
                    onChange={form.handleFieldChange}
                />

                <EducationalInfoSection
                    formData={form.formData}
                    disabled={form.isSaving}
                    onChange={form.handleFieldChange}
                />

                <ProfileFormFooter
                    isSaving={form.isSaving}
                    hasChanges={form.hasChanges}
                    saveError={form.saveError}
                    saveSuccess={form.saveSuccess}
                />
            </form>
        </ProfilePageLayout>
    );
}
