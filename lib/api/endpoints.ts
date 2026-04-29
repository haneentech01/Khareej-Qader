const endpoints = {
  auth: {
    register: "/api/students/auth/register",
    login: "/api/students/auth/login",
  },
  student: {
    profile: "/api/students/profile",
    track: "/api/students/track",
  },
  admin: {
    students: "/api/admin/students",
  },
} as const;

export default endpoints;
