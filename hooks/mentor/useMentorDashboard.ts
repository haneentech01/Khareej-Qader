"use client";

import endpoints from "@/lib/api/endpoints";
import { useGetData } from "@/lib/hooks/useGetData";
import { MentorDashboardData } from "@/types";

/**
 *   GET /mentor/dashboard
 *
 * الاستجابة المتوقعة من الـ backend:
 *   {
 *     success: true,
 *     message: null,
 *     data: {
 *       name: string,
 *       email: string,
 *       course_name: string[],
 *       student_count: number,
 *       last_task_submissions_count: MentorDashboardLastSubmission[]
 *     }
 *   }
 */

export function useMentorDashboard() {
  const { data, loading, error, refetch } = useGetData<MentorDashboardData>(
    endpoints.mentor.dashboard,
  );

  return {
    dashboard: (data as MentorDashboardData) ?? null,
    loading,
    error,
    refetch,
  };
}
