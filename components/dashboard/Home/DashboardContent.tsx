"use client";

import { useTranslations } from "next-intl";
import { ProgressHero } from "@/components/dashboard/Home/ProgressHero";
import { MentorCard } from "@/components/dashboard/Home/MentorCard";
import { TaskCard } from "@/components/dashboard/Home/TaskCard";
import { Announcements } from "@/components/dashboard/Home/Announcements";
import { CertificateCard } from "@/components/dashboard/Home/CertificateCard";
import { useDashboard } from "@/hooks/dashboard/useDashboard";
import { Loader2 } from "lucide-react";

export function DashboardContent() {
    const t = useTranslations("Dashboard");
    const { dashboard, loading, error } = useDashboard();

    // ─── تحميل ──────────────────────────────
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-10 h-10 animate-spin text-brand-primary" />
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
    if (!dashboard) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <p className="text-brand-muted text-lg">
                    لا توجد بيانات
                </p>
            </div>
        );
    }

    const { student, course, progress, current_lesson, next_task, mentor, certificate, announcements } = dashboard;

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* 1. Top Section: Progress Hero */}
            <div>
                <ProgressHero
                    userName={student?.name || ""}
                    trackName={course?.name || t("hero.track_name")}
                    currentLesson={current_lesson?.title || undefined}
                    progressValue={progress?.percentage || 0}
                    totalLessons={progress?.total_lessons || 0}
                    completedLessons={progress?.completed_lessons || 0}
                />
            </div>

            {/* 2. Middle Section: Mentor & Task */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* المهمة القادمة — تظهر بس لو فيه مهمة */}
                {next_task ? (
                    <TaskCard
                        title={next_task.title}
                        context={next_task.lesson_name}
                        deadline={next_task.deadline}
                    />
                ) : (
                    <TaskCard
                        title={t("tasks.title")}
                        context={t("tasks.lesson_name")}
                        deadline={"—"}
                    />
                )}

                {/* المدرب — تظهر بس لو فيه مدرب */}
                {mentor ? (
                    <MentorCard
                        name={mentor.name}
                        role={mentor.role}
                        bio={mentor.bio}
                        avatarUrl={mentor.avatar}
                    />
                ) : (
                    <div className="bg-white rounded-[30px] p-8 border border-slate-100
            shadow-sm flex items-center justify-center h-full">
                        <p className="text-brand-muted">
                            {t("mentor.title")}
                        </p>
                    </div>
                )}
            </div>

            {/* 3. Bottom Section: Announcements & Certificate */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                {/* الشهادة — تظهر بس لو فيه شهادة */}
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
        </div>
    );
}
