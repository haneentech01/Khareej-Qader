"use client";

import { useLocale, useTranslations } from "next-intl";
import { GraduationCap, Lock } from "lucide-react";
import type { StudentFormData } from "@/hooks/dashboard/useStudentProfileForm";
import { ProfileTextInput } from "@/components/dashboard/profile/ProfileTextInput";
import { ProfileFieldSection, ProfileInputGroup } from "@/components/dashboard/profile";

interface EducationalInfoSectionProps {
    formData: StudentFormData;
    disabled: boolean;
    onChange: (field: keyof StudentFormData, value: string) => void;
}

/** القسم الثالث: university + major + training_path (locked) */
export function EducationalInfoSection({
    formData,
    disabled,
    onChange,
}: EducationalInfoSectionProps) {
    const t = useTranslations("Dashboard.ProfilePage");
    const locale = useLocale();
    const isRtl = locale === "ar";

    return (
        <ProfileFieldSection title={t("edu_info")} icon={GraduationCap}>
            <ProfileInputGroup label={t("university")}>
                <ProfileTextInput
                    type="text"
                    value={formData.university_name}
                    onChange={(e) => onChange("university_name", e.target.value)}
                    disabled={disabled}
                    placeholder={t("university")}
                />
            </ProfileInputGroup>

            <ProfileInputGroup label={t("major")}>
                <ProfileTextInput
                    type="text"
                    value={formData.university_major}
                    onChange={(e) => onChange("university_major", e.target.value)}
                    disabled={disabled}
                    placeholder={t("major")}
                />
            </ProfileInputGroup>

            <div className="md:col-span-2">
                <ProfileInputGroup label={t("training_path")}>
                    <div className="relative">
                        <ProfileTextInput
                            value={formData.course}
                            disabled
                            icon={<Lock className="size-4 text-brand-muted" />}
                            className={` ${isRtl ? "pr-8" : "pl-8"}`}
                        />
                    </div>
                </ProfileInputGroup>
            </div>
        </ProfileFieldSection>
    );
}
