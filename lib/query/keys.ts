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
    //  GET /mentor/students — قائمة طلاب المنتور (paginated).
    students: (page: number = 1) => ["mentor", "students", page] as const,
    // GET /mentor/students/{id} — تفاصيل طالب واحد
    student: (id: string | number) =>
      ["mentor", "students", "details", id] as const,
    trackCourses: ["mentor", "trackCourses"] as const,
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
    /** GET /course/list — قائمة الكورسات */
    coursesList: ["lookup", "courses-list"] as const,
    /** GET /states-list — قائمة الدول/الولايات */
    statesList: ["lookup", "states-list"] as const,
  },
} as const;
