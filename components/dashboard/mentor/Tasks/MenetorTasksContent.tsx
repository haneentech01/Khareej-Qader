"use client";

import { useCallback, useMemo, useState } from "react";
import { TasksStats } from "@/components/dashboard/mentor/Tasks/TasksStats";
import { TasksTable } from "@/components/dashboard/mentor/Tasks/TasksTable";
import { MentorTaskListItem } from "@/types";
import { useMentorTasksCount } from "@/hooks/mentor/useMentorTasksCount";
import { useMentorTasksList } from "@/hooks/mentor/useMentorTasksList";
import { NewTaskModal } from "./NewTaskModal";
import { TasksSkeleton } from "./TasksSkeleton";
import { Filter } from "../../Layout/Filter";
import { t } from "media-chrome";
import { useTranslations } from "next-intl";

const ITEMS_PER_PAGE = 10;

export default function MentorTasksContent() {
    // ─── Data hooks ────────────────────────────
    const {
        totalCount,
        loading: countLoading,
        error: countError,
        refetch: refetchCount,
    } = useMentorTasksCount();

    const {
        tasks,
        loading: listLoading,
        error: listError,
        refetch: refetchList,
    } = useMentorTasksList();


    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const t = useTranslations("Dashboard.filters");

    // ─── Derived data (search + pagination) ────
    const filteredTasks = useMemo<MentorTaskListItem[]>(() => {
        if (!searchQuery.trim()) return tasks;

        const q = searchQuery.trim().toLowerCase();
        return tasks.filter(
            (task) =>
                task.title.toLowerCase().includes(q) ||
                task.video_title.toLowerCase().includes(q),
        );
    }, [tasks, searchQuery]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredTasks.length / ITEMS_PER_PAGE),
    );

    const paginatedTasks = useMemo<MentorTaskListItem[]>(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredTasks.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredTasks, currentPage]);

    // ─── Handlers ──────────────────────────────
    const handleSearchChange = useCallback((query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
    }, []);
    const handleTaskCreated = useCallback(() => {
        refetchCount();
        refetchList();
    }, [refetchCount, refetchList]);

    if (listLoading && tasks.length === 0) {
        return <TasksSkeleton />;
    }

    return (
        <div
            className="w-full max-w-7xl mx-auto px-4 md:px-0 pb-12 space-y-6 md:space-y-8 
            animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
            <div className="flex justify-between flex-col w-full">
                {/* Stats: Total Tasks (from /tasks/count) */}
                <div className="w-full space-y-4">
                    <div className="flex justify-end">
                        <NewTaskModal onSuccess={handleTaskCreated} />
                    </div>

                    <div className="flex justify-start">
                        <div className="w-full">
                            <TasksStats
                                totalTasksCount={totalCount}
                                loading={countLoading}
                                error={countError}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden py-3">
                {/* Search filter */}
                <Filter
                    searchQuery={searchQuery}
                    setSearchQuery={handleSearchChange}
                    placeholder={t("search_placeholder")}
                />

                {/* Tasks table (from /tasks/list) */}
                <TasksTable
                    tasks={paginatedTasks}
                    loading={listLoading}
                    error={listError}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
}
