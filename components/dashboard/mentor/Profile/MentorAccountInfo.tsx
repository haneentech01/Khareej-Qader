"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Lock, UserCog } from "lucide-react";
import type { MentorDashboard } from "@/types";
import { AvatarUploader, ProfileFieldSection, ProfileInputGroup } from "@/components/dashboard/profile";
import { ProfileTextInput } from "@/components/dashboard/profile/ProfileTextInput";

interface AccountInfoSectionProps {
    mentor: MentorDashboard | null;
    imageUrl?: string | null;
    isUploadingImage: boolean;
    imageError: string | null;
    imageSuccess: string | null;
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function MentorAccountInfo({
    mentor,
    imageUrl,
    isUploadingImage,
    imageError,
    imageSuccess,
    onImageChange,
}: AccountInfoSectionProps) {
    const t = useTranslations("Dashboard.ProfilePage");
    const locale = useLocale();
    const isRtl = locale === "ar";

    return (
        <ProfileFieldSection title={t("account_info")} icon={UserCog}>
            <ProfileInputGroup label={t("username")}>
                <div className="relative">
                    <ProfileTextInput
                        type="text"
                        defaultValue={mentor?.username ?? ""}
                        disabled
                        icon={<Lock className="size-4 text-brand-muted" />}
                        className={isRtl ? "pr-8" : "pl-8"}
                    />
                </div>
            </ProfileInputGroup>

            <AvatarUploader
                name={mentor?.name ?? null}
                currentImage={mentor?.profile_image ?? null}
                uploadedImageUrl={imageUrl}
                isUploading={isUploadingImage}
                error={imageError}
                success={imageSuccess}
                onImageChange={onImageChange}
            />
        </ProfileFieldSection>
    );
}
