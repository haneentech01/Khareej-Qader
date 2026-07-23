"use client";

import { useGetData } from "@/lib/hooks/useGetData";
import endpoints from "@/lib/api/endpoints";
import { queryKeys } from "@/lib/query/keys";

interface UseAdminCountsOptions {
  enabled?: boolean;
}

// useAdminCounts — يجلب counts (students / mentors / courses) للـ Dashboard.

export function useAdminCounts({ enabled = true }: UseAdminCountsOptions = {}) {
  const studentsCountQuery = useGetData<number>(
    queryKeys.admin.studentsCount,
    endpoints.admin.studentsCount,
    { enabled },
  );

  const mentorsCountQuery = useGetData<number>(
    queryKeys.admin.mentorsCount,
    endpoints.admin.mentorsCount,
    { enabled },
  );

  const coursesCountQuery = useGetData<number>(
    queryKeys.admin.coursesCount,
    endpoints.admin.coursesCount,
    { enabled },
  );

  const loading =
    studentsCountQuery.loading ||
    mentorsCountQuery.loading ||
    coursesCountQuery.loading;

  const error =
    studentsCountQuery.error ||
    mentorsCountQuery.error ||
    coursesCountQuery.error;

  const refetch = async () => {
    await Promise.all([
      studentsCountQuery.refetch(),
      mentorsCountQuery.refetch(),
      coursesCountQuery.refetch(),
    ]);
  };

  return {
    studentsCount: studentsCountQuery.data ?? 0,
    mentorsCount: mentorsCountQuery.data ?? 0,
    coursesCount: coursesCountQuery.data ?? 0,
    loading,
    error,
    refetch,
  };
}
