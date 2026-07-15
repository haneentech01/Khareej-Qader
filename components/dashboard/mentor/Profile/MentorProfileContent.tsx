"use client";

import { useTranslations } from "next-intl";
import { ProfileFormFooter, ProfilePageLayout, ProfileSkeleton } from "../../profile";
import { MentorAccountInfo } from "./MentorAccountInfo";
import { MentorLocationInfo } from "./MentorLocationInfo";
import { MentorProfileInfo } from "./MentorProfileInfo";
import { useMentorProfileForm } from "@/hooks/mentor/profile/useMentorProfileForm";


export function MentorProfileContent() {
  const t = useTranslations("Dashboard.ProfilePage");
  const form = useMentorProfileForm();

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
          {t("retry")}
        </button>
      </div>
    );
  }


  return (
    <ProfilePageLayout>
      <form onSubmit={form.handleSave} className="space-y-8">
        {/* ─── Account Info Section ───────────────────────────────────────── */}
        <MentorAccountInfo
          mentor={form.mentor}
          imageUrl={form.imageUrl}
          isUploadingImage={form.isUploadingImage}
          imageError={form.imageError}
          imageSuccess={form.imageSuccess}
          onImageChange={form.handleImageUpload}
        />

        {/* ─── Personal Info Section ──────────────────────────────────────── */}
        <MentorProfileInfo
          formData={form.formData}
          disabled={form.isSaving}
          onChange={form.handleFieldChange}
        />

        {/* ─── Location Info Section ──────────────────────────────────────── */}
        <MentorLocationInfo
          formData={form.formData}
          disabled={form.isSaving}
          onChange={form.handleFieldChange}
        />

        {/* ─── Footer (save button + messages) ────────────────────────────── */}
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
