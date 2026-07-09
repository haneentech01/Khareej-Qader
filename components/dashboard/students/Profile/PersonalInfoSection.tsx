"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { User } from "lucide-react";
import { ProfileFieldSection, ProfileInputGroup } from "@/components/dashboard/profile";
import { Select } from "@/components/ui/select";
import type { StudentFormData } from "@/hooks/dashboard/useStudentProfileForm";
import { ProfileTextInput } from "@/components/dashboard/profile/ProfileTextInput";

interface PersonalInfoSectionProps {
    formData: StudentFormData;
    disabled: boolean;
    onChange: (field: keyof StudentFormData, value: string) => void;
}

/**Section 2: full_name + email + phone + gender */
export function PersonalInfoSection({
    formData,
    disabled,
    onChange,
}: PersonalInfoSectionProps) {
    const t = useTranslations("Dashboard.ProfilePage");

    return (
        <ProfileFieldSection title={t("personal_info")} icon={User}>
            <ProfileInputGroup label={t("full_name")}>
                <ProfileTextInput
                    type="text"
                    value={formData.name}
                    disabled={disabled}
                    field="name"
                    onValueChange={onChange}
                />
            </ProfileInputGroup>

            <ProfileInputGroup label={t("email")}>
                <ProfileTextInput
                    type="email"
                    value={formData.email}
                    disabled={disabled}
                    field="email"
                    onValueChange={onChange}
                />
            </ProfileInputGroup>

            <ProfileInputGroup label={t("phone")}>
                <ProfileTextInput
                    type="tel"
                    value={formData.mobile_number}
                    field="mobile_number"
                    onValueChange={onChange}
                />
            </ProfileInputGroup>

            <ProfileInputGroup label={t("gender")}>
                <Select
                    value={formData.gender}
                    disabled={disabled}
                    onChange={(e) => onChange("gender", e.target.value)}
                    className="h-12 rounded-xl border-brand-outline focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                >
                    <option value="male">{t("male")}</option>
                    <option value="female">{t("female")}</option>
                </Select>
            </ProfileInputGroup>
        </ProfileFieldSection>
    );
}
