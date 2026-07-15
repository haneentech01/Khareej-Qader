"use client";

import { useCallback, useMemo, useState } from "react";
import { StudentsStats } from "@/components/dashboard/mentor/Students/StudentsStats";
import { StudentsFilter } from "@/components/dashboard/mentor/Students/StudentsFilter";
import { StudentsTable } from "@/components/dashboard/mentor/Students/StudentsTable";
import { MentorStudentListItem } from "@/types";
import { useMentorStudents } from "@/hooks/mentor/useMentorStudents";
import { StudentsSkeleton } from "./StudentsSkeleton";

export default function MentorStudentsContent() {
    // ─── Pagination state (server-side) ──────────────────────────────────────
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const {
        students,
        pagination,
        loading,
        error,
    } = useMentorStudents({ page: currentPage });

    const filteredStudents = useMemo<MentorStudentListItem[]>(() => {
        if (!searchQuery.trim()) return students;

        const q = searchQuery.trim().toLowerCase();
        return students.filter(
            (student) =>
                student.full_name?.toLowerCase().includes(q) ||
                student.email?.toLowerCase().includes(q),
        );
    }, [students, searchQuery]);

    const handleSearchChange = useCallback((query: string) => {
        setSearchQuery(query);
    }, []);

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, []);

    // ─── Derived pagination values ───────────────────────────────────────────
    const totalPages = pagination?.lastPage ?? 1;
    const totalStudents = pagination?.total ?? 0;

    if (loading && students.length === 0) {
        return <StudentsSkeleton />;
    }

    return (
        <div
            className="w-full max-w-7xl mx-auto px-4 md:px-0 pb-12 space-y-6 md:space-y-8 
      animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
            <div className="w-full">
                {/* Stats: Total Students (من الـ pagination metadata) */}
                <StudentsStats
                    totalStudentsCount={totalStudents}
                    loading={loading}
                    error={error}
                />
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden py-3">
                {/* Search filter */}
                <StudentsFilter
                    searchQuery={searchQuery}
                    setSearchQuery={handleSearchChange}
                />

                {/* Students table */}
                <StudentsTable
                    students={filteredStudents}
                    loading={loading}
                    error={error}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}
