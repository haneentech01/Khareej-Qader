"use client";

import React from "react";
import { RefreshCw, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EntityStats, EntityStatsLabels, EntityStatsIcons } from "./EntityStats";
import { EntityTable, EntityLabels, EntityName, StatusFilter } from "./EntityTable";
import { ErrorState } from "./ErrorState";

export interface EntityHeaderConfig {
    title: string;
    subtitle: string;
    icon: LucideIcon;
    iconVariant: "success" | "info" | "warning" | "danger" | "purple";
    showRefreshButton?: boolean;
    refreshLabel?: string;
}

const HEADER_ICON_STYLES: Record<
    EntityHeaderConfig["iconVariant"],
    string
> = {
    success: "bg-brand-light-green text-brand-primary",
    info: "bg-blue-50 text-blue-600",
    warning: "bg-amber-50 text-amber-600",
    danger: "bg-red-50 text-red-600",
    purple: "bg-purple-50 text-purple-600",
};

interface SkeletonProps {
    skeleton?: React.ReactNode;
}

interface EntityManagementViewProps<T>
    extends SkeletonProps {
    // ─── Data ────────────────────────────────────────────────────
    entities: T[];
    totalCount: number;
    activeCount: number;
    disabledCount: number;

    // ─── Filters ────────────────────────────────────────────────
    search: string;
    onSearchChange: (val: string) => void;
    statusFilter: StatusFilter;
    onStatusFilterChange: (val: StatusFilter) => void;

    // ─── Toggle ─────────────────────────────────────────────────
    loadingSlug: string | null;
    onToggleAccount: (entity: T) => Promise<void> | void;

    // ─── States ─────────────────────────────────────────────────
    loading: boolean;
    error: string | null;
    onRetry: () => void;

    // ─── Config ─────────────────────────────────────────────────
    header: EntityHeaderConfig;
    statsLabels: EntityStatsLabels;
    statsIcons?: EntityStatsIcons;
    tableLabels: EntityLabels;
    entityName: EntityName;
    locale: string;

    // ─── Selectors ──────────────────────────────────────────────
    getEntityId: (entity: T) => string;
    getEntityName: (entity: T) => string;
    getEntityEmail: (entity: T) => string;
    getEntityCreatedAt?: (entity: T) => string | undefined;
    getStatus?: (entity: T) => boolean;
    getEntityAvatarVariant?: (entity: T) =>
        | "emerald"
        | "blue"
        | "amber"
        | "slate"
        | "indigo";
    getExtraContact?: (entity: T) => string | undefined;
    extraColumns?: Array<{
        header: string;
        render: (entity: T) => React.ReactNode;
    }>;
    inactiveVariant?: "success" | "info";
}

export function EntityManagementView<T>({
    entities,
    totalCount,
    activeCount,
    disabledCount,
    search,
    onSearchChange,
    statusFilter,
    onStatusFilterChange,
    loadingSlug,
    onToggleAccount,
    loading,
    error,
    onRetry,
    header,
    statsLabels,
    statsIcons,
    tableLabels,
    entityName,
    locale,
    getEntityId,
    getEntityName,
    getEntityEmail,
    getEntityCreatedAt,
    getStatus,
    getEntityAvatarVariant,
    getExtraContact,
    extraColumns,
    inactiveVariant,
    skeleton,
}: EntityManagementViewProps<T>) {
    // ─── Loading ─────────────────────────────────────────────
    if (loading && entities.length === 0) {
        return <>{skeleton}</>;
    }

    // ─── Error ───────────────────────────────────────────────
    if (error) {
        return <ErrorState message={error} onRetry={onRetry} />;
    }

    const HeaderIcon = header.icon;
    const iconStyle = HEADER_ICON_STYLES[header.iconVariant];

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* ─── Header ───────────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-extrabold text-black tracking-tight flex items-center gap-3">
                        <div
                            className={`size-10 rounded-2xl flex items-center justify-center shrink-0 ${iconStyle}`}
                        >
                            <HeaderIcon className="size-6" />
                        </div>
                        {header.title}
                    </h1>
                    <p className="text-brand-muted text-base">{header.subtitle}</p>
                </div>

                {header.showRefreshButton && (
                    <Button
                        onClick={onRetry}
                        variant="outline"
                        className="rounded-2xl border-slate-200 text-slate-600 hover:bg-slate-50 gap-2"
                        aria-label={header.refreshLabel}
                    >
                        <RefreshCw
                            className={`size-4 ${loading ? "animate-spin" : ""}`}
                        />
                        <span>{header.refreshLabel}</span>
                    </Button>
                )}
            </div>

            {/* ─── Stats ────────────────────────────────────────── */}
            <EntityStats
                labels={statsLabels}
                totalCount={totalCount}
                activeCount={activeCount}
                disabledCount={disabledCount}
                icons={statsIcons}
            />

            {/* ─── Table ────────────────────────────────────────── */}
            <EntityTable<T>
                entities={entities}
                totalCount={totalCount}
                activeCount={activeCount}
                disabledCount={disabledCount}
                search={search}
                onSearchChange={onSearchChange}
                statusFilter={statusFilter}
                onStatusFilterChange={onStatusFilterChange}
                loadingSlug={loadingSlug}
                onToggleAccount={onToggleAccount}
                entityName={entityName}
                labels={tableLabels}
                getEntityId={getEntityId}
                getEntityName={getEntityName}
                getEntityEmail={getEntityEmail}
                getEntityCreatedAt={getEntityCreatedAt}
                getStatus={getStatus}
                locale={locale}
                getEntityAvatarVariant={getEntityAvatarVariant}
                getExtraContact={getExtraContact}
                extraColumns={extraColumns}
                inactiveVariant={inactiveVariant}
            />
        </div>
    );
}

export default EntityManagementView;