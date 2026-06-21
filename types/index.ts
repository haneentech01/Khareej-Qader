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

// export interface Lesson {
//   id: string;
//   number: number;
//   title: string;
//   duration?: string;
//   status: LessonStatus;
// }

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

export interface Course {
  id: string | number;
  name: string;
  description: string;
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

// ─── Dashboard Types ────────────────────────────

export interface DashboardStudent {
  name: string;
  slug: string;
  email: string;
  avatar?: string;
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
}

export interface DashboardMentor {
  name: string;
  role: string;
  bio: string;
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

/**
 * استجابة GET /videos/{id}/resume
 * الـ backend يرجع: { success: true, message: "...", data: 100 }
 *
 * ★ ملاحظة مهمة: data هنا رقم مباشر (100)، وليس object!
 */
export type VideoResumeData = number;

/**
 * استجابة POST /videos/{id}/progress
 * الـ backend يرجع: { success: true, message: "Progress updated", data: null }
 */
export interface VideoProgressResponse {
  success: boolean;
  message: string;
  data: null;
}

/**
 * استجابة POST /videos/{id}/complete
 * الـ backend يرجع: { success: true, message: "Video completed", data: true }
 */
export interface VideoCompleteResponse {
  success: boolean;
  message: string;
  data: boolean;
}

/**
 * الـ payload الذي نرسله لـ POST /videos/{id}/progress
 * ★ نرسل position فقط — الـ backend يحسب watched_seconds والـ completion
 */
export interface VideoProgressPayload {
  [key: string]: unknown;
  position: number;
  watched_seconds: number;
}

/** Props مشتركة لكل الـ hooks */
export interface VideoHookProps {
  lessonId: string | number;
}
