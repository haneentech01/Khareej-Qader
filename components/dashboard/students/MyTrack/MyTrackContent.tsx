"use client";

import { useTranslations } from "next-intl";
import { useStudentPath } from "@/hooks/dashboard/useStudentPath";
import { LessonTimeline } from "@/components/dashboard/students/MyTrack/LessonTimeline";
import { MyTrackSkeleton } from "./MyTrackSkeleton";
import { ProgressHero } from "../Home/ProgressHero";

export function MyTrackContent() {
    const t = useTranslations("Dashboard.MyTrack");
    const { data, loading, error, refetch } = useStudentPath();

    if (loading) {
        return <MyTrackSkeleton />;
    }

    // ─── Error ──────────────────────────────────
    if (error) {
        return (
            <div className="text-center py-20 space-y-4">
                <p className="text-red-500 text-lg">{error}</p>
                <button
                    onClick={() => refetch()}
                    className="text-brand-primary font-bold hover:underline"
                >
                    {t("retry")}
                </button>
            </div>
        );
    }

    // ─── No Data ───────────────────────────────
    if (!data) return null;

    // ─── Render ────────────────────────────────
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