/**
 * أنواع الـ Admin Dashboard.
 *
 * ✅ مُحدّثة لتطابق الـ response الفعلي من الـ backend.
 *
 * الـ endpoints المدعومة فقط:
 *  - POST /admin/login
 *  - GET /students/all-students
 *  - POST /students/enableAccount/{slug}
 *  - POST /students/disableAccount/{slug}
 *  - GET /mentor/all-mentors
 *  - POST /mentor/enable-account/{slug}
 *  - POST /mentor/disable-account/{slug}
 *  - GET /course/all-course
 *  - POST /course/create
 */

// ─── Admin Auth & Profile ───────────────────────────────────────────────────

export interface AdminProfile {
  name: string;
  email: string;
}

export type AdminPermission =
  | "create-admin"
  | "delete-admin"
  | "update-admin"
  | "show-admins"
  | "create-course"
  | "update-course"
  | "delete-course"
  | "restore-course"
  | "force-delete-course"
  | "show-courses"
  | "show-course-students"
  | "show-course-mentors"
  | "create-link"
  | "delete-link"
  | "update-link"
  | "create-task"
  | "update-task"
  | "delete-task"
  | "restore-task"
  | "force-delete-task"
  | "get-task-pending"
  | "get-task-submissions"
  | "task-approve"
  | "task-reject"
  | "show-students"
  | "enable-student"
  | "disable-student"
  | "delete-student"
  | "restore-student"
  | "force-delete-student"
  | "show-trashed-students"
  | "filter-students"
  | "update-student-data"
  | "send-email-to-student"
  | "send-email-to-all-students"
  | "enable-mentor"
  | "disable-mentor"
  | "show-mentors"
  | "show-students-mentor"
  | "delete-mentor"
  | "restore-mentor"
  | "force-delete-mentor"
  | "send-email-to-mentor"
  | "send-email-to-all-mentors"
  | "assign-role"
  | "assign-permission"
  | "revoke-role"
  | "revoke-permission";

export interface AdminLoginResponse {
  admin: AdminProfile;
  permissions: AdminPermission[];
}

export interface AdminLoginPayload {
  username: string;
  password: string;
}

// ─── Students (from GET /students/all-students) ─────────────────────────────

export interface AdminStudent {
  id: number;
  slug: string;
  full_name: string;
  email: string;
  account_status: boolean;
  username: string;
  profile_image: string | null;
  courses: string[];
  created_at?: string;
}

// ─── Mentors (from GET /mentor/all-mentors) ────────────────────────────────

/**
 * AdminMentor — يطابق الـ response الفعلي من /mentor/all-mentors.
 */
export interface AdminMentor {
  id: number;
  slug: string;
  name: string;
  email: string;
  account_status: boolean;
  username: string;
  profile_image: string | null;
  courses: string[];
  city?: string;
  students_count?: number;
  created_at?: string;
}

export interface DashboardStats {
  studentsCount: number;
  mentorsCount: number;
  coursesCount: number;
}

// ─── Courses (from GET /course/all-course) ──────────────────────────────────
export interface AdminCourse {
  id: number;
  name: string;
  description: string;
}

// ─── Create Course (POST /course/create) ────────────────────────────────────
export interface CreateCoursePayload {
  name: string;
  description: string;
  price: number;
  youtube_playlist_url: string;
}

// ─── Enable/Disable Account (POST /students/enableAccount/{slug} and POST /mentor/enable-account/{slug}) ────────────────────
export interface ToggleAccountPayload {
  is_active: boolean;
}

export interface ToggleAccountResponse {
  success: boolean;
  message: string;
  data: null;
}
