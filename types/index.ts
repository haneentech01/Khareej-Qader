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

export type LessonStatus = "completed" | "current" | "locked";

export interface LessonItemProps {
  id: string;
  number: number;
  title: string;
  duration?: string;
  status: LessonStatus;
  isLast?: boolean;
}

export interface Lesson {
  id: string;
  number: number;
  title: string;
  duration?: string;
  status: LessonStatus;
}

export interface LessonTimelineProps {
  lessons: Lesson[];
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
