"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api/client";
import endpoints from "@/lib/api/endpoints";
import { queryKeys } from "@/lib/query/keys";
import type { ApiResponse, MentorStudentsListResponse } from "@/types";

interface UseMentorStudentsOptions {
  page?: number;
  enabled?: boolean;
}

//  GET /mentor/students?page={page}
export function useMentorStudents({
  page = 1,
  enabled = true,
}: UseMentorStudentsOptions = {}) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.mentor.students(page),
    queryFn: async () => {
      const res = await apiClient.get<ApiResponse<MentorStudentsListResponse>>(
        endpoints.mentor.students,
        { params: { page } },
      );
      return res.data.data;
    },
    enabled,
    placeholderData: (prev) => prev,
  });

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
    loading: isLoading,
    error: error ? (error as Error).message : null,
    refetch,
  };
}
