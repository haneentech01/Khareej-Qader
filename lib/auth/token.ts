export type UserRole = "student" | "mentor" | "admin";

const TOKEN_KEYS: Record<UserRole, string> = {
  student: "student_token",
  mentor: "mentor_token",
  admin: "admin_token",
};

export const tokenManager = {
  get: (role: UserRole): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEYS[role]);
  },

  set: (role: UserRole, token: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(TOKEN_KEYS[role], token);
  },

  remove: (role: UserRole): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEYS[role]);
  },

  // نحدد الـ role بناءً على الرابط الحالي
  detectRole: (): UserRole => {
    if (typeof window === "undefined") return "student";
    const path = window.location.pathname;
    if (path.includes("/mentor")) return "mentor";
    if (path.includes("/admin")) return "admin";
    return "student";
  },
};
