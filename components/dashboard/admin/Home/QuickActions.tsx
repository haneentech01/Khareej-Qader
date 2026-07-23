"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { GraduationCap, Users, Users2, Zap } from "lucide-react";

export default function QuickActions() {
    const t = useTranslations("Admin.dashboard.quick_actions");

    const actions = [
        {
            title: t("create_course"),
            href: "/admin/courses",
            icon: GraduationCap,
            color: "text-amber-600",
            bg: "bg-amber-50 group-hover:bg-amber-100",
            border: "hover:border-amber-200",
        },
        {
            title: t("manage_students"),
            href: "/admin/students",
            icon: Users,
            color: "text-brand-primary",
            bg: "bg-brand-light-green group-hover:bg-emerald-100",
            border: "hover:border-emerald-200",
        },
        {
            title: t("manage_mentors"),
            href: "/admin/mentors",
            icon: Users2,
            color: "text-indigo-600",
            bg: "bg-indigo-50 group-hover:bg-indigo-100",
            border: "hover:border-indigo-200",
        },
    ];

    return (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.015)] p-6 mb-8">
            {/* Title */}
            <div className="flex items-center gap-2.5 mb-5 text-right rtl:text-right ltr:text-left">
                <div className="size-9 rounded-xl bg-brand-light-green flex items-center justify-center shrink-0">
                    <Zap className="size-4.5 text-brand-primary" />
                </div>
                <h2 className="text-slate-800 font-extrabold text-base md:text-lg">
                    {t("title")}
                </h2>
            </div>

            {/* Grid of Action Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                {actions.map((action, idx) => {
                    const Icon = action.icon;
                    return (
                        <Link
                            key={idx}
                            href={action.href}
                            className={`group bg-slate-50/70 border border-slate-100/90 ${action.border} p-4 rounded-2xl flex flex-col items-center justify-center gap-3 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm`}
                        >
                            <div
                                className={`size-12 rounded-2xl ${action.bg} flex items-center justify-center shrink-0 transition-colors duration-200`}
                            >
                                <Icon className={`size-6 ${action.color}`} />
                            </div>
                            <span className="text-xs md:text-sm font-bold text-slate-700 group-hover:text-black transition-colors leading-tight">
                                {action.title}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
