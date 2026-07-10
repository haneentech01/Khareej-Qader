"use client";

import React, { useRef } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Camera, CloudUpload, Check, AlertCircle } from "lucide-react";
import { ProfileAvatar } from "./ProfileAvatar";

interface AvatarUploaderProps {
    name?: string | null;
    currentImage?: string | null;
    uploadedImageUrl?: string | null;
    isUploading: boolean;
    error: string | null;
    success: string | null;
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onAvatarClick?: () => void;
}

//  AvatarUploader — مكوّن reusable لرفع صورة البروفايل.

export function AvatarUploader({
    name,
    currentImage,
    uploadedImageUrl,
    isUploading,
    error,
    success,
    onImageChange,
    onAvatarClick,
}: AvatarUploaderProps) {
    const t = useTranslations("Dashboard.ProfilePage");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const displayImage = uploadedImageUrl ?? currentImage ?? null;

    const handleClick = () => {
        if (isUploading) return;
        fileInputRef.current?.click();
        onAvatarClick?.();
    };

    return (
        <div className="space-y-2">
            <label className="text-sm md:text-base font-semibold text-brand-muted block">
                {t("avatar")}
            </label>

            <div className="flex items-center gap-4">
                {/* ─── Avatar (clickable) ────────────────────────────────────────── */}
                <div className="relative group shrink-0">
                    <button
                        type="button"
                        onClick={handleClick}
                        disabled={isUploading}
                        aria-label={t("image_change_hint")}
                        className={cn(
                            "relative block rounded-full transition-transform size-16",
                            "hover:scale-105 disabled:cursor-not-allowed disabled:hover:scale-100",
                        )}
                    >
                        {isUploading ? (
                            <div className="size-full rounded-full overflow-hidden relative bg-slate-200">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/60 to-transparent" />
                            </div>
                        ) : (
                            <>
                                <ProfileAvatar
                                    src={displayImage}
                                    name={name}
                                    size="lg"
                                    className="rounded-full"
                                />
                                <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                    <Camera className="size-6 text-white" />
                                </div>
                            </>
                        )}
                    </button>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        onChange={onImageChange}
                        className="hidden"
                        disabled={isUploading}
                    />
                </div>

                {/* ─── Upload hint button ────────────────────────────────────────── */}
                <div className="relative flex-1">
                    <CloudUpload
                        className={cn(
                            "size-6 absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none transition-colors",
                            isUploading ? "text-slate-300" : "text-brand-primary",
                        )}
                    />
                    <button
                        type="button"
                        onClick={handleClick}
                        disabled={isUploading}
                        className={cn(
                            "flex items-center justify-start cursor-pointer font-medium h-12 rounded-[10px] border pr-11 w-full",
                            "hover:bg-slate-50 transition-colors disabled:cursor-not-allowed disabled:opacity-60",
                        )}
                    >
                        <span
                            className={cn(
                                "text-sm md:text-base transition-colors",
                                isUploading ? "text-slate-400" : "text-brand-muted-text",
                            )}
                        >
                            {isUploading ? t("image_uploading") : t("avatar_hint")}
                        </span>
                    </button>
                </div>
            </div>

            {/* ─── Messages ────────────────────────────────────────────────────── */}
            {success && !error && (
                <div className="flex items-center gap-2 text-brand-base text-xs font-semibold animate-in fade-in duration-300">
                    <Check className="size-3.5 shrink-0" />
                    {t("image_upload_success")}
                </div>
            )}
            {error && (
                <div className="flex items-center gap-2 text-red-600 text-xs font-semibold animate-in fade-in duration-300">
                    <AlertCircle className="size-3.5 shrink-0" />
                    {error}
                </div>
            )}
        </div>
    );
}
