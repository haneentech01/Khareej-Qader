"use client";

import { useMemo } from "react";

import endpoints from "@/lib/api/endpoints";
import type { AdminCourse, AdminMentor, AdminStudent } from "@/types";
import { useGetData } from "@/lib/hooks/useGetData";

export function useAdminDashboard() {
  const studentsQuery = useGetData<AdminStudent[]>(
    ["admin-students"],
    endpoints.admin.students,
  );

  const mentorsQuery = useGetData<AdminMentor[]>(
    ["admin-mentors"],
    endpoints.admin.mentors,
  );

  const coursesQuery = useGetData<AdminCourse[]>(
    ["admin-courses"],
    endpoints.admin.courses,
  );

  const data = useMemo(() => {
    const students = studentsQuery.data ?? [];
    const mentors = mentorsQuery.data ?? [];
    const courses = coursesQuery.data ?? [];

    const activeStudents = students.filter(
      (student) => student.account_status,
    ).length;

    const activeMentors = mentors.filter(
      (mentor) => mentor.account_status,
    ).length;

    return {
      students,
      mentors,
      courses,

      stats: {
        studentsCount: students.length,
        mentorsCount: mentors.length,
        coursesCount: courses.length,
        activeStudents,
        activeMentors,
      },

      recentStudents: students.slice(0, 5),
      recentMentors: mentors.slice(0, 5),
    };
  }, [studentsQuery.data, mentorsQuery.data, coursesQuery.data]);

  return {
    ...data,

    loading:
      studentsQuery.loading || mentorsQuery.loading || coursesQuery.loading,

    error: studentsQuery.error || mentorsQuery.error || coursesQuery.error,

    refetch: () => {
      studentsQuery.refetch();
      mentorsQuery.refetch();
      coursesQuery.refetch();
    },
  };
}
