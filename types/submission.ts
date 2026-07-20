/**
 * أنواع Tasks + Submissions — مُوحّدة.
 *
 * ✅ تم توحيد الأنواع المكررة سابقاً:
 *    - SubmissionListItem (16 حقل قديم) — محذوف
 *    - TaskSubmissionListItem (12 حقل)    — مُدمج في Submission
 *    - SubmissionDetail (10 حقول)         — مُدمج في Submission
 *
 * الآن يوجد نوع واحد `Submission` يمثّل التسليم في أي سياق (list / detail / review).
 * الحقول الـ nullable مطابقة لـ response الفعلي للـ backend (قبل التقييم = null).
 */

import type { PaginatedResponse } from "./common";
import type { PathVideo } from "./student-path";

// ─── البيانات المرتبطة بالـ Submission ─────────────────────────────────────

export interface SubmissionStudent {
  id: number;
  full_name: string;
  profile_image?: string;
  email?: string;
}

export interface SubmissionTask {
  id: number;
  title: string;
}

export interface SubmissionReviewer {
  id: number;
  name: string;
}

// ─── النوع المُوحّد للتسليم ─────────────────────────────────────────────────

export interface Submission {
  id: number | string;
  task_id?: number;
  student_id: number;
  file: string | null;
  grade: number | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  review_notes?: string | null;
  created_at: string;
  updated_at?: string;
  submission_reviewed: boolean;
  student: SubmissionStudent;
  task?: SubmissionTask;
  reviewer: SubmissionReviewer | null;
}

// ─── صفحة Task مع submissionsها ──────────────────────────────────────────────

export interface AllTaskItem {
  id: number | string;
  title: string;
  course_id: number;
  video_id: number;
  description: string;
  dead_line: string;
  created_at: string;
  video: PathVideo;
  submissions: Submission[];
}

// GET /tasks/{id} — تفاصيل مهمة واحدة للطالب
export interface StudentTaskDetails {
  id: number;
  title: string;
  course_id: number;
  video_id: number;
  description: string;
  video: PathVideo;
  submissions: Submission[];
}

// ─── Task Details Page (UI) ───────────────────────────────────────────────

export interface UploadedFile {
  name: string;
  size: string;
  type: string;
  url?: string;
}

export type SubmissionInfoCardProps = "pending" | "completed";

export interface TaskDetailsViewProps {
  id?: string;
  status: SubmissionInfoCardProps;
  title: string;
  subtitle: string;
  switcherCompleted: string;
  switcherPending: string;
  submission: Submission | null;
  uploadedFiles: UploadedFile[];
}

// ─── Create Task (Mentor) ─────────────────────────────────────────────────

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

// ─── Submit Task (POST /tasks/{id}/submit) ──────────────────────────────────
export interface SubmitTaskResponse {
  id: number;
  task_id: number;
  student_id: number;
  file: string | null;
  grade: number | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  review_notes: string | null;
  created_at: string;
  updated_at: string;
}

// ─── Review Task Submission (PATCH /tasks/submissions/{id}/review) ──────────
export interface ReviewSubmissionPayload {
  [key: string]: unknown;
  grade: number;
  review_notes: string;
}

export type ReviewSubmissionResponse = Submission;

// ─── Mentor Tasks Page (count / list / courses / profile) ─────────────────

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

// ─── Paginated Submissions List ────────────────────────────────────────────
export type SubmissionsListResponse = PaginatedResponse<Submission>;

// ─── Task Status ───────────────────────────────────────────────────────────
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
