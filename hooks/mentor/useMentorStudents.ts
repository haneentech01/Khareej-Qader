"use client";

import endpoints from "@/lib/api/endpoints";
import { queryKeys } from "@/lib/query/keys";
import { useGetData } from "@/lib/hooks/useGetData";
import type { MentorStudentsListResponse } from "@/types";

interface UseMentorStudentsOptions {
  page?: number;
  enabled?: boolean;
}

// GET /mentor/students?page={page}
export function useMentorStudents({
  page = 1,
  enabled = true,
}: UseMentorStudentsOptions = {}) {
  const { data, loading, error, refetch } =
    useGetData<MentorStudentsListResponse>(
      [...queryKeys.mentor.students(page)],
      `${endpoints.mentor.students}?page=${page}`,
      { enabled },
    );

  return {
    students: data?.data ?? [],
    pagination: data
      ? {
          currentPage: data.current_page,
          lastPage: data.last_page,
          total: data.total,
          perPage: data.per_page,
          from: data.from,
          to: data.to,
          links: data.links,
        }
      : null,
    loading,
    error,
    refetch,
  };
}
