"use client";

import { useTranslations } from "next-intl";
import { ProgressHero } from "@/components/dashboard/Home/ProgressHero";
import { MentorCard } from "@/components/dashboard/Home/MentorCard";
import { TaskCard } from "@/components/dashboard/Home/TaskCard";
import { useDashboard } from "@/hooks/dashboard/useDashboard";
import { DashboardSkeleton } from "./DashboardSkeleton";
import { WelcomeHeader } from "@/components/layout/WelcomeHeader";


export function DashboardContent() {
    const t = useTranslations("Dashboard");
    const { dashboard, loading, error, refetch } = useDashboard();

    // ─── Loading: Skeleton يطابق شكل الصفحة ──────
    if (loading) {
        return <DashboardSkeleton />;
    }

    // ─── Error ──────────────────────────────────
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <p className="text-red-500 text-lg">{error}</p>
                <button
                    onClick={() => refetch()}
                    className="text-brand-primary font-bold hover:underline"
                >
                    {t("retry", { defaultValue: "إعادة المحاولة" })}
                </button>
            </div>
        );
    }

    // ─── No Data ───────────────────────────────
    if (!dashboard) return null;

    const { student, course, progress, current_lesson, next_task, mentor } = dashboard;

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* ─── Wellcome User Name ─────────────────── */}
            <WelcomeHeader
                userName={student?.name || ""}
                subtitleMessage={t("WelcomeHeader.subtitle")}
            />

            {/* ─── Progress Hero ─────────────────── */}
            <ProgressHero
                trackName={course?.name || t("hero.track_name")}
                currentLesson={current_lesson?.title || undefined}
                currentLessonId={current_lesson?.id || undefined}
                progressValue={progress?.percentage || 0}
                totalLessons={progress?.total_lessons || 0}
                completedLessons={progress?.completed_lessons || 0}
            />

            {/* ─── Task & Mentor ─────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {next_task ? (
                    <TaskCard
                        title={next_task.title}
                        context={next_task.lesson_name}
                        deadline={next_task.deadline}
                        description={next_task.description}
                        videoName={next_task.video_name}
                    />
                ) : (
                    <TaskCard
                        title={t("tasks.title")}
                        context={t("tasks.lesson_name")}
                        deadline="—"
                        description={t("tasks.description")}
                        videoName={t("tasks.lesson_name")}
                    />
                )}

                {mentor ? (
                    <MentorCard
                        name={mentor.name}
                        role={mentor.role}
                        info={mentor.info}
                        mobile={mentor.mobile}
                        avatarUrl={mentor.avatar}
                    />
                ) : (
                    <div className="bg-white rounded-[30px] p-8 border border-slate-100 shadow-sm flex items-center justify-center h-full">
                        <p className="text-brand-muted">{t("mentor.title")}</p>
                    </div>
                )}
            </div>

            {/* 3. Bottom Section: Announcements & Certificate */}
            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                {/* الشهادة — تظهر بس لو فيه شهادة 
                {certificate ? (
                    <CertificateCard
                        progressValue={certificate.progress_percentage}
                        completedSteps={certificate.completed_steps}
                        totalSteps={certificate.total_steps}
                    />
                ) : (
                    <CertificateCard
                        progressValue={progress?.percentage || 0}
                        completedSteps={progress?.completed_lessons || 0}
                        totalSteps={progress?.total_lessons || 0}
                    />
                )}

                <Announcements announcements={announcements} />
            </div> 
            */}
        </div>
    );
}
