const endpoints = {
  // ─── تسجيل الدخول والخروج لكل نوع ─────────
  auth: {
    student: {
      register: "/students/auth/register",
      login: "/students/auth/login",
      logout: "/students/auth/logout",
      countries: "/code-number",
      me: "/students/auth/me", // جيب بيانات المستخدم الحالي
    },
    mentor: {
      register: "/mentor/auth/register",
      activation: (id: string) => `/mentor/enable-account/${id}`,
      login: "/mentor/auth/login",
      logout: "/mentor/auth/logout",
      me: "/mentor/auth/me",
    },
    admin: {
      login: "/admin/auth/login",
      logout: "/admin/auth/logout",
      me: "/admin/auth/me",
    },
  },

  // ─── روابط الطالب ───────────────────────────
  student: {
    profile: "/students/student-profile",
    track: "/students/track",
    tasks: "/students/tasks",
    task: (id: string) => `/students/tasks/${id}`,
    certificates: "/students/certificates",
    studentPath: "/students/student-path",
  },

  // ─── روابط الفيديو (تقدم + استكمال) ────────
  video: {
    resume: (id: string | number) => `/videos/${id}/resume`,
    progress: (id: string | number) => `/videos/${id}/progress`,
    complete: (id: string | number) => `/videos/${id}/complete`,
  },

  // ─── روابط المنتور ──────────────────────────
  mentor: {
    profile: "/mentor/profile",
    submissions: "/mentor/submissions",
    submission: (id: string) => `/mentor/submissions/${id}`,
    students: "/mentor/students",
    task: {
      create: "/tasks/new-task",
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
