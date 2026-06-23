"use client"

import { TasksFilter } from "@/components/Mentor/Tasks/TasksFilter";
import { TasksHeader } from "@/components/Mentor/Tasks/TasksHeader";
import { TasksStats } from "@/components/Mentor/Tasks/TasksStats";
import { TasksTable } from "@/components/Mentor/Tasks/TasksTable";
import { useTasks } from "@/hooks/menetor/useTasks";


export default function MentorTasksContent() {
    const {
        tasks,
        stats,
        totalTasksCount,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        currentPage,
        setCurrentPage,
        itemsPerPage,
    } = useTasks();

    const totalPages = Math.ceil(totalTasksCount / itemsPerPage);

    return (
        <div className=" w-full max-w-7xl mx-auto px-4 md:px-0 pb-12 space-y-6 md:space-y-8 
        animate-in fade-in slide-in-from-bottom-4 duration-500">
            <TasksHeader />
            <TasksStats stats={stats} />
            <TasksFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
            />
            <TasksTable
                tasks={tasks}
                currentPage={currentPage}
                totalPages={totalPages || 1}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}
