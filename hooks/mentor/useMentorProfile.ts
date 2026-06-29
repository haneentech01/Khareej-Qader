"use client";

import endpoints from "@/lib/api/endpoints";
import { useGetData } from "@/lib/hooks/useGetData";
import { MentorProfile } from "@/types";

/**
 * يجلب بيانات المنتور الحالي (الاسم + البريد + الصورة).
 *
 * الـ endpoint هو /mentor/auth/me ويرجع:
 *   { success, message, data: MentorProfile }
 *
 * يُستخدم في:
 *  - TopNav لعرض اسم المنتور ديناميكياً بدل القيمة الثابتة.
 *  - mentor home page لعرض ترحيب باسم المنتور.
 *
 * يفصل بين طبقة الـ data (هنا) وطبقة الـ UI، فالـ components تتعامل
 * مع الـ shape الموحد `MentorProfile` فقط ولا تعرف عن تفاصيل الـ response.
 */
export function useMentorProfile() {
  const { data, loading, error, refetch } = useGetData<MentorProfile>(
    endpoints.auth.mentor.me,
  );

  return {
    mentor: data ?? null,
    loading,
    error,
    refetch,
  };
}
