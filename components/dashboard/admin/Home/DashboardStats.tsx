"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, Loader2, LucideIcon } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface StatsCard {
    key: string;
    label: string;
    value: number;
    href: string;
    icon: LucideIcon;
    color: string;
}

interface Props {
    statsCards: StatsCard[];
    loading: boolean;
}

const COLOR_VARIANTS: Record<
    string,
    { bg: string; text: string }
> = {
    emerald: {
        bg: "bg-emerald-50",
        text: "text-emerald-600",
    },
    indigo: {
        bg: "bg-indigo-50",
        text: "text-indigo-600",
    },
    amber: {
        bg: "bg-amber-50",
        text: "text-amber-600",
    },
    blue: {
        bg: "bg-blue-50",
        text: "text-blue-600",
    },
    purple: {
        bg: "bg-purple-50",
        text: "text-purple-600",
    },
    red: {
        bg: "bg-red-50",
        text: "text-red-600",
    },
};

const DEFAULT_VARIANT = COLOR_VARIANTS.emerald;

interface StatCardLinkProps {
    card: StatsCard;
    loading: boolean;
    viewAllLabel: string;
}

const StatCardLink = React.memo(function StatCardLink({
    card,
    loading,
    viewAllLabel,
}: StatCardLinkProps) {
    const Icon = card.icon;
    const variant = COLOR_VARIANTS[card.color] ?? DEFAULT_VARIANT;
    const isRTL = typeof window !== "undefined" && document.dir === "rtl";
    const Arrow = isRTL ? ArrowRight : ArrowLeft;

    return (
        <Link
            href={card.href}
            className={cn(
                "bg-white border border-slate-100",
                "py-6 px-10 rounded-3xl gap-3",
                "flex flex-col items-center justify-between",
                "shadow-[0_4px_20px_rgba(0,0,0,0.015)]",
                "transition-all duration-300",
                "hover:-translate-y-1 hover:shadow-md",
            )}
        >
            <div className="flex items-end gap-3">
                <div
                    className={cn(
                        "size-10 rounded-2xl flex items-center justify-center shrink-0",
                        variant.bg,
                    )}
                >
                    <Icon className={cn("size-5", variant.text)} />
                </div>
                <span className="text-brand-muted text-xl block mb-2">
                    {card.label}
                </span>
            </div>

            {loading ? (
                <Loader2 className="size-8 animate-spin text-slate-300" />
            ) : (
                <span className="text-black font-extrabold text-2xl md:text-3xl block tracking-tight">
                    {card.value.toLocaleString()}
                </span>
            )}

            <div className="flex items-center gap-2">
                <p className="text-xs text-brand-muted">{viewAllLabel}</p>
                <Arrow className="text-brand-primary" />
            </div>
        </Link>
    );
});

StatCardLink.displayName = "StatCardLink";

// ─── المكوّن الرئيسي ─────────────────────────────────────────────
export default function DashboardStats({ statsCards, loading }: Props) {
    const t = useTranslations("Admin.dashboard");

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {statsCards.map((card) => (
                <StatCardLink
                    key={card.key}
                    card={card}
                    loading={loading}
                    viewAllLabel={t("view_all")}
                />
            ))}
        </div>
    );
}