"use client";

import { useTranslations } from "next-intl";
import { User } from "lucide-react";
import type { MentorFormData } from "@/types";
import { ProfileFieldSection, ProfileInputGroup, ProfileTextInput } from "../../profile";


interface MentorProfileInfoProps {
  formData: MentorFormData;
  disabled: boolean;
  onChange: (field: keyof MentorFormData, value: string) => void;
}

/** Section 2: Full Name + Email + Country + Phone Number */
export function MentorProfileInfo({
  formData,
  disabled,
  onChange,
}: MentorProfileInfoProps) {
  const t = useTranslations("MentorProfilePage.info");

  return (
    <ProfileFieldSection title={t("title")} icon={User}>
      <ProfileInputGroup label={t("full_name")}>
        <ProfileTextInput
          type="text"
          value={formData.name}
          disabled={disabled}
          field="name"
          onValueChange={(field, value) => onChange(field as keyof MentorFormData, value)}
        />
      </ProfileInputGroup>

      <ProfileInputGroup label={t("email")}>
        <ProfileTextInput
          type="text"
          value={formData.email}
          disabled={disabled}
          field="email"
          onValueChange={(field, value) => onChange(field as keyof MentorFormData, value)}
        />
      </ProfileInputGroup>

      <ProfileInputGroup label={t("mobile_number")}>
        <ProfileTextInput
          type="text"
          value={formData.mobile_number}
          disabled={disabled}
          field="mobile_number"
          onValueChange={(field, value) => onChange(field as keyof MentorFormData, value)}
        />
      </ProfileInputGroup>

      <ProfileInputGroup label={t("country")}>
        <ProfileTextInput
          type="text"
          value={formData.state}
          disabled={disabled}
          field="country"
          onValueChange={(field, value) => onChange(field as keyof MentorFormData, value)}
        />
      </ProfileInputGroup>
    </ProfileFieldSection>
  );
}
