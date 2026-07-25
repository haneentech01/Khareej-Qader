"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon, Inbox } from "lucide-react";


interface EmptyStateProps {
    icon?: LucideIcon;
    title?: string;
    description?: string;
    action?: React.ReactNode;
    size?: "sm" | "md" | "lg";
    className?: string;
}

const SIZE_STYLES = {
    sm: { wrap: "py-8", icon: "size-10", iconWrap: "size-12" },
    md: { wrap: "py-12", icon: "size-12", iconWrap: "size-14" },
    lg: { wrap: "py-16", icon: "size-14", iconWrap: "size-16" },
} as const;

export const EmptyState = React.memo(function EmptyState({
    icon: Icon = Inbox,
    title,
    description,
    action,
    size = "md",
    className,
}: EmptyStateProps) {
    const styles = SIZE_STYLES[size];

    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center gap-3 text-center px-4",
                styles.wrap,
                className,
            )}
            role="status"
            aria-live="polite"
        >
            <div
                className={cn(
                    "rounded-2xl bg-slate-50 flex items-center justify-center",
                    styles.iconWrap,
                )}
            >
                <Icon className={cn("text-slate-300", styles.icon)} />
            </div>
            {title && (
                <p className="text-slate-500 font-bold text-sm md:text-base">
                    {title}
                </p>
            )}
            {description && (
                <p className="text-slate-400 text-xs md:text-sm max-w-sm">
                    {description}
                </p>
            )}
            {action && <div className="mt-2">{action}</div>}
        </div>
    );
});

EmptyState.displayName = "EmptyState";

export default EmptyState;