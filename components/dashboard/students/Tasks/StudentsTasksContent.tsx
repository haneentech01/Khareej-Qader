"use client";

import { useAllTasks } from "@/hooks/dashboard/useAllTasks";
import { useLocale, useTranslations } from "next-intl";
import { DashboardSkeleton } from "../Home/DashboardSkeleton";
import { Link } from "@/i18n/routing";

interface StudentsTasksContentProps {
    id: string;
}

export default function StudentsTasksContent({
    id,
}: StudentsTasksContentProps) {
    const { tasks, loading, error, refetch } = useAllTasks();
    const t = useTranslations("Dashboard");
    const locale = useLocale();
    const isRtl = locale === "ar";

    // ─── Loading ──────────────────────────────────
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
                    {t("retry")}
                </button>
            </div>
        );
    }

    // ─── No Data ───────────────────────────────
    if (!tasks) return null;

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString(isRtl ? "ar-EG" : "en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div className="container mx-auto max-w-5xl p-6">
            <div className="space-y-4">
                {tasks.map((task, index) => (
                    <div
                        key={index}
                        className="rounded-2xl border bg-card p-5 shadow-sm transition hover:shadow-md"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-semibold">{task.title}</h2>


                                <Link href={`/dashboard/my-track/lessons/${task.video.id}`}>
                                    <h3 className="text-brand-primary">
                                        {t("tasks.related_lesson")}: {""}
                                        <span className=" underline">{task.video.title}</span>

                                    </h3>
                                </Link>


                                <p className="mt-3 text-sm">
                                    {t("tasks.deadline")}: {formatDate(task.dead_line)}
                                </p>
                            </div>

                            <div className="flex flex-col items-end gap-3">
                                <Link href={`/dashboard/tasks/${id}`}>
                                    <button className="rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium 
                                     text-white hover:opacity-90 cursor-pointer">
                                        {t("tasks.task_presentation")}
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}