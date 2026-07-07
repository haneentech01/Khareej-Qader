"use client";

import { useCallback, useMemo, useState } from "react";
import { StudentsStats } from "@/components/dashboard/mentor/Students/StudentsStats";
import { StudentsFilter } from "@/components/dashboard/mentor/Students/StudentsFilter";
import { StudentsTable } from "@/components/dashboard/mentor/Students/StudentsTable";
import { MentorStudentListItem } from "@/types";
import { useMentorStudentsList } from "@/hooks/mentor/useMentorStudentsList";

const ITEMS_PER_PAGE = 10;

export default function MentorStudentsContent() {
    // ─── Data hooks ────────────────────────────
    const {
        students,
        loading: listLoading,
        error: listError,
    } = useMentorStudentsList();

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // ─── Derived data (search + pagination) ────
    const filteredStudents = useMemo<MentorStudentListItem[]>(() => {
        if (!searchQuery.trim()) return students;

        const q = searchQuery.trim().toLowerCase();
        return students.filter(
            (student) =>
                student.full_name?.toLowerCase().includes(q) ||
                student.email?.toLowerCase().includes(q) ||
                student.university_major?.toLowerCase().includes(q),
        );
    }, [students, searchQuery]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredStudents.length / ITEMS_PER_PAGE),
    );

    const paginatedStudents = useMemo<MentorStudentListItem[]>(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredStudents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredStudents, currentPage]);

    // ─── Handlers ──────────────────────────────
    const handleSearchChange = useCallback((query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
    }, []);

    return (
        <div
            className="w-full max-w-7xl mx-auto px-4 md:px-0 pb-12 space-y-6 md:space-y-8 
            animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
            <div className="flex justify-between items-start">
                {/* Stats: Total Students */}
                <StudentsStats
                    totalStudentsCount={students.length}
                    loading={listLoading}
                    error={listError}
                />
            </div>

            {/* Search filter */}
            <StudentsFilter
                searchQuery={searchQuery}
                setSearchQuery={handleSearchChange}
            />

            {/* Students table */}
            <StudentsTable
                students={paginatedStudents}
                loading={listLoading}
                error={listError}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}
