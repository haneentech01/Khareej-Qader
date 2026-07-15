import React from "react";
import type { Editor } from "@tiptap/react";

export interface StepItem {
  number: string;
  title: string;
  desc: string;
  icon: string;
}

export interface FeatureItem {
  title: string;
  desc: string;
  icon: string;
}

export interface TestimonialItem {
  id: string | number;
  quote: string;
  name: string;
  role: string;
  badge: string;
  image: string;
  rating: number;
}

export interface GalleryItem {
  id: string | number;
  image: string;
  title: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface CtaData {
  title: string;
  subtitle: string;
  buttonText: string;
}

export interface HeroStatItem {
  key: string;
  count: string;
  label: string;
  images: string;
}

export interface HeroData {
  titleStart: string;
  brandName: string;
  description: string;
  registerButton: string;
  learnMore: string;
}

export interface TrackItem {
  name: string;
  desc: string;
  time: string;
  img: string;
}

export interface TrackData {
  registerText: string;
  tracks: TrackItem[];
}

export interface NewsItem {
  date: string;
  title: string;
  description: string;
}

export interface NewsLabels {
  smallSubtitle: string;
  viewAll: string;
  readMore: string;
}

export interface TaskDetailsPageProps {
  params: Promise<{
    locale: string;
    taskId: string;
  }>;
  searchParams: Promise<{
    status?: string;
  }>;
}

export interface TaskDetailsViewProps {
  id?: string;
  locale: string;
  status: "pending" | "completed";
  title: string;
  subtitle: string;
  breadcrumbItems: { label: string; href?: string }[];
  switcherCompleted: string;
  switcherPending: string;
}

export interface SubmissionInfoCardProps {
  status: "pending" | "completed";
}

export interface SubmissionReviewPageProps {
  params: Promise<{
    locale: string;
    submissionId: string;
  }>;
}

export interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
  title: string;
}

export interface EditorToolbarProps {
  editor: Editor | null;
}

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

export type SubmissionStatus =
  | "pending"
  | "evaluated"
  | "late"
  | "not_submitted";

export type SubmissionFileType = "zip" | "github" | "code" | "none";

export interface SubmissionListItem {
  id: string;
  studentName: string;
  studentAvatar: string;
  taskTitle: string;
  taskSubtitle: string;
  submissionTime: string;
  submissionDate: string;
  timeIsRed?: boolean;
  fileName?: string;
  fileSize?: string;
  fileType: SubmissionFileType;
  status: SubmissionStatus;
  evaluation?: string;
}

export interface StudentSubmissionSummary {
  id: string;
  taskTitle: string;
  submissionDate?: string;
  submissionTime?: string;
  evaluation?: string;
  status: SubmissionStatus;
}

export interface StudentProfileData {
  id: string;
  fullName: string;
  avatar: string;
  university: string;
  major: string;
  email: string;
  trackProgress: number;
  completedLessons: number;
  totalLessons: number;
  completedTasks: number;
  totalTasks: number;
  averageRating: string;
  recentSubmissions: StudentSubmissionSummary[];
}

export interface Country {
  nationality: string;
  countryCode: string;
  iso: string;
}

export interface University {
  id: string | number;
  un_name: string;
  type: string;
}

export interface Major {
  id: string | number;
  name: string;
}

export interface CourseListItem {
  id: number;
  name: string;
  description: string;
}

export interface StateListItem {
  id: number;
  name: string;
  state_code: string;
  capital: string;
}

export interface RegisterResponse {
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

export interface RegisterFormData {
  [key: string]: unknown;
  full_name: string;
  email: string;
  mobile_number: string;
  country_iso: string;
  gender: string;
  university_name: string;
  university_major: string;
  course_id: string;
}

export type ContributionType = "mentoring" | "jobs" | "financial";

export interface MentorRegisterFormData {
  [key: string]: unknown;
  name: string;
  email: string;
  country_iso: string;
  mobile_number: string;
  address: string;
  city: string;
  state_code: string;
  course: string;
  contribution_types: ContributionType[];
}

export type MentorRegisterPayload = MentorRegisterFormData;

export interface ValidationErrors {
  [key: string]: string[];
}

export interface LoginResponse {
  message: string;
}

export interface LoginFormData {
  [key: string]: unknown;
  username: string;
}

export type Role = "student" | "mentor" | "admin";

// ─── Dashboard Types ────────────────────────────
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

// Update Student Data (PATCH /students/update-student-data)
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

// ─── Student Path Types ────────────────────
export interface PathInfo {
  id: number;
  name: string;
  description: string;
}

export interface PathProgress {
  completed: number;
  total: number;
  percentage: number;
}

export interface CurrentVideo {
  index: number;
  id: number;
  title: string;
}

export interface PathVideo {
  index: number;
  id: number;
  title: string;
  duration: number;
  youtube_id: string;
  video_url: string;
  thumbnail_url: string;
  completed: boolean;
}

export type LessonStatus = "completed" | "current" | "locked";

export interface StudentPathData {
  path: PathInfo;
  progress: PathProgress;
  current_video: CurrentVideo;
  videos: PathVideo[];
}

// ─── Video Progress Types ───────────────────────

// GET /videos/{id}/resume
export type VideoResumeData = number;

// POST /videos/{id}/progress
export interface VideoProgressResponse {
  success: boolean;
  message: string;
  data: null;
}

// POST /videos/{id}/complete
export interface VideoCompleteResponse {
  success: boolean;
  message: string;
  data: boolean;
}

//  الـ payload الذي ارسله لـ POST /videos/{id}/progress
export interface VideoProgressPayload {
  [key: string]: unknown;
  position: number;
  watched_seconds: number;
}

/** Props مشتركة لكل الـ hooks */
export interface VideoHookProps {
  lessonId: string | number;
}

export type TaskStatus = "published" | "scheduled" | "draft" | "closed";

export interface TaskType {
  id: string;
  title: string;
  relatedLesson: string;
  dueDate: string;
  submittedStudents: number;
  totalStudents: number;
  status: TaskStatus;
}

// ─── Create Task (Mentor) ──────────────────

export interface CreateTaskPayload {
  [key: string]: unknown;
  video_id: number;
  title: string;
  description: string;
  dead_line: string;
  passing_grade: number;
}

export interface CreateTaskResponse {
  id: number;
  course_id: number;
  video_id: number;
  title: string;
  description: string;
  passing_grade: number;
  order: number;
  created_at: string;
  updated_at: string;
}

// ─── Mentor Tasks Page (count / list / courses / profile) ───

// GET /tasks/count
export interface MentorTasksCountData {
  total: number;
}

// GET /tasks/list
export interface MentorTaskListItem {
  title: string;
  video_title: string;
  dead_line: string;
}

// GET /videos/mentor/course
export interface MentorCourseItem {
  id: number;
  video_title: string;
}

export interface MentorProfile {
  id?: number;
  name: string;
  email?: string;
  avatar?: string;
  major?: string;
  role?: string;
}

export type TopNavVariant = "student" | "mentor" | "admin";

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

// ─── Update Mentor Data (PATCH /mentor/update-mentor-information) ──────────────────
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

// GET /tasks/submissions
export interface TaskSubmissionListStudent {
  id: number;
  full_name: string;
  profile_image: string | null;
}

export interface TaskSubmissionListReviewer {
  id: number;
  name: string;
}

export interface TaskSubmissionListItem {
  id: number;
  task_id: number;
  task_name: string | null;
  student_id: number;
  grade: number | null;
  reviewed_by: number | null;
  created_at: string | null;
  student: TaskSubmissionListStudent;
  reviewer: TaskSubmissionListReviewer | null;
}

// ─── Review Task Submission (PATCH /tasks/submissions/{id}/review) ──────────
export interface ReviewSubmissionPayload {
  [key: string]: unknown;
  grade: number;
  review_notes: string;
}

export interface ReviewSubmissionResponse {
  id: number;
  task_id: number;
  student_id: number;
  reviewed_by: number;
  grade: number | null;
  review_notes: string | null;
  created_at: string;
  updated_at: string;
  student: {
    id: number;
    full_name: string;
    email: string;
    mobile_number?: string;
    profile_photo?: string;
  };
  reviewer: {
    id: number;
    name: string;
    role: string;
  };
}

// ─── Mentor Students List (GET /mentor/students) ────────────────────────────
export interface MentorStudentListItem {
  id: number;
  full_name: string;
  email: string;
  profile_image?: string | null;
  courses: string[];
}

export interface PaginationLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  from: number | null;
  last_page: number;
  links: PaginationLink[];
  per_page: number;
  to: number | null;
  total: number;
}

export type MentorStudentsListResponse =
  PaginatedResponse<MentorStudentListItem>;
