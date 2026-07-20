/**
 * أنواع Student Path + Video Progress.
 */

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

// ─── Video Progress Types ───────────────────────────────────────────────────

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

//  تفاصيل الفيديو الواحد (GET /videos/details/{id})
export interface VideoDetails {
  id: number;
  title: string;
  youtube_id: string;
  video_url: string;
  thumbnail: string;
  description: string;
  duration: string;
  created_at: string;
}
