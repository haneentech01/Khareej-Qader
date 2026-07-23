"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { PieChart, Users, Users2, GraduationCap } from "lucide-react";
import type { DashboardStats } from "@/types";

interface Props {
    stats: DashboardStats;
}

export function PlatformOverview({ stats }: Props) {
    const t = useTranslations("Admin.dashboard.overview");

    const totalMembers = (stats.studentsCount ?? 0) + (stats.mentorsCount ?? 0);
    const studentsPercentage =
        totalMembers > 0 ? Math.round(((stats.studentsCount ?? 0) / totalMembers) * 100) : 0;
    const mentorsPercentage =
        totalMembers > 0 ? Math.round(((stats.mentorsCount ?? 0) / totalMembers) * 100) : 0;

    return (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.015)] p-6 mb-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2.5">
                    <div className="size-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                        <PieChart className="size-4.5 text-blue-600" />
                    </div>
                    <h2 className="text-slate-800 font-extrabold text-base md:text-lg">
                        {t("title")}
                    </h2>
                </div>
            </div>

            {/* Stat Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Students Box */}
                <div className="bg-slate-50/70 border border-slate-100/90 p-4 rounded-2xl flex items-center justify-between">
                    <div className="space-y-1 text-right rtl:text-right ltr:text-left">
                        <span className="text-slate-500 text-xs font-bold block">
                            {t("students_ratio")}
                        </span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-black font-extrabold text-xl">
                                {stats.studentsCount ?? 0}
                            </span>
                            <span className="text-brand-primary text-xs font-bold">
                                ({studentsPercentage}%)
                            </span>
                        </div>
                    </div>
                    <div className="size-10 rounded-xl bg-brand-light-green flex items-center justify-center shrink-0">
                        <Users className="size-5 text-brand-primary" />
                    </div>
                </div>

                {/* Mentors Box */}
                <div className="bg-slate-50/70 border border-slate-100/90 p-4 rounded-2xl flex items-center justify-between">
                    <div className="space-y-1 text-right rtl:text-right ltr:text-left">
                        <span className="text-slate-500 text-xs font-bold block">
                            {t("mentors_ratio")}
                        </span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-black font-extrabold text-xl">
                                {stats.mentorsCount ?? 0}
                            </span>
                            <span className="text-blue-600 text-xs font-bold">
                                ({mentorsPercentage}%)
                            </span>
                        </div>
                    </div>
                    <div className="size-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                        <Users2 className="size-5 text-blue-600" />
                    </div>
                </div>

                {/* Courses Box */}
                <div className="bg-slate-50/70 border border-slate-100/90 p-4 rounded-2xl flex items-center justify-between">
                    <div className="space-y-1 text-right rtl:text-right ltr:text-left">
                        <span className="text-slate-500 text-xs font-bold block">
                            {t("total_courses")}
                        </span>
                        <span className="text-black font-extrabold text-xl block">
                            {stats.coursesCount ?? 0}
                        </span>
                    </div>
                    <div className="size-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                        <GraduationCap className="size-5 text-purple-600" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlatformOverview;