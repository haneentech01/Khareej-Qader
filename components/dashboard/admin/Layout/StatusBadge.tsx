"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type BadgeStatus = "active" | "disabled" | "pending" | "reviewed";

const STATUS_VARIANTS: Record<
    BadgeStatus,
    { container: string; dot: string }
> = {
    active: {
        container: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
        dot: "bg-emerald-500",
    },
    disabled: {
        container: "bg-red-50 text-red-600 border-red-200/60",
        dot: "bg-red-500",
    },
    pending: {
        container: "bg-amber-50 text-amber-700 border-amber-200/60",
        dot: "bg-amber-500",
    },
    reviewed: {
        container: "bg-blue-50 text-blue-700 border-blue-200/60",
        dot: "bg-blue-500",
    },
};

interface StatusBadgeProps {
    status: BadgeStatus;
    label?: string;
    withDot?: boolean;
    icon?: React.ComponentType<{ className?: string }>;
    className?: string;
}

export const StatusBadge = React.memo(function StatusBadge({
    status,
    label,
    withDot = false,
    icon: Icon,
    className,
}: StatusBadgeProps) {
    const variant = STATUS_VARIANTS[status];

    return (
        <span
            className={cn(
                "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full",
                "text-xs font-bold border whitespace-nowrap",
                variant.container,
                className,
            )}
        >
            {Icon ? (
                <Icon className="size-3.5" />
            ) : withDot ? (
                <span className={cn("size-1.5 rounded-full", variant.dot)} />
            ) : null}
            {label}
        </span>
    );
});

StatusBadge.displayName = "StatusBadge";

export default StatusBadge;