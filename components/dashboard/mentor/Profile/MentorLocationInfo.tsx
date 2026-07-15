"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { LocationEdit, Lock } from "lucide-react";
import type { MentorFormData } from "@/types";
import { ProfileFieldSection, ProfileInputGroup, ProfileTextInput } from "../../profile";

interface MentorLocationInfoProps {
    formData: MentorFormData;
    disabled: boolean;
    onChange: (field: keyof MentorFormData, value: string) => void;
}

/** Section 3: Address + City + Training Path (locked) */
export function MentorLocationInfo({
    formData,
    disabled,
    onChange,
}: MentorLocationInfoProps) {
    const t = useTranslations("MentorProfilePage.location_info");

    return (
        <ProfileFieldSection title={t("title")} icon={LocationEdit}>
            <ProfileInputGroup label={t("address")}>
                <ProfileTextInput
                    type="text"
                    value={formData.address}
                    disabled={disabled}
                    field="address"
                    onValueChange={(field, value) => onChange(field as keyof MentorFormData, value)}
                    placeholder={t("address")}
                    className="border-brand-outline h-12 rounded-xl focus:ring-0 focus:outline-brand-base"
                />
            </ProfileInputGroup>

            <ProfileInputGroup label={t("city")}>
                <ProfileTextInput
                    type="text"
                    value={formData.city}
                    disabled={disabled}
                    field="city"
                    onValueChange={(field, value) => onChange(field as keyof MentorFormData, value)}
                    placeholder={t("city")}
                    className="border-brand-outline h-12 rounded-xl focus:ring-0 focus:outline-brand-base"
                />
            </ProfileInputGroup>

            <div className="md:col-span-2">
                <ProfileInputGroup label={t("training_path")}>
                    <div className="relative">
                        <ProfileTextInput
                            value={formData.course}
                            disabled
                            className="bg-[#F8FAFC] border-[#F1F5F9] text-black h-12 rounded-xl pr-10 pl-10"
                        />
                        <Lock className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-brand-muted" />
                    </div>
                </ProfileInputGroup>
            </div>
        </ProfileFieldSection>
    );
}