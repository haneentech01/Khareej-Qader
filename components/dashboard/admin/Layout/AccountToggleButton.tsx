"use client";

import React from "react";
import { Loader2, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ToggleVariant = "success" | "info" | "danger";

const ACTIVE_VARIANTS: Record<ToggleVariant, string> = {
    success: "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200/80",
    info: "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200/80",
    danger: "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200/80",
};

const INACTIVE_VARIANTS: Record<ToggleVariant, string> = {
    success: "bg-emerald-600 hover:bg-emerald-700 text-white",
    info: "bg-blue-600 hover:bg-blue-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
};

interface AccountToggleButtonProps {
    isActive: boolean;
    loading: boolean;
    activeLabel: string;
    inactiveLabel: string;
    activeIcon?: LucideIcon;
    inactiveIcon?: LucideIcon;
    inactiveVariant?: ToggleVariant;
    onClick: () => void;
    activeVariant?: ToggleVariant;
    className?: string;
}

export const AccountToggleButton = React.memo(
    function AccountToggleButton({
        isActive,
        loading,
        activeLabel,
        inactiveLabel,
        activeIcon: ActiveIcon,
        inactiveIcon: InactiveIcon,
        inactiveVariant = "success",
        activeVariant = "danger",
        onClick,
        className,
    }: AccountToggleButtonProps) {
        const variantClass = isActive
            ? ACTIVE_VARIANTS[activeVariant]
            : INACTIVE_VARIANTS[inactiveVariant];

        const Icon = loading
            ? Loader2
            : isActive
                ? ActiveIcon
                : InactiveIcon;

        return (
            <Button
                type="button"
                onClick={onClick}
                disabled={loading}
                className={cn(
                    "font-bold rounded-2xl h-10 px-4 gap-2 transition-all shadow-2xs whitespace-nowrap",
                    variantClass,
                    className,
                )}
                aria-busy={loading}
                aria-label={isActive ? activeLabel : inactiveLabel}
            >
                {Icon && (
                    <Icon
                        className={cn("size-4", loading && "animate-spin")}
                    />
                )}
                <span>{isActive ? activeLabel : inactiveLabel}</span>
            </Button>
        );
    },
);

AccountToggleButton.displayName = "AccountToggleButton";

export default AccountToggleButton;