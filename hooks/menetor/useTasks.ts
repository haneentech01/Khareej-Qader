import { TaskStatus, TaskType } from "@/types";
import { useState, useMemo } from "react";

// Mock data based on the design
const mockTasks: TaskType[] = [
  {
    id: "1",
    title: "1. تنسيق صفحة باستخدام CSS",
    relatedLesson: "4. المحاذاة والتوزيع",
    dueDate: "10 مايو 2024",
    submittedStudents: 28,
    totalStudents: 32,
    status: "published",
  },
  {
    id: "2",
    title: "2. تصميم نموذج الصندوق (Box Model)",
    relatedLesson: "4. المحاذاة والتوزيع",
    dueDate: "17 مايو 2024",
    submittedStudents: 32,
    totalStudents: 32,
    status: "published",
  },
  {
    id: "3",
    title: "2. تصميم نموذج الصندوق (Box Model)",
    relatedLesson: "4. المحاذاة والتوزيع",
    dueDate: "17 مايو 2024",
    submittedStudents: 32,
    totalStudents: 32,
    status: "published",
  },
  {
    id: "4",
    title: "2. تصميم نموذج الصندوق (Box Model)",
    relatedLesson: "4. المحاذاة والتوزيع",
    dueDate: "17 مايو 2024",
    submittedStudents: 0,
    totalStudents: 32,
    status: "scheduled",
  },
  {
    id: "5",
    title: "2. تصميم نموذج الصندوق (Box Model)",
    relatedLesson: "4. المحاذاة والتوزيع",
    dueDate: "17 مايو 2024",
    submittedStudents: 0,
    totalStudents: 32,
    status: "draft",
  },
];

export const useTasks = () => {
  const [tasks] = useState<TaskType[]>(mockTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const stats = useMemo(() => {
    return {
      total: tasks.length,
      published: tasks.filter((t) => t.status === "published").length,
      scheduled: tasks.filter((t) => t.status === "scheduled").length,
      draft: tasks.filter((t) => t.status === "draft").length,
      closed: tasks.filter((t) => t.status === "closed").length,
    };
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.includes(searchQuery) ||
        task.relatedLesson.includes(searchQuery);
      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [tasks, searchQuery, statusFilter]);

  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTasks.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTasks, currentPage, itemsPerPage]);

  return {
    tasks: paginatedTasks,
    stats,
    totalTasksCount: filteredTasks.length,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
  };
};
