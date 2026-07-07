"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { User, GraduationCap, Lock, UserCog, CloudUpload, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { ProfilePageLayout, ProfileAvatar, ProfileFieldSection, ProfileInputGroup } from "@/components/dashboard/profile";
import { useStudentProfile } from "@/hooks/dashboard/useStudentProfile";

export function StudentProfileContent() {
    const t = useTranslations("Dashboard.ProfilePage");
    const tc = useTranslations("Dashboard");
    const { student, course, loading, error, refetch } = useStudentProfile();

    return (
        //  Shared layout for profile pages.
        <ProfilePageLayout
            loading={loading}
            error={error}
            onRetry={refetch}
            retryLabel={tc("retry")}
        >
            {/* ─── Account Info Section ─────────────────────────────── */}
            <ProfileFieldSection title={t("account_info")} icon={UserCog}>
                {/* Username */}
                <ProfileInputGroup label={t("username")}>
                    <div className="relative">
                        <Input
                            type="text"
                            defaultValue={student?.slug ?? ""}
                            disabled
                            className="pr-10 pl-10 font-medium h-12 rounded-[10px] bg-slate-50 border-slate-100"
                        />
                        <Lock className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-brand-muted" />
                    </div>
                </ProfileInputGroup>

                {/* Avatar — current photo + upload button */}
                <ProfileInputGroup label={t("avatar")}>
                    <div className="flex items-center gap-4">
                        <ProfileAvatar
                            src={student?.profile_photo ?? null}
                            name={student?.name ?? null}
                            size="lg"
                        />
                        <div className="relative flex-1">
                            <CloudUpload className="size-6 text-brand-primary absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none" />
                            <label
                                className={cn(
                                    "flex items-center justify-start cursor-pointer font-medium h-12 rounded-[10px] border pr-11",
                                )}
                            >
                                <span className="text-brand-muted-text text-sm md:text-base">
                                    {t("avatar_hint")}
                                </span>
                                <input type="file" className="hidden" accept="image/*" />
                            </label>
                        </div>
                    </div>
                </ProfileInputGroup>
            </ProfileFieldSection>

            {/* ─── Personal Info Section ────────────────────────────── */}
            <ProfileFieldSection title={t("personal_info")} icon={User}>
                {/* Full Name */}
                <ProfileInputGroup label={t("full_name")}>
                    <Input
                        defaultValue={student?.name ?? ""}
                        className="h-12 rounded-xl 
                        focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                    />
                </ProfileInputGroup>

                {/* Email */}
                <ProfileInputGroup label={t("email")}>
                    <Input
                        defaultValue={student?.email ?? ""}
                        className=" h-12 rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                    />
                </ProfileInputGroup>

                {/* Phone Number */}
                <ProfileInputGroup label={t("phone")}>
                    <Input
                        defaultValue={student?.mobile_number ?? ""}
                        className=" h-12 rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                    />
                </ProfileInputGroup>

                {/* Gender */}
                <ProfileInputGroup label={t("gender")}>
                    <Select defaultValue={student?.gender ?? "male"}
                        className=" h-12 rounded-xl 
                        focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none">
                        <option value="male">{t("male")}</option>
                        <option value="female">{t("female")}</option>
                    </Select>
                </ProfileInputGroup>
            </ProfileFieldSection>

            {/* ─── Educational Info Section ─────────────────────────── */}
            <ProfileFieldSection title={t("edu_info")} icon={GraduationCap}>
                {/* University */}
                <ProfileInputGroup label={t("university")}>
                    <Input
                        defaultValue={student?.university_name ?? ""}
                        placeholder={t("university")}
                        className=" h-12 rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                    />
                </ProfileInputGroup>

                {/* Major */}
                <ProfileInputGroup label={t("major")}>
                    <Input
                        defaultValue={student?.university_major ?? ""}
                        placeholder={t("major")}
                        className=" h-12 rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                    />
                </ProfileInputGroup>

                {/* Training Path */}
                <div className="md:col-span-2">
                    <ProfileInputGroup label={t("training_path")}>
                        <div className="relative">
                            <Input
                                defaultValue={course?.name ?? ""}
                                disabled
                                className="bg-slate-50 text-black h-12 rounded-xl pr-10 pl-10"
                            />
                            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-brand-muted" />
                        </div>
                    </ProfileInputGroup>
                </div>
            </ProfileFieldSection>

            {/* ─── Footer Actions ───────────────────────────────────── */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
                <div className="bg-brand-outline/10 px-8 py-3 rounded-full flex items-center gap-2 text-brand-muted text-sm">
                    <Info className="size-4 text-brand-primary" />
                    {t("locked_info_hint")}
                </div>

                <Button
                    className="bg-brand-primary hover:bg-brand-hover/90 
                    cursor-pointer text-white h-14 px-12 rounded-[10px] 
                    font-bold text-lg"
                >
                    {t("save_btn")}
                </Button>
            </div>
        </ProfilePageLayout>
    );
}
