"use client";

import { useState, useMemo } from "react";
import { MentorLesson, MentorLessonStatus } from "@/types";

const MOCK_LESSONS: MentorLesson[] = [
  {
    id: "1",
    number: 1,
    title: "أساسيات CSS",
    duration: "18:45",
    status: "published",
    averageProgress: 85,
    dateAdded: "2024-05-10",
  },
  {
    id: "2",
    number: 2,
    title: "نموذج الصندوق (Box Model)",
    duration: "22:10",
    status: "published",
    averageProgress: 72,
    dateAdded: "2024-05-08",
  },
  {
    id: "3",
    number: 3,
    title: "Flexbox - الجزء الأول",
    duration: "25:40",
    status: "published",
    averageProgress: 65,
    dateAdded: "2024-05-05",
  },
  {
    id: "4",
    number: 4,
    title: "المحاذاة والتوزيع - Flexbox",
    duration: "21:15",
    status: "draft",
    averageProgress: 50,
    dateAdded: "2024-05-03",
  },
  {
    id: "5",
    number: 5,
    title: "Grid Layout - المقدمة",
    duration: "19:30",
    status: "hidden",
    averageProgress: 0,
    dateAdded: "2024-05-01",
  },
  {
    id: "6",
    number: 6,
    title: "مقدمة في HTML5",
    duration: "15:20",
    status: "published",
    averageProgress: 95,
    dateAdded: "2024-04-20",
  },
  {
    id: "7",
    number: 7,
    title: "العناصر الهيكلية في HTML",
    duration: "18:10",
    status: "published",
    averageProgress: 90,
    dateAdded: "2024-04-22",
  },
  {
    id: "8",
    number: 8,
    title: "الجداول والنماذج (Forms) في HTML",
    duration: "24:15",
    status: "published",
    averageProgress: 88,
    dateAdded: "2024-04-25",
  },
  {
    id: "9",
    number: 9,
    title: "ربط ملفات CSS الخارجية",
    duration: "12:30",
    status: "published",
    averageProgress: 86,
    dateAdded: "2024-04-28",
  },
  {
    id: "10",
    number: 10,
    title: "محددات CSS (Selectors)",
    duration: "20:45",
    status: "published",
    averageProgress: 82,
    dateAdded: "2024-04-30",
  },
  {
    id: "11",
    number: 11,
    title: "الألوان والخلفيات في CSS",
    duration: "17:15",
    status: "published",
    averageProgress: 80,
    dateAdded: "2024-05-02",
  },
  {
    id: "12",
    number: 12,
    title: "النصوص والخطوط في CSS",
    duration: "21:00",
    status: "published",
    averageProgress: 78,
    dateAdded: "2024-05-04",
  },
  {
    id: "13",
    number: 13,
    title: "التموضع (Positioning) في CSS",
    duration: "26:30",
    status: "published",
    averageProgress: 75,
    dateAdded: "2024-05-06",
  },
  {
    id: "14",
    number: 14,
    title: "التجاوب وتصميم المواقع للهواتف",
    duration: "30:15",
    status: "published",
    averageProgress: 70,
    dateAdded: "2024-05-09",
  },
  {
    id: "15",
    number: 15,
    title: "مقدمة في JavaScript",
    duration: "14:10",
    status: "published",
    averageProgress: 60,
    dateAdded: "2024-05-11",
  },
  {
    id: "16",
    number: 16,
    title: "المتغيرات وأنواع البيانات في JS",
    duration: "19:50",
    status: "published",
    averageProgress: 58,
    dateAdded: "2024-05-12",
  },
  {
    id: "17",
    number: 17,
    title: "الدوال (Functions) في JavaScript",
    duration: "23:40",
    status: "published",
    averageProgress: 55,
    dateAdded: "2024-05-14",
  },
  {
    id: "18",
    number: 18,
    title: "المصفوفات والكائنات (Arrays & Objects)",
    duration: "28:15",
    status: "published",
    averageProgress: 52,
    dateAdded: "2024-05-15",
  },
  {
    id: "19",
    number: 19,
    title: "التعامل مع الـ DOM في JS",
    duration: "32:10",
    status: "published",
    averageProgress: 48,
    dateAdded: "2024-05-18",
  },
  {
    id: "20",
    number: 20,
    title: "الأحداث (Events) في JavaScript",
    duration: "22:20",
    status: "published",
    averageProgress: 45,
    dateAdded: "2024-05-20",
  },
  {
    id: "21",
    number: 21,
    title: "تخزين البيانات محلياً (LocalStorage)",
    duration: "18:50",
    status: "published",
    averageProgress: 40,
    dateAdded: "2024-05-22",
  },
  {
    id: "22",
    number: 22,
    title: "مقدمة في Git و GitHub",
    duration: "25:00",
    status: "published",
    averageProgress: 35,
    dateAdded: "2024-05-25",
  },
  {
    id: "23",
    number: 23,
    title: "مفهوم التطوير غير المتزامن (Promises & Fetch)",
    duration: "30:30",
    status: "draft",
    averageProgress: 15,
    dateAdded: "2024-05-26",
  },
  {
    id: "24",
    number: 24,
    title: "بناء تطبيق مهام عملي (Todo App)",
    duration: "45:10",
    status: "draft",
    averageProgress: 10,
    dateAdded: "2024-05-27",
  },
  {
    id: "25",
    number: 25,
    title: "مقدمة في React",
    duration: "20:15",
    status: "draft",
    averageProgress: 5,
    dateAdded: "2024-05-28",
  },
  {
    id: "26",
    number: 26,
    title: "المكونات (Components) والـ Props",
    duration: "24:45",
    status: "draft",
    averageProgress: 0,
    dateAdded: "2024-05-29",
  },
  {
    id: "27",
    number: 27,
    title: "إدارة الحالة (State & useState)",
    duration: "28:30",
    status: "hidden",
    averageProgress: 0,
    dateAdded: "2024-05-30",
  },
  {
    id: "28",
    number: 28,
    title: "دورة حياة المكون (useEffect)",
    duration: "26:00",
    status: "hidden",
    averageProgress: 0,
    dateAdded: "2024-05-31",
  },
  {
    id: "29",
    number: 29,
    title: "التعامل مع النماذج في React",
    duration: "22:45",
    status: "hidden",
    averageProgress: 0,
    dateAdded: "2024-06-01",
  },
  {
    id: "30",
    number: 30,
    title: "مقدمة في Tailwind CSS",
    duration: "19:15",
    status: "hidden",
    averageProgress: 0,
    dateAdded: "2024-06-02",
  },
  {
    id: "31",
    number: 31,
    title: "ربط React مع الـ API",
    duration: "35:00",
    status: "hidden",
    averageProgress: 0,
    dateAdded: "2024-06-03",
  },
  {
    id: "32",
    number: 32,
    title: "نشر المشروع النهائي على Vercel",
    duration: "40:30",
    status: "hidden",
    averageProgress: 0,
    dateAdded: "2024-06-04",
  },
];

export function useMentorTrack() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | MentorLessonStatus>("all");
  const [sortBy, setSortBy] = useState<
    "newest" | "oldest" | "highest_progress" | "lowest_progress"
  >("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Reset page when filters change
  const handleSetSearchQuery = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSetStatusFilter = (filter: "all" | MentorLessonStatus) => {
    setStatusFilter(filter);
    setCurrentPage(1);
  };

  const handleSetSortBy = (sort: typeof sortBy) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const handleSetItemsPerPage = (size: number) => {
    setItemsPerPage(size);
    setCurrentPage(1);
  };

  // Filter & Sort
  const processedLessons = useMemo(() => {
    let result = [...MOCK_LESSONS];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (lesson) =>
          lesson.title.toLowerCase().includes(q) ||
          lesson.number.toString().includes(q)
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((lesson) => lesson.status === statusFilter);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      }
      if (sortBy === "oldest") {
        return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
      }
      if (sortBy === "highest_progress") {
        return b.averageProgress - a.averageProgress;
      }
      if (sortBy === "lowest_progress") {
        return a.averageProgress - b.averageProgress;
      }
      return 0;
    });

    return result;
  }, [searchQuery, statusFilter, sortBy]);

  // Paginate
  const totalItems = processedLessons.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedLessons = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedLessons.slice(startIndex, startIndex + itemsPerPage);
  }, [processedLessons, currentPage, itemsPerPage]);

  const startIndex = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  return {
    searchQuery,
    setSearchQuery: handleSetSearchQuery,
    statusFilter,
    setStatusFilter: handleSetStatusFilter,
    sortBy,
    setSortBy: handleSetSortBy,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage: handleSetItemsPerPage,
    lessons: paginatedLessons,
    totalItems,
    totalPages,
    startIndex,
    endIndex,
  };
}
