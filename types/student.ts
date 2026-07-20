/**
 * أنواع الـ Student Dashboard.
 */

export interface DashboardStudent {
  name: string;
  username: string;
  email: string;
  mobile_number?: string;
  gender?: string;
  university_name?: string;
  university_major?: string;
  profile_photo?: string;
}

export interface DashboardCourse {
  id: number;
  name: string;
  description: string;
}

export interface DashboardProgress {
  completed_lessons: number;
  total_lessons: number;
  percentage: number;
}

export interface DashboardCurrentLesson {
  id: number;
  title: string;
  youtube_id: string;
  embed_url: string;
  last_position: number;
  watched_seconds: number;
}

export interface DashboardNextTask {
  id: number;
  title: string;
  deadline: string;
  lesson_name: string;
  description: string;
  video_name?: string;
}

export interface DashboardMentor {
  name: string;
  role: string;
  info: string;
  mobile: string;
  avatar: string;
}

export interface DashboardCertificate {
  id: number;
  progress_percentage: number;
  completed_steps: number;
  total_steps: number;
}

export interface DashboardAnnouncement {
  id: number;
  title: string;
  description: string;
  date: string;
}

export interface DashboardData {
  student: DashboardStudent;
  course: DashboardCourse;
  progress: DashboardProgress;
  current_lesson: DashboardCurrentLesson | null;
  next_task: DashboardNextTask | null;
  mentor: DashboardMentor | null;
  certificate: DashboardCertificate | null;
  announcements: DashboardAnnouncement[];
}

export interface StudentProfile {
  student: DashboardStudent;
  course: DashboardCourse;
}

export interface StudentFormData {
  name: string;
  email: string;
  mobile_number: string;
  gender: "male" | "female" | "";
  university_name: string;
  university_major: string;
}

// ─── Update Student Data (PATCH /students/update-student-data) ──────────────
export interface UpdateStudentDataPayload {
  [key: string]: unknown;
  full_name?: string;
  email?: string;
  mobile_number?: string;
  gender?: "male" | "female" | "";
  university_name?: string;
  university_major?: string;
  teacher_collage?: string | null;
  profile_photo?: string | null;
}

export interface UpdatedStudentData {
  id: number;
  slug: string;
  email: string;
  username: string;
  full_name: string;
  profile_image: string | null;
  university_name: string;
  university_major: string;
  mobile_number: string;
  code_mobile: string;
  teacher_collage: string | null;
  files: unknown;
  is_active: boolean;
  gender: "male" | "female";
  deleted_at: string | null;
  last_active_at: string | null;
  created_at: string;
  updated_at: string;
  project_season: string | null;
}
