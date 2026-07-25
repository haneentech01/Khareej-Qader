"use client";

import React from "react";
import { Dot, Mail, Search, Users2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { EmptyState } from "./EmptyState";
import { AvatarInitial, AvatarVariant } from "./AvatarInitial";
import { StatusBadge } from "./StatusBadge";
import { AccountToggleButton } from "./AccountToggleButton";
import { cn } from "@/lib/utils";

export type StatusFilter = "all" | "active" | "disabled";

export interface EntityLabels {
    search: string;
    viewAll: string;
    viewActive: string;
    viewDisabled: string;
    joinDate: string;
    colEntity: string;
    colStatus: string;
    colContact: string;
    colActions: string;
    activeLabel: string;
    disabledLabel: string;
    disableLabel: string;
    enableLabel: string;
    emptyTitle: string;
}

export interface EntityName {
    singular: string;
    plural: string;
}

interface EntityTableProps<T> {
    entities: T[];
    totalCount: number;
    activeCount: number;
    disabledCount: number;

    search: string;
    onSearchChange: (val: string) => void;
    statusFilter: StatusFilter;
    onStatusFilterChange: (val: StatusFilter) => void;

    loadingSlug: string | null;
    onToggleAccount: (entity: T) => Promise<void> | void;

    entityName: EntityName;
    labels: EntityLabels;

    getEntityId: (entity: T) => string;
    getEntityName: (entity: T) => string;
    getEntityEmail: (entity: T) => string;
    getEntityCreatedAt?: (entity: T) => string | undefined;
    locale: string;
    getEntityAvatarVariant?: (entity: T) => AvatarVariant;
    getExtraContact?: (entity: T) => string | undefined;

    extraColumns?: Array<{
        header: string;
        render: (entity: T) => React.ReactNode;
    }>;

    inactiveVariant?: "success" | "info";

    className?: string;
}

interface EntityRowProps<T> {
    entity: T;
    isActive: boolean;
    isToggling: boolean;
    labels: EntityLabels;
    locale: string;
    getEntityId: (e: T) => string;
    getEntityName: (e: T) => string;
    getEntityEmail: (e: T) => string;
    getEntityCreatedAt?: (e: T) => string | undefined;
    getEntityAvatarVariant?: (e: T) => AvatarVariant;
    getExtraContact?: (e: T) => string | undefined;
    extraColumns?: EntityTableProps<T>["extraColumns"];
    inactiveVariant?: "success" | "info";
    onToggleAccount: (e: T) => void;
}

function EntityRowImpl<T>({
    entity,
    isActive,
    isToggling,
    labels,
    locale,
    getEntityName,
    getEntityEmail,
    getEntityCreatedAt,
    getEntityAvatarVariant,
    getExtraContact,
    extraColumns,
    inactiveVariant = "success",
    onToggleAccount,
}: EntityRowProps<T>) {
    const name = getEntityName(entity);
    const email = getEntityEmail(entity);
    const createdAt = getEntityCreatedAt?.(entity);
    const avatarVariant = getEntityAvatarVariant?.(entity) ?? "emerald";
    const extraContact = getExtraContact?.(entity);

    return (
        <TableRow className="hover:bg-slate-50/50 transition-colors border-slate-100">
            {/* entity */}
            <TableCell className="py-4 px-6">
                <div className="flex items-center gap-3.5 min-w-50">
                    <AvatarInitial name={name} variant={avatarVariant} size="lg" />
                    <div className="space-y-0.5">
                        <h3 className="text-sm font-extrabold text-slate-900 truncate">
                            {name}
                        </h3>
                        {createdAt && (
                            <span className="flex items-center gap-1 text-xs text-slate-400">
                                <span className="size-3 inline-block">•</span>
                                {labels.joinDate}{" "}
                                {new Date(createdAt).toLocaleDateString(locale)}
                            </span>
                        )}
                    </div>
                </div>
            </TableCell>

            {/* status */}
            <TableCell className="py-4 px-6 whitespace-nowrap">
                <StatusBadge
                    status={isActive ? "active" : "disabled"}
                    label={isActive ? labels.activeLabel : labels.disabledLabel}
                    withDot
                />
            </TableCell>

            {/* contact */}
            <TableCell className="py-4 px-6">
                <div className="space-y-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5 dir-ltr w-fit">
                        <Mail className="size-3.5 inline-block text-slate-400" />
                        {email}
                    </span>
                    {extraContact && (
                        <span className="flex items-center gap-1.5 text-slate-400">
                            <Dot className="size-3.5 inline-block text-slate-400" />
                            {extraContact}
                        </span>
                    )}
                </div>
            </TableCell>

            {/* extra columns */}
            {extraColumns?.map((col, idx) => (
                <TableCell key={idx} className="py-4 px-6">
                    {col.render(entity)}
                </TableCell>
            ))}

            {/* actions */}
            <TableCell className="py-4 px-6 text-left whitespace-nowrap">
                <AccountToggleButton
                    isActive={isActive}
                    loading={isToggling}
                    activeLabel={labels.disableLabel}
                    inactiveLabel={labels.enableLabel}
                    inactiveVariant={inactiveVariant}
                    onClick={() => onToggleAccount(entity)}
                />
            </TableCell>
        </TableRow>
    );
}

EntityRowImpl.displayName = "EntityRow";

const EntityRow = React.memo(
    EntityRowImpl, (prev, next) =>
    prev.getEntityId(prev.entity) === next.getEntityId(next.entity) &&
    prev.isActive === next.isActive &&
    prev.isToggling === next.isToggling,
) as <T>(props: EntityRowProps<T>) => React.ReactElement;

// ─── الفلاتر (Search + Status Tabs) ────────────────────────────────
interface FilterBarProps {
    search: string;
    onSearchChange: (val: string) => void;
    statusFilter: StatusFilter;
    onStatusFilterChange: (val: StatusFilter) => void;
    totalCount: number;
    activeCount: number;
    disabledCount: number;
    labels: EntityLabels;
}

const FilterBar = React.memo(function FilterBar({
    search,
    onSearchChange,
    statusFilter,
    onStatusFilterChange,
    totalCount,
    activeCount,
    disabledCount,
    labels,
}: FilterBarProps) {
    const tabs: Array<{
        key: StatusFilter;
        label: string;
        count: number;
        activeColor: string;
        hoverColor: string;
    }> = [
            {
                key: "all",
                label: labels.viewAll,
                count: totalCount,
                activeColor: "text-black",
                hoverColor: "hover:text-black",
            },
            {
                key: "active",
                label: labels.viewActive,
                count: activeCount,
                activeColor: "text-emerald-700",
                hoverColor: "hover:text-emerald-700",
            },
            {
                key: "disabled",
                label: labels.viewDisabled,
                count: disabledCount,
                activeColor: "text-red-600",
                hoverColor: "hover:text-red-600",
            },
        ];

    return (
        <div className="p-5 flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* search */}
            <div className="relative w-full md:w-96">
                <Search
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4.5 text-slate-400 rtl:right-3.5 ltr:left-3.5"
                    aria-hidden="true"
                />
                <Input
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder={labels.search}
                    aria-label={labels.search}
                    className="pr-10 rtl:pr-10 ltr:pl-10 h-11 rounded-2xl border-slate-200 text-sm
          focus:outline-none focus:ring-0 focus-visible:ring-0
          focus-visible:ring-offset-0 focus:border-slate-200 active:ring-0
          active:outline-none"
                />
            </div>

            {/* filter tabs */}
            <div
                className="flex items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-2xl w-full md:w-auto"
                role="tablist"
                aria-label="status filter"
            >
                {tabs.map((tab) => {
                    const isActive = statusFilter === tab.key;
                    return (
                        <button
                            key={tab.key}
                            role="tab"
                            aria-selected={isActive}
                            onClick={() => onStatusFilterChange(tab.key)}
                            className={cn(
                                "flex-1 md:flex-none px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all",
                                isActive
                                    ? `bg-white shadow-xs ${tab.activeColor}`
                                    : `text-slate-500 ${tab.hoverColor}`,
                            )}
                        >
                            {tab.label} ({tab.count})
                        </button>
                    );
                })}
            </div>
        </div>
    );
});

FilterBar.displayName = "FilterBar";

// ─── الجدول الرئيسي ───────────────────────────────────────────────
export function EntityTable<T extends { account_status: boolean }>({
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
    entityName,
    labels,
    getEntityId,
    getEntityName,
    getEntityEmail,
    getEntityCreatedAt,
    locale,
    getEntityAvatarVariant,
    getExtraContact,
    extraColumns,
    inactiveVariant,
    className,
}: EntityTableProps<T>) {
    const tableHeaderColumns = [
        { label: labels.colEntity, className: "text-right" },
        { label: labels.colStatus, className: "text-right" },
        { label: labels.colContact, className: "text-right" },
        ...(extraColumns?.map((c) => ({
            label: c.header,
            className: "text-right",
        })) ?? []),
        { label: labels.colActions, className: "text-center" },
    ];

    return (
        <div
            className={cn(
                "bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.015)]",
                className,
            )}
        >
            <FilterBar
                search={search}
                onSearchChange={onSearchChange}
                statusFilter={statusFilter}
                onStatusFilterChange={onStatusFilterChange}
                totalCount={totalCount}
                activeCount={activeCount}
                disabledCount={disabledCount}
                labels={labels}
            />

            <div className="overflow-hidden">
                {entities.length === 0 ? (
                    <EmptyState icon={Users2} title={labels.emptyTitle} size="lg" />
                ) : (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-slate-50/70 border-b border-slate-100">
                                <TableRow>
                                    {tableHeaderColumns.map((col, idx) => (
                                        <TableHead
                                            key={idx}
                                            className={cn(
                                                "py-4 px-6 font-extrabold text-brand-muted",
                                                col.className,
                                            )}
                                        >
                                            {col.label}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>

                            <TableBody className="divide-y divide-slate-100">
                                {entities.map((entity) => {
                                    const id = getEntityId(entity);
                                    const isToggling = loadingSlug === id;

                                    return (
                                        <EntityRow
                                            key={id}
                                            entity={entity}
                                            isActive={entity.account_status}
                                            isToggling={isToggling}
                                            labels={labels}
                                            locale={locale}
                                            getEntityId={getEntityId}
                                            getEntityName={getEntityName}
                                            getEntityEmail={getEntityEmail}
                                            getEntityCreatedAt={getEntityCreatedAt}
                                            getEntityAvatarVariant={getEntityAvatarVariant}
                                            getExtraContact={getExtraContact}
                                            extraColumns={extraColumns}
                                            inactiveVariant={inactiveVariant}
                                            onToggleAccount={onToggleAccount}
                                        />
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EntityTable;