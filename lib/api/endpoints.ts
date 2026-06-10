const endpoints = {
  // ─── تسجيل الدخول والخروج لكل نوع ─────────
  auth: {
    student: {
      register: "/api/students/auth/register",
      login: "/api/students/auth/login",
      logout: "/api/students/auth/logout",
      countries: "/api/code-number",
      me: "/api/students/auth/me", // جيب بيانات المستخدم الحالي
    },
    mentor: {
      login: "/api/mentor/auth/login",
      logout: "/api/mentor/auth/logout",
      me: "/api/mentor/auth/me",
    },
    admin: {
      login: "/api/admin/auth/login",
      logout: "/api/admin/auth/logout",
      me: "/api/admin/auth/me",
    },
  },

  // ─── روابط الطالب ───────────────────────────
  student: {
    profile: "/api/students/profile",
    track: "/api/students/track",
    tasks: "/api/students/tasks",
    task: (id: string) => `/api/students/tasks/${id}`,
    certificates: "/api/students/certificates",
  },

  // ─── روابط المنتور ──────────────────────────
  mentor: {
    profile: "/api/mentor/profile",
    submissions: "/api/mentor/submissions",
    submission: (id: string) => `/api/mentor/submissions/${id}`,
    students: "/api/mentor/students",
  },

  // ─── روابط الأدمن ───────────────────────────
  admin: {
    students: "/api/admin/students",
    student: (id: string) => `/api/admin/students/${id}`,
    mentors: "/api/admin/mentors",
    stats: "/api/admin/stats",
  },
} as const;

export default endpoints;
