"use client";

import React from "react";
import { Loader2, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type StatCardVariant =
    | "neutral"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "purple";

const VARIANT_STYLES: Record<
    StatCardVariant,
    { border: string; value: string; iconWrap: string; icon: string }
> = {
    neutral: {
        border: "border-slate-100",
        value: "text-black",
        iconWrap: "bg-slate-50",
        icon: "text-slate-600",
    },
    success: {
        border: "border-emerald-100/60",
        value: "text-brand-primary",
        iconWrap: "bg-brand-light-green",
        icon: "text-brand-primary",
    },
    danger: {
        border: "border-red-100/60",
        value: "text-red-600",
        iconWrap: "bg-red-50",
        icon: "text-red-500",
    },
    warning: {
        border: "border-amber-100/60",
        value: "text-amber-600",
        iconWrap: "bg-amber-50",
        icon: "text-amber-500",
    },
    info: {
        border: "border-blue-100/60",
        value: "text-blue-600",
        iconWrap: "bg-blue-50",
        icon: "text-blue-600",
    },
    purple: {
        border: "border-purple-100/60",
        value: "text-purple-600",
        iconWrap: "bg-purple-50",
        icon: "text-purple-600",
    },
};

interface StatCardProps {
    label: string;
    value: number | string;
    icon: LucideIcon;
    variant?: StatCardVariant;
    loading?: boolean;
    formatNumber?: boolean;
    onClick?: () => void;
    footer?: React.ReactNode;
    className?: string;
}

export const StatCard = React.memo(function StatCard({
    label,
    value,
    icon: Icon,
    variant = "neutral",
    loading = false,
    formatNumber = false,
    onClick,
    footer,
    className,
}: StatCardProps) {
    const styles = VARIANT_STYLES[variant];
    const isInteractive = Boolean(onClick);

    const displayValue =
        typeof value === "number" && formatNumber
            ? value.toLocaleString()
            : value;

    const Tag = isInteractive ? "button" : "div";

    return (
        <Tag
            onClick={onClick}
            type={isInteractive ? "button" : undefined}
            className={cn(
                "bg-white border p-5 rounded-3xl flex items-center justify-between",
                "shadow-[0_4px_20px_rgba(0,0,0,0.015)] text-right rtl:text-right ltr:text-left",
                isInteractive &&
                "cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md",
                styles.border,
                className,
            )}
        >
            <div className="space-y-1">
                <span className="text-slate-500 text-xs md:text-sm font-bold block">
                    {label}
                </span>
                {loading ? (
                    <Loader2 className="size-7 animate-spin text-slate-300" />
                ) : (
                    <span
                        className={cn(
                            "font-extrabold text-2xl md:text-3xl block tracking-tight",
                            styles.value,
                        )}
                    >
                        {displayValue}
                    </span>
                )}
                {footer && <div className="mt-1">{footer}</div>}
            </div>
            <div
                className={cn(
                    "size-13 rounded-2xl flex items-center justify-center shrink-0",
                    styles.iconWrap,
                )}
            >
                <Icon className={cn("size-6", styles.icon)} />
            </div>
        </Tag>
    );
});

StatCard.displayName = "StatCard";

export default StatCard;