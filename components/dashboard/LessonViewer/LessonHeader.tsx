"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { PlayCircleIcon } from "lucide-react";
import { useStudentPath } from "@/hooks/dashboard/useStudentPath";

interface LessonHeaderProps {
    lessonId: string;
}

export function LessonHeader({ lessonId }: LessonHeaderProps) {
    const t = useTranslations("Dashboard.LessonViewer");
    const { data, loading, error } = useStudentPath();

    // ─── البحث عن الدرس الحالي ─────────────
    const currentVideo = data?.videos.find(
        (video) => String(video.id) === lessonId
    );

    // ─── حالة التحميل ─────────────────────
    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin size-10 border-4 border-brand-primary border-t-transparent rounded-full" />
            </div>
        );
    }

    // ─── خطأ ──────────────────────────────
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <p className="text-red-500 text-lg">
                    {error}
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="text-brand-primary font-bold hover:underline"
                >
                    إعادة المحاولة
                </button>
            </div>
        );
    }

    // ─── لا بيانات ──────────────────────────────
    if (!data || !currentVideo) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <p className="text-brand-muted text-lg">
                    لا توجد بيانات
                </p>
            </div>
        );
    }



    // ─── عرض البيانات الحقيقية ─────────────
    return (
        <div className="flex flex-col items-start gap-2.5">
            <h1 className="text-3xl md:text-4xl font-bold text-black">
                {data.path.name}
            </h1>
            <p className="flex items-center gap-2">
                <PlayCircleIcon className="w-5 h-5 text-brand-primary" />
                <span className="text-brand-muted">
                    {t("subtitle", { lessonName: currentVideo?.title })}
                </span>
            </p>
        </div>
    );
}