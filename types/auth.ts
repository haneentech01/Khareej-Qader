/**
 * أنواع الـ Auth.
 */

import type { ContributionType, Role } from "./common";

export interface RegisterResponse {
  message: string;
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

export interface LoginResponse {
  message: string;
}

export interface LoginFormData {
  [key: string]: unknown;
  username: string;
}

/** Helper type: المستخدم حسب الـ role */
export interface AuthUser {
  id: number;
  role: Role;
  full_name?: string;
  email?: string;
  profile_image?: string;
}
