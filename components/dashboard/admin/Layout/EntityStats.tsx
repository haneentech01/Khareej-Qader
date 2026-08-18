"use client";

import { Users, UserCheck, UserX, LucideIcon } from "lucide-react";
import { StatCard } from "./StatCard";

export interface EntityStatsLabels {
    total: string;
    active: string;
    disabled: string;
}

export interface EntityStatsIcons {
    total?: LucideIcon;
    active?: LucideIcon;
    disabled?: LucideIcon;
}

interface EntityStatsProps {
    labels: EntityStatsLabels;
    totalCount: number;
    activeCount: number;
    disabledCount?: number;
    icons?: EntityStatsIcons;
    className?: string;
}

export function EntityStats({
    labels,
    totalCount,
    activeCount,
    disabledCount,
    icons,
    className,
}: EntityStatsProps) {
    // لو في رقم من الـ API يستخدمه، وإلا يحسبه من القائمة المحلية
    const displayTotal = totalCount;
    const TotalIcon = icons?.total ?? Users;
    const ActiveIcon = icons?.active ?? UserCheck;
    const DisabledIcon = icons?.disabled ?? UserX;

    const finalDisabled =
        disabledCount ?? Math.max(0, totalCount - activeCount);

    return (
        <div
            className={`grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 ${className ?? ""
                }`}
        >
            <StatCard
                label={labels.total}
                value={displayTotal}
                icon={TotalIcon}
                variant="neutral"
                formatNumber
            />

            <StatCard
                label={labels.active}
                value={activeCount}
                icon={ActiveIcon}
                variant="success"
                formatNumber
            />

            <StatCard
                label={labels.disabled}
                value={finalDisabled}
                icon={DisabledIcon}
                variant="danger"
                formatNumber
            />
        </div>
    );
}

export default EntityStats;