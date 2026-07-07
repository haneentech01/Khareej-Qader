"use client";

import { MentorStats } from './MentorStats'
import { LatestSubmissions } from './LatestSubmissions'
import { WelcomeHeader } from '@/components/dashboard/Layout/WelcomeHeader';
import { useTranslations } from 'next-intl';
import { useMentorDashboard } from '@/hooks/mentor/useMentorDashboard';
import { DashboardSkeleton } from '@/components/dashboard/students/Home/DashboardSkeleton';
import { Code2Icon } from 'lucide-react';


export default function MentorDashboardContent() {
    const tDash = useTranslations("Dashboard");
    const tMentor = useTranslations("MentorDashboard");
    const { dashboard, loading, error, refetch, } = useMentorDashboard();

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
                    {tDash("retry", { defaultValue: "إعادة المحاولة" })}
                </button>
            </div>
        );
    }

    // ─── No Data ───────────────────────────────
    if (!dashboard) return null;

    return (
        <div className='max-w-7xl mx-auto space-y-8 pb-8 px-4 md:px-0'>
            {/* Welcome Greeting Row */}
            <WelcomeHeader
                userName={dashboard?.name || ""}
                subtitleMessage={tDash("WelcomeHeader.subtitle")}
                trackInfo={{
                    label: tMentor("header.track_label"),
                    name: dashboard?.course_name,
                    icon: Code2Icon
                }}
            />

            {/* Grid of Statistics */}
            <MentorStats
                studentCount={dashboard?.student_count}
                lastTaskSubmissionsCount={dashboard?.last_task_submissions_count}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-12 flex">
                    <LatestSubmissions />
                </div>
            </div>
        </div>
    )
}

