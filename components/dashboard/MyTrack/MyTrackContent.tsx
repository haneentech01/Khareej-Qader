"use client";

import { useStudentPath } from "@/hooks/dashboard/useStudentPath";
import { useTranslations } from "next-intl";
import { ProgressHero } from "@/components/dashboard/Home/ProgressHero";
import { LessonTimeline } from "@/components/dashboard/MyTrack/LessonTimeline";

/**
 * helper: حوّل الثواني لـ string مقروء
 * مثال: 598 → "9:58"
 */
function formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function MyTrackContent() {
    const t = useTranslations("Dashboard");
    const { data, loading, error } = useStudentPath();

    // ─── Loading state ──────────────────────
    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin size-10 border-4 border-brand-primary border-t-transparent rounded-full" />
            </div>
        );
    }

    // ─── Error state ────────────────────────
    if (error) {
        return (
            <div className="text-center py-20">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        );
    }

    // ─── No data ────────────────────────────
    if (!data) {
        return (
            <div className="text-center py-20">
                <p className="text-brand-muted text-lg">
                    لا توجد بيانات للمسار حالياً
                </p>
            </div>
        );
    }

    // ─── Map API data to component props ────
    const { path, progress, current_video, videos } = data;

    return (
        <>
            <ProgressHero
                variant="standalone"
                trackName={path.name}
                progressValue={progress.percentage}
                totalLessons={progress.total}
                completedLessons={progress.completed}
            />

            <div className="mt-5 md:mt-10">
                <LessonTimeline
                    videos={videos}
                    currentVideoId={current_video.id}
                />
            </div>
        </>
    );
}