"use client";

import { useCallback, useMemo, useState } from "react";
import { StudentsStats } from "@/components/dashboard/mentor/Students/StudentsStats";
import { StudentsFilter } from "@/components/dashboard/mentor/Students/StudentsFilter";
import { StudentsTable } from "@/components/dashboard/mentor/Students/StudentsTable";
import { MentorStudentListItem } from "@/types";
import { useMentorStudents } from "@/hooks/mentor/useMentorStudents";

/**
 * MentorStudentsContent — صفحة قائمة طلاب المنتور.
 *
 * ✅ Server-side pagination:
 *    الـ backend بيرجّع 10 طلاب لكل صفحة + metadata الـ pagination.
 *    كل ما المستخدم يضغط "التالي"، نطلب الصفحة الجديدة من الـ backend.
 *
 * ✅ Client-side search:
 *    بنفلتـر الطلاب في الصفحة الحالية فقط (لو الـ backend ما بيدعمش ?search=).
 *    لو الـ backend أضافت دعم لـ ?search=، نقلّل الـ search للـ backend.
 *
 * ✅ React Query cache:
 *    كل صفحة ليها cache entry مستقل. لو رجعت لصفحة قديمة، تظهر فوراً.
 */
export default function MentorStudentsContent() {
    // ─── Pagination state (server-side) ──────────────────────────────────────
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    // ─── Data hook (server-side pagination) ──────────────────────────────────
    const {
        students,
        pagination,
        loading,
        error,
    } = useMentorStudents({ page: currentPage });

    // ─── Client-side search filter (على الصفحة الحالية فقط) ──────────────────
    // ملاحظة: هذا الفلتر يطبّق على الصفحة الحالية فقط (10 طلاب).
    // لو الـ backend أضافت ?search=، نقلّلها لـ useMentorStudents.
    const filteredStudents = useMemo<MentorStudentListItem[]>(() => {
        if (!searchQuery.trim()) return students;

        const q = searchQuery.trim().toLowerCase();
        return students.filter(
            (student) =>
                student.full_name?.toLowerCase().includes(q) ||
                student.email?.toLowerCase().includes(q),
            // ملاحظة: university_major مش موجود في MentorStudentListItem
            // لو محتاجه، ضيفه للـ type في types/index.ts
        );
    }, [students, searchQuery]);

    // ─── Handlers ────────────────────────────────────────────────────────────
    const handleSearchChange = useCallback((query: string) => {
        setSearchQuery(query);
        // ما نرجّعش لصفحة 1 لأن الـ search بيشتغل على الصفحة الحالية بس
        // لو نقلنا الـ search للـ backend، نرجّع لصفحة 1 هنا
    }, []);

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
        // التمرير لأعلى عند تغيير الصفحة (UX أفضل)
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, []);

    // ─── Derived pagination values ───────────────────────────────────────────
    const totalPages = pagination?.lastPage ?? 1;
    const totalStudents = pagination?.total ?? 0;

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
    );
}
