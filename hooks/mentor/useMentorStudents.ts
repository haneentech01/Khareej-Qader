"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api/client";
import endpoints from "@/lib/api/endpoints";
import { queryKeys } from "@/lib/query/keys";
import type { ApiResponse, MentorStudentsListResponse } from "@/types";

interface UseMentorStudentsOptions {
  /** رقم الصفحة (1-based). default: 1 */
  page?: number;
  /** هل نجلِب البيانات تلقائياً؟ default: true */
  enabled?: boolean;
}

/**
 * GET /mentor/students?page={page}
 *
 * يجلب قائمة طلاب المنتور مع pagination (Laravel LengthAwarePaginator).
 *
 * ✅ يستخدم React Query — كل صفحة لها cache entry مستقل.
 *    لو رجعت لصفحةvisited before، تظهر فوراً من cache بدون request جديد.
 *
 * ✅ الـ pagination metadata (total, last_page, links, ...) بترجع مع الـ data
 *    عشان تقدر تبني الـ pagination UI بسهولة.
 *
 * @example
 * const { students, pagination, loading, error } = useMentorStudents({ page: 1 });
 *
 * // مع pagination control:
 * const [page, setPage] = useState(1);
 * const { students, pagination } = useMentorStudents({ page });
 * <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>السابق</button>
 * <button onClick={() => setPage(p => p + 1)} disabled={page === pagination.last_page}>التالي</button>
 */
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
    placeholderData: (prev) => prev, // giữ cache cũ trong khi fetch trang mới (mượt hơn)
  });

  return {
    /** قائمة الطلاب في الصفحة الحالية */
    students: data?.data ?? [],
    /** بيانات الـ pagination الكاملة (total, last_page, links, ...) */
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
