"use client";

import { useCallback, useMemo, useState } from "react";
import { TasksStats } from "@/components/dashboard/mentor/Tasks/TasksStats";
import { TasksFilter } from "@/components/dashboard/mentor/Tasks/TasksFilter";
import { TasksTable } from "@/components/dashboard/mentor/Tasks/TasksTable";
import { MentorTaskListItem } from "@/types";
import { useMentorTasksCount } from "@/hooks/mentor/useMentorTasksCount";
import { useMentorTasksList } from "@/hooks/mentor/useMentorTasksList";
import { NewTaskModal } from "./NewTaskModal";

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

    return (
        <div
            className="w-full max-w-7xl mx-auto px-4 md:px-0 pb-12 space-y-6 md:space-y-8 
            animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
            <div className="flex justify-between items-start">
                {/* Stats: Total Tasks (from /tasks/count) */}
                <TasksStats
                    totalTasksCount={totalCount}
                    loading={countLoading}
                    error={countError}
                />
                <NewTaskModal onSuccess={handleTaskCreated} />
            </div>

            {/* Search filter */}
            <TasksFilter
                searchQuery={searchQuery}
                setSearchQuery={handleSearchChange}
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
    );
}
