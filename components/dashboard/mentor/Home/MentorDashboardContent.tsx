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
    const { mentorDashboard, loading, error, refetch, } = useMentorDashboard();

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
    if (!mentorDashboard) return null;

    const { mentor, course, course_video, students_training_count, last_submissions } =
        mentorDashboard;

    return (
        <div className='max-w-7xl mx-auto space-y-8 pb-8 px-4 md:px-0'>
            {/* Welcome Greeting Row */}
            <WelcomeHeader
                userName={mentor?.name || ""}
                subtitleMessage={tDash("WelcomeHeader.subtitle")}
                trackInfo={{
                    label: tMentor("header.track_label"),
                    name: course?.name,
                    icon: Code2Icon
                }}
            />

            {/* Grid of Statistics */}
            <MentorStats
                studentCount={students_training_count}
                lastTaskSubmissionsCount={last_submissions}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-12 flex">
                    <LatestSubmissions
                        submissions={last_submissions}
                        loading={loading} />
                </div>
            </div>
        </div>
    )
}

