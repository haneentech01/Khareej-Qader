"use client";

import { useMemo } from "react";
import { StudentProfileData } from "@/types";

// Mock data for multiple students
const MOCK_STUDENTS: Record<string, StudentProfileData> = {
  "1": {
    id: "1",
    fullName: "محمد خالد",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    university: "الجامعة الإسلامية",
    major: "هندسة حاسوب",
    email: "mohamed.khalid@example.com",
    trackProgress: 68,
    completedLessons: 6,
    totalLessons: 12,
    completedTasks: 8,
    totalTasks: 9,
    averageRating: "ممتاز",
    recentSubmissions: [
      {
        id: "s1",
        taskTitle: "1. تنسيق صفحة باستخدام CSS",
        submissionDate: "10 مايو 2024",
        submissionTime: "10:20 م",
        evaluation: "ممتاز",
        status: "evaluated",
      },
      {
        id: "s2",
        taskTitle: "1. تنسيق صفحة باستخدام CSS",
        submissionDate: "10 مايو 2024",
        submissionTime: "10:20 م",
        evaluation: "ممتاز",
        status: "evaluated",
      },
      {
        id: "s3",
        taskTitle: "3. تطبيق Flexbox",
        status: "pending",
      },
      {
        id: "s4",
        taskTitle: "4. مشروع Grid Layout",
        status: "not_submitted",
      },
    ],
  },
  "2": {
    id: "2",
    fullName: "سارة أحمد",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    university: "الجامعة الأردنية",
    major: "نظم المعلومات",
    email: "sara.ahmed@example.com",
    trackProgress: 45,
    completedLessons: 4,
    totalLessons: 12,
    completedTasks: 5,
    totalTasks: 9,
    averageRating: "جيد جداً",
    recentSubmissions: [
      {
        id: "s5",
        taskTitle: "1. تنسيق صفحة باستخدام CSS",
        submissionDate: "9 مايو 2024",
        submissionTime: "8:15 م",
        evaluation: "جيد جداً",
        status: "evaluated",
      },
      {
        id: "s6",
        taskTitle: "2. تصميم Box Model",
        status: "pending",
      },
    ],
  },
};

// Fallback student in case an unknown ID is requested
const DEFAULT_STUDENT: StudentProfileData = MOCK_STUDENTS["1"];

export function useMentorStudentProfile(studentId: string) {
  const student = useMemo<StudentProfileData>(() => {
    return MOCK_STUDENTS[studentId] ?? DEFAULT_STUDENT;
  }, [studentId]);

  return { student };
}
