"use client";

import endpoints from "@/lib/api/endpoints";
import { useGetData } from "@/lib/hooks/useGetData";
import { MentorCourseItem } from "@/types";

/**
 * يجلب قائمة الدروس/الفيديوهات الخاصة بمسار المنتور.
 *
 * الـ endpoint هو /videos/mentor/course ويرجع:
 *   { success, message, data: MentorCourseItem[] }
 *
 * يُستخدم في القائمة المنسدلة "الدرس المرتبط" داخل نموذج إضافة مهمة.
 *
 * ملاحظة: الحقل id هنا هو video_id الذي نرسله في payload إنشاء المهمة.
 */
export function useMentorCourses() {
  const { data, loading, error, refetch } = useGetData<MentorCourseItem[]>(
    endpoints.video.mentorCourses,
  );

  return {
    /** قائمة الدروس — مصفوفة فارغة افتراضياً حتى تصل البيانات */
    courses: data ?? [],
    loading,
    error,
    refetch,
  };
}
