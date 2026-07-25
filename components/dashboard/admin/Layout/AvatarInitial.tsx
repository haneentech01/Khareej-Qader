"use client";

import React from "react";
import { cn } from "@/lib/utils";


export type AvatarVariant = "emerald" | "blue" | "amber" | "slate" | "indigo";

const VARIANT_STYLES: Record<AvatarVariant, string> = {
    emerald: "bg-emerald-50 text-emerald-600",
    blue: "bg-blue-50 text-blue-600",
    amber: "bg-amber-50 text-amber-600",
    slate: "bg-slate-50 text-slate-600",
    indigo: "bg-indigo-50 text-indigo-600",
};

const SIZE_STYLES = {
    sm: "size-9 text-xs",
    md: "size-10 text-sm",
    lg: "size-11 text-base",
} as const;

interface AvatarInitialProps {
    name?: string;
    fallback?: string;
    variant?: AvatarVariant;
    size?: keyof typeof SIZE_STYLES;
    className?: string;
}

export const AvatarInitial = React.memo(function AvatarInitial({
    name,
    fallback = "U",
    variant = "emerald",
    size = "md",
    className,
}: AvatarInitialProps) {
    const initial = React.useMemo(() => {
        if (name && name.trim().length > 0) {
            return name.charAt(0).toUpperCase();
        }
        return fallback.toUpperCase();
    }, [name, fallback]);

    return (
        <div
            className={cn(
                "rounded-2xl font-black flex items-center justify-center shrink-0",
                VARIANT_STYLES[variant],
                SIZE_STYLES[size],
                className,
            )}
            aria-hidden="true"
        >
            {initial}
        </div>
    );
});

AvatarInitial.displayName = "AvatarInitial";

export default AvatarInitial;