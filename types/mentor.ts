/**
 * أنواع Mentor Dashboard + Profile + Students.
 */

import type { PaginatedResponse } from "./common";
import type { PathVideo } from "./student-path";

// ─── Mentor Dashboard (GET /mentor/dashboard) ───────────────────────────────
export interface MentorDashboardLastSubmission {
  student_name: string;
  task_title: string;
  submitted_at: string;
}

export interface MentorDashboard {
  name: string;
  username: string;
  email: string;
  profile_image?: string;
  mobile_number?: string;
  address?: string;
  city?: string;
  state?: string;
}

export interface MentorDashboardCourse {
  id: number;
  name: string;
  description: string;
}

export interface MentorDashboardData {
  mentor: MentorDashboard;
  course: MentorDashboardCourse;
  course_video: number;
  students_training_count: number;
  last_submissions: MentorDashboardLastSubmission[];
}

// ─── GET /videos/mentor/course ──────────────────
export interface TrackCourses {
  id: number;
  video_title: string;
  video_duration: number;
  created_at: string;
}

// ─── Update Mentor Data (PATCH /mentor/update-mentor-information) ──────────
export interface UpdateMentorDataPayload {
  [key: string]: unknown;
  name?: string;
  email?: string;
  mobile_number?: string;
  address?: string;
  city?: string;
  state?: string;
}

export interface UpdatedMentorData {
  id: number;
  name: string;
  username: string;
  slug: string;
  profile_image: string | null;
  info: string | null;
  email: string;
  mobile_number: string;
  code_mobile: string;
  address: string;
  city: string;
  state: string;
  experience: number;
  status: string;
  files: unknown;
  is_active: boolean;
  deleted_at: string | null;
  last_active_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface MentorFormData {
  name: string;
  email: string;
  mobile_number: string;
  address: string;
  city: string;
  state: string;
  profile_image?: string | null;
  // Locked fields
  username: string;
  course: string;
}

export interface MentorProfile {
  id?: number;
  name: string;
  email?: string;
  avatar?: string;
  major?: string;
  role?: string;
}

// ─── Mentor Students List (GET /mentor/students) ────────────────────────────
export interface MentorStudentListItem {
  id: number;
  slug: string;
  full_name: string;
  email: string;
  profile_image?: string | null;
  courses: string[];
}

export type MentorStudentsListResponse =
  PaginatedResponse<MentorStudentListItem>;

// ─── Mentor Student Details (GET /mentor/students/{id}) ──────────────────
export interface MentorStudentCourse {
  id: number;
  name: string;
  description: string;
}

export interface MentorStudentDetails {
  full_name: string;
  university_name: string;
  university_major: string;
  mobile_number: string;
  profile_photo: string | null;
  gender: "male" | "female";
  mentor: string[];
  courses: MentorStudentCourse[];
  answered_tasks: number;
  unanswered_tasks: number;
}

// ─── Mentor Lessons (Track page) ────────────────────────────────────────────
export type MentorLessonStatus = "published" | "draft" | "hidden";

export interface MentorLesson {
  id: string;
  number: number;
  title: string;
  duration: string;
  status: MentorLessonStatus;
  averageProgress: number;
  dateAdded: string;
}

// Path video (re-exported for convenience)
export type { PathVideo };
