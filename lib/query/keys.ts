/**
 * مفاتيح الاستعلام المركزية (centralized query keys).
 *
 * ليش لازم ملف كامل للمفاتيح؟
 *  1. منع الـ typos: بدل ما تكتب ["student", "dashboard"] في كل مكان،
 *     تستخدم queryKeys.student.dashboard
 *  2. سهولة الـ invalidation: queryClient.invalidateQueries({ queryKey: queryKeys.student.dashboard })
 *  3. Type safety: as const يخلي الـ keys readonly و type-safe
 *  4. قابلية الاكتشاف: أي مطور جديد يفتح هذا الملف ويعرف كل الـ queries الموجودة
 *
 * القاعدة: كل query في التطبيق لازم يكون له مفتاح هنا.
 */
export const queryKeys = {
  // ─── Student ──────────────────────────────────────────────────────────────
  student: {
    /** GET /students/student-profile — بيانات الـ dashboard كاملة */
    dashboard: ["student", "dashboard"] as const,
    /** GET /students/tasks — قائمة مهام الطالب */
    tasks: ["student", "tasks"] as const,
    /** GET /students/student-path — مسار الطالب التعليمي */
    path: ["student", "path"] as const,
  },

  // ─── Mentor ───────────────────────────────────────────────────────────────
  mentor: {
    /** GET /mentor/dashboard — لوحة معلومات المنتور */
    dashboard: ["mentor", "dashboard"] as const,
    /** GET /mentor/submissions — قائمة تسليمات المنتور */
    submissions: ["mentor", "submissions"] as const,
    /** GET /tasks/list — قائمة مهام المنتور */
    tasks: ["mentor", "tasks"] as const,
    /** GET /tasks/count — عدد مهام المنتور */
    tasksCount: ["mentor", "tasks-count"] as const,
  },

  // ─── Admin ────────────────────────────────────────────────────────────────
  admin: {
    /** GET /admin/stats — إحصائيات الأدمن */
    stats: ["admin", "stats"] as const,
    /** GET /admin/students — قائمة الطلاب */
    students: ["admin", "students"] as const,
    /** GET /admin/mentors — قائمة المنتورات */
    mentors: ["admin", "mentors"] as const,
  },

  // ─── Lookup data ──────────────────────────────────────────────────────────
  lookup: {
    /** GET /code-number — الدول + رموزها */
    countries: ["lookup", "countries"] as const,
    /** GET /university-list — قائمة الجامعات */
    universities: ["lookup", "universities"] as const,
    /** GET /major-list — قائمة التخصصات */
    majors: ["lookup", "majors"] as const,
    /** GET /course — قائمة الكورسات */
    courses: ["lookup", "courses"] as const,
  },
} as const;
