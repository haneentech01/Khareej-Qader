const endpoints = {
  // ─── تسجيل الدخول والخروج لكل نوع ─────────
  auth: {
    student: {
      register: "/students/auth/register",
      login: "/students/auth/login",
      logout: "/students/auth/logout",
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
    submitTask: (taskId: string | number) => `/tasks/${taskId}/submit`,
    task: (id: string | number) => `/students/tasks/${id}`,
    certificates: "/students/certificates",
    studentPath: "/students/student-path",
  },

  // ─── روابط المهام (Tasks) ───────────────────
  tasks: {
    // GET
    all: "/tasks/all",
    // GET /tasks/{id}
    details: (id: string | number) => `/tasks/${id}`,
    // POST
    submit: (taskId: string | number) => `/tasks/${taskId}/submit`,
  },

  // ─── روابط الفيديو (تقدم + استكمال) ────────
  video: {
    resume: (id: string | number) => `/videos/${id}/resume`,
    progress: (id: string | number) => `/videos/${id}/progress`,
    complete: (id: string | number) => `/videos/${id}/complete`,
    // دروس/فيديوهات المسار الخاص بالمنتور (للقائمة المنسدلة في صفحة المهام)
    mentorCourses: "/videos/mentor/course",
    details: (id: string | number) => `/videos/details/${id}`,
  },

  // ─── روابط المنتور ──────────────────────────
  mentor: {
    dashboard: "/mentor/dashboard",
    updateData: "/mentor/update-mentor-information",
    uploadProfileImage: "/mentor/upload-profile-image",
    submissions: "/tasks/submissions",
    submissionDetails: (id: string | number) => `/tasks/${id}/submissions`,
    students: "/mentor/students",
    student: (id: string | number) => `/mentor/students/${id}`,
    tasks: {
      create: "/tasks/new-task",
      list: "/tasks/list",
      count: "/tasks/count",
      submissionsByTask: (taskId: string | number) =>
        `/tasks/${taskId}/submissions`,
      reviewSubmission: (id: string | number) =>
        `/tasks/submissions/${id}/review`,
    },
    trackCourses: "/videos/mentor/course",
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
    codeCountries: "/code-number",
    universities: "/university-list",
    majors: "/major-list",
    coursesList: "/course/list",
    statesList: "/states-list",
  },
} as const;

export default endpoints;
