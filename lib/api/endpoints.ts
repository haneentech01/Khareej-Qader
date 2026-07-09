const endpoints = {
  // ─── تسجيل الدخول والخروج لكل نوع ─────────
  auth: {
    student: {
      register: "/students/auth/register",
      login: "/students/auth/login",
      logout: "/students/auth/logout",
      countries: "/code-number",
    },
    mentor: {
      register: "/mentor/auth/register",
      activation: (id: string | number) => `/mentor/enable-account/${id}`,
      login: "/mentor/auth/login",
      logout: "/mentor/auth/logout",
    },
    admin: {
      login: "/admin/auth/login",
      logout: "/admin/auth/logout",
    },
  },

  // ─── روابط الطالب ───────────────────────────
  student: {
    profile: "/students/student-profile",
    updateData: "/students/update-student-data",
    uploadProfileImage: "/students/upload-profile-image",
    track: "/students/track",
    tasks: "/students/tasks",
    task: (id: string | number) => `/students/tasks/${id}`,
    certificates: "/students/certificates",
    studentPath: "/students/student-path",
  },

  // ─── روابط الفيديو (تقدم + استكمال) ────────
  video: {
    resume: (id: string | number) => `/videos/${id}/resume`,
    progress: (id: string | number) => `/videos/${id}/progress`,
    complete: (id: string | number) => `/videos/${id}/complete`,
    // دروس/فيديوهات المسار الخاص بالمنتور (للقائمة المنسدلة في صفحة المهام)
    mentorCourses: "/videos/mentor/course",
  },

  // ─── روابط المنتور ──────────────────────────
  mentor: {
    dashboard: "/mentor/dashboard",
    submissions: "/tasks/submissions",
    submission: (id: string | number) => `/mentor/submissions/${id}`,
    students: "/mentor/students",
    tasks: {
      create: "/tasks/new-task",
      list: "/tasks/list", // GET  - قائمة المهام
      count: "/tasks/count", // GET  - إجمالي عدد المهام
      submissionsByTask: (taskId: string | number) =>
        `/tasks/${taskId}/submissions`, // GET - المهام المرفوعة
      reviewSubmission: (id: string | number) =>
        `/tasks/submissions/${id}/review`, // تقييم تسليم طالب (PATCH)
    },
  },

  // ─── روابط الأدمن ───────────────────────────
  admin: {
    students: "/admin/students",
    student: (id: string) => `/admin/students/${id}`,
    mentors: "/admin/mentors",
    stats: "/admin/stats",
  },

  // ─── Lookup data (بيانات القوائم المنسدلة) ──
  lookup: {
    countries: "/code-number",
    universities: "/university-list",
    majors: "/major-list",
    courses: "/course",
  },
} as const;

export default endpoints;
