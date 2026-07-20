/**
 * أنواع مشتركة بين كل المشروع.
 */

import type React from "react";
import type { Editor } from "@tiptap/react";

export type Role = "student" | "mentor" | "admin";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}

export interface ValidationErrors {
  [key: string]: string[];
}

export type TopNavVariant = "student" | "mentor" | "admin";

export type ContributionType = "mentoring" | "jobs" | "financial";

// ─── Editor / Tiptap ───────────────────────────────────────────────────────
export interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
  title: string;
}

export interface EditorToolbarProps {
  editor: Editor | null;
}

// ─── Pagination ───────────────────────────────────────────────────────────
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

// ─── Page Props ───────────────────────────────────────────────────────────
export interface TaskDetailsPageProps {
  params: Promise<{
    locale: string;
    taskId: string;
  }>;
  searchParams: Promise<{
    status?: string;
  }>;
}

export interface SubmissionReviewPageProps {
  params: Promise<{
    locale: string;
    submissionId: string;
  }>;
}
