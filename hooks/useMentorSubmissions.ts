"use client";

import { useState, useMemo } from "react";
import { SubmissionListItem, SubmissionStatus } from "@/types";

// Generates exactly 41 items to match the stats in the design:
// - 12 pending (بانتظار التقييم)
// - 4 late (متأخرة)
// - 18 evaluated (تم تقييمها)
// - 7 not_submitted (لم يتم التسليم)
const MOCK_SUBMISSIONS: SubmissionListItem[] = [
  // First 7 items from the image (ordered as shown)
  {
    id: "1",
    studentName: "محمد علي",
    studentAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
    taskTitle: "1. تنسيق صفحة باستخدام CSS",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "أمس 10:20 م",
    submissionDate: "10 مايو 2024",
    fileName: "project.zip",
    fileSize: "2.4 MB",
    fileType: "zip",
    status: "pending",
  },
  {
    id: "2",
    studentName: "محمد علي",
    studentAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
    taskTitle: "1. تنسيق صفحة باستخدام CSS",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "9 مايو، 4:15 م",
    submissionDate: "9 مايو 2024",
    fileName: "github.com/mohammed/css-task",
    fileSize: "رابط GitHub",
    fileType: "github",
    status: "evaluated",
    evaluation: "ممتاز",
  },
  {
    id: "3",
    studentName: "محمد علي",
    studentAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
    taskTitle: "2. تصميم نموذج الصندوق (Box Model)",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "7 مايو، 11:30 م",
    submissionDate: "7 مايو 2024",
    fileName: "index.html",
    fileSize: "12 KB",
    fileType: "code",
    status: "late",
  },
  {
    id: "4",
    studentName: "محمد علي",
    studentAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
    taskTitle: "2. تصميم نموذج الصندوق (Box Model)",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "7 مايو، 10:10 م",
    submissionDate: "7 مايو 2024",
    fileName: "style.css",
    fileSize: "8 KB",
    fileType: "code",
    status: "evaluated",
    evaluation: "جيد جداً",
  },
  {
    id: "5",
    studentName: "محمد علي",
    studentAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
    taskTitle: "4. تطبيق شبكة Flexbox",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "6 مايو، 9:00 م",
    submissionDate: "6 مايو 2024",
    fileName: "flexbox-project.zip",
    fileSize: "3.1 MB",
    fileType: "zip",
    status: "pending",
  },
  {
    id: "6",
    studentName: "محمد علي",
    studentAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
    taskTitle: "3. إنشاء صفحة HTML أساسية",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "انتهى منذ يومين",
    submissionDate: "8 مايو 2024",
    timeIsRed: true,
    fileType: "none",
    status: "not_submitted",
  },
  {
    id: "7",
    studentName: "محمد علي",
    studentAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
    taskTitle: "5. تطبيق شبكة Grid Layout",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "انتهى منذ 3 أيام",
    submissionDate: "7 مايو 2024",
    timeIsRed: true,
    fileName: "grid-layout.zip",
    fileSize: "1.7 MB",
    fileType: "zip",
    status: "late",
  },
  // Remaining 34 items to match required counts dynamically
  // 10 pending, 2 late, 16 evaluated, 6 not_submitted
  // Pending items (10)
  {
    id: "8",
    studentName: "سارة أحمد",
    studentAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    taskTitle: "1. تنسيق صفحة باستخدام CSS",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "أمس 9:15 م",
    submissionDate: "10 مايو 2024",
    fileName: "styles-task.zip",
    fileSize: "1.8 MB",
    fileType: "zip",
    status: "pending",
  },
  {
    id: "9",
    studentName: "أحمد يوسف",
    studentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    taskTitle: "2. تصميم نموذج الصندوق (Box Model)",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "أمس 8:40 م",
    submissionDate: "10 مايو 2024",
    fileName: "box-model-code.zip",
    fileSize: "2.1 MB",
    fileType: "zip",
    status: "pending",
  },
  {
    id: "10",
    studentName: "خالد عبد الله",
    studentAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    taskTitle: "4. تطبيق شبكة Flexbox",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "أمس 6:30 م",
    submissionDate: "10 مايو 2024",
    fileName: "flex-nav.zip",
    fileSize: "1.5 MB",
    fileType: "zip",
    status: "pending",
  },
  {
    id: "11",
    studentName: "منى محمود",
    studentAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    taskTitle: "5. تطبيق شبكة Grid Layout",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "9 مايو، 11:20 م",
    submissionDate: "9 مايو 2024",
    fileName: "grid-gallery.zip",
    fileSize: "2.9 MB",
    fileType: "zip",
    status: "pending",
  },
  {
    id: "12",
    studentName: "رنا سعيد",
    studentAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
    taskTitle: "1. تنسيق صفحة باستخدام CSS",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "9 مايو، 8:10 م",
    submissionDate: "9 مايو 2024",
    fileName: "github.com/rana/styles",
    fileSize: "رابط GitHub",
    fileType: "github",
    status: "pending",
  },
  {
    id: "13",
    studentName: "يوسف حسن",
    studentAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100",
    taskTitle: "2. تصميم نموذج الصندوق (Box Model)",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "8 مايو، 10:30 م",
    submissionDate: "8 مايو 2024",
    fileName: "index.html",
    fileSize: "9 KB",
    fileType: "code",
    status: "pending",
  },
  {
    id: "14",
    studentName: "إبراهيم محمد",
    studentAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100",
    taskTitle: "4. تطبيق شبكة Flexbox",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "8 مايو، 9:15 م",
    submissionDate: "8 مايو 2024",
    fileName: "flex-cards.zip",
    fileSize: "2.6 MB",
    fileType: "zip",
    status: "pending",
  },
  {
    id: "15",
    studentName: "فاطمة علي",
    studentAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100",
    taskTitle: "5. تطبيق شبكة Grid Layout",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "7 مايو، 9:00 م",
    submissionDate: "7 مايو 2024",
    fileName: "grid-dashboard.zip",
    fileSize: "3.4 MB",
    fileType: "zip",
    status: "pending",
  },
  {
    id: "16",
    studentName: "مصطفى أحمد",
    studentAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100",
    taskTitle: "1. تنسيق صفحة باستخدام CSS",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "6 مايو، 11:30 م",
    submissionDate: "6 مايو 2024",
    fileName: "project.zip",
    fileSize: "1.9 MB",
    fileType: "zip",
    status: "pending",
  },
  {
    id: "17",
    studentName: "نور الدين",
    studentAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    taskTitle: "2. تصميم نموذج الصندوق (Box Model)",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "6 مايو، 10:00 م",
    submissionDate: "6 مايو 2024",
    fileName: "box-model.zip",
    fileSize: "1.2 MB",
    fileType: "zip",
    status: "pending",
  },
  // Late items (2 more to reach 4)
  {
    id: "18",
    studentName: "ليلى حسن",
    studentAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100",
    taskTitle: "1. تنسيق صفحة باستخدام CSS",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "انتهى منذ 4 أيام",
    submissionDate: "6 مايو 2024",
    timeIsRed: true,
    fileName: "styles.zip",
    fileSize: "1.5 MB",
    fileType: "zip",
    status: "late",
  },
  {
    id: "19",
    studentName: "كريم محمد",
    studentAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100",
    taskTitle: "4. تطبيق شبكة Flexbox",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "انتهى منذ 5 أيام",
    submissionDate: "5 مايو 2024",
    timeIsRed: true,
    fileName: "flex-menu.zip",
    fileSize: "2.0 MB",
    fileType: "zip",
    status: "late",
  },
  // Not submitted items (6 more to reach 7)
  {
    id: "20",
    studentName: "عبد الرحمن أحمد",
    studentAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
    taskTitle: "3. إنشاء صفحة HTML أساسية",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "انتهى منذ 4 أيام",
    submissionDate: "6 مايو 2024",
    timeIsRed: true,
    fileType: "none",
    status: "not_submitted",
  },
  {
    id: "21",
    studentName: "مريم علي",
    studentAvatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100",
    taskTitle: "3. إنشاء صفحة HTML أساسية",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "انتهى منذ 5 أيام",
    submissionDate: "5 مايو 2024",
    timeIsRed: true,
    fileType: "none",
    status: "not_submitted",
  },
  {
    id: "22",
    studentName: "عمر خالد",
    studentAvatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100",
    taskTitle: "3. إنشاء صفحة HTML أساسية",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "انتهى منذ 6 أيام",
    submissionDate: "4 مايو 2024",
    timeIsRed: true,
    fileType: "none",
    status: "not_submitted",
  },
  {
    id: "23",
    studentName: "هدى سليم",
    studentAvatar: "https://images.unsplash.com/photo-1534751516642-a131ffd103fd?w=100",
    taskTitle: "5. تطبيق شبكة Grid Layout",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "انتهى منذ 4 أيام",
    submissionDate: "6 مايو 2024",
    timeIsRed: true,
    fileType: "none",
    status: "not_submitted",
  },
  {
    id: "24",
    studentName: "محمود إبراهيم",
    studentAvatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=100",
    taskTitle: "5. تطبيق شبكة Grid Layout",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "انتهى منذ 5 أيام",
    submissionDate: "5 مايو 2024",
    timeIsRed: true,
    fileType: "none",
    status: "not_submitted",
  },
  {
    id: "25",
    studentName: "ريهام عادل",
    studentAvatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100",
    taskTitle: "4. تطبيق شبكة Flexbox",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "انتهى منذ 6 أيام",
    submissionDate: "4 مايو 2024",
    timeIsRed: true,
    fileType: "none",
    status: "not_submitted",
  },
  // Evaluated items (16 more to reach 18)
  {
    id: "26",
    studentName: "هاني جميل",
    studentAvatar: "https://images.unsplash.com/photo-1489980508314-941910ded1f4?w=100",
    taskTitle: "1. تنسيق صفحة باستخدام CSS",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "8 مايو، 11:20 ص",
    submissionDate: "8 مايو 2024",
    fileName: "styles.zip",
    fileSize: "1.4 MB",
    fileType: "zip",
    status: "evaluated",
    evaluation: "ممتاز",
  },
  {
    id: "27",
    studentName: "أمل حسني",
    studentAvatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=100",
    taskTitle: "1. تنسيق صفحة باستخدام CSS",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "8 مايو، 10:15 ص",
    submissionDate: "8 مايو 2024",
    fileName: "style.css",
    fileSize: "7 KB",
    fileType: "code",
    status: "evaluated",
    evaluation: "جيد جداً",
  },
  {
    id: "28",
    studentName: "علي توفيق",
    studentAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100",
    taskTitle: "2. تصميم نموذج الصندوق (Box Model)",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "7 مايو، 9:30 ص",
    submissionDate: "7 مايو 2024",
    fileName: "box-model.zip",
    fileSize: "1.8 MB",
    fileType: "zip",
    status: "evaluated",
    evaluation: "جيد",
  },
  {
    id: "29",
    studentName: "دينا منصور",
    studentAvatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100",
    taskTitle: "2. تصميم نموذج الصندوق (Box Model)",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "7 مايو، 8:15 ص",
    submissionDate: "7 مايو 2024",
    fileName: "index.html",
    fileSize: "11 KB",
    fileType: "code",
    status: "evaluated",
    evaluation: "مقبول",
  },
  {
    id: "30",
    studentName: "شادي رمزي",
    studentAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
    taskTitle: "3. إنشاء صفحة HTML أساسية",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "6 مايو، 4:10 م",
    submissionDate: "6 مايو 2024",
    fileName: "index.html",
    fileSize: "8 KB",
    fileType: "code",
    status: "evaluated",
    evaluation: "ممتاز",
  },
  {
    id: "31",
    studentName: "سحر كمال",
    studentAvatar: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100",
    taskTitle: "3. إنشاء صفحة HTML أساسية",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "6 مايو، 3:20 م",
    submissionDate: "6 مايو 2024",
    fileName: "basic.html",
    fileSize: "6 KB",
    fileType: "code",
    status: "evaluated",
    evaluation: "جيد جداً",
  },
  {
    id: "32",
    studentName: "عمرو شريف",
    studentAvatar: "https://images.unsplash.com/photo-1422564030440-1ecae6e21f67?w=100",
    taskTitle: "4. تطبيق شبكة Flexbox",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "5 مايو، 12:45 م",
    submissionDate: "5 مايو 2024",
    fileName: "flex.zip",
    fileSize: "2.1 MB",
    fileType: "zip",
    status: "evaluated",
    evaluation: "جيد",
  },
  {
    id: "33",
    studentName: "رشا جمال",
    studentAvatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100",
    taskTitle: "4. تطبيق شبكة Flexbox",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "5 مايو، 11:30 ص",
    submissionDate: "5 مايو 2024",
    fileName: "github.com/rasha/flex",
    fileSize: "رابط GitHub",
    fileType: "github",
    status: "evaluated",
    evaluation: "ممتاز",
  },
  {
    id: "34",
    studentName: "مازن سعيد",
    studentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    taskTitle: "5. تطبيق شبكة Grid Layout",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "4 مايو، 6:10 م",
    submissionDate: "4 مايو 2024",
    fileName: "grid.zip",
    fileSize: "1.9 MB",
    fileType: "zip",
    status: "evaluated",
    evaluation: "جيد جداً",
  },
  {
    id: "35",
    studentName: "غادة سليم",
    studentAvatar: "https://images.unsplash.com/photo-1534751516642-a131ffd103fd?w=100",
    taskTitle: "5. تطبيق شبكة Grid Layout",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "4 مايو، 5:30 م",
    submissionDate: "4 مايو 2024",
    fileName: "index.html",
    fileSize: "14 KB",
    fileType: "code",
    status: "evaluated",
    evaluation: "مقبول",
  },
  {
    id: "36",
    studentName: "طارق سليم",
    studentAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    taskTitle: "1. تنسيق صفحة باستخدام CSS",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "3 مايو، 12:20 م",
    submissionDate: "3 مايو 2024",
    fileName: "css.zip",
    fileSize: "1.3 MB",
    fileType: "zip",
    status: "evaluated",
    evaluation: "ممتاز",
  },
  {
    id: "37",
    studentName: "منى نبيل",
    studentAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
    taskTitle: "2. تصميم نموذج الصندوق (Box Model)",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "3 مايو، 11:15 ص",
    submissionDate: "3 مايو 2024",
    fileName: "style.css",
    fileSize: "8 KB",
    fileType: "code",
    status: "evaluated",
    evaluation: "جيد جداً",
  },
  {
    id: "38",
    studentName: "شريف وجدي",
    studentAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100",
    taskTitle: "3. إنشاء صفحة HTML أساسية",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "2 مايو، 4:10 م",
    submissionDate: "2 مايو 2024",
    fileName: "index.html",
    fileSize: "8 KB",
    fileType: "code",
    status: "evaluated",
    evaluation: "جيد",
  },
  {
    id: "39",
    studentName: "مها وجيه",
    studentAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100",
    taskTitle: "4. تطبيق شبكة Flexbox",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "2 مايو، 3:20 م",
    submissionDate: "2 مايو 2024",
    fileName: "flex-nav.zip",
    fileSize: "1.6 MB",
    fileType: "zip",
    status: "evaluated",
    evaluation: "ممتاز",
  },
  {
    id: "40",
    studentName: "أيمن رفعت",
    studentAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100",
    taskTitle: "5. تطبيق شبكة Grid Layout",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "1 مايو، 12:45 م",
    submissionDate: "1 مايو 2024",
    fileName: "grid.zip",
    fileSize: "2.3 MB",
    fileType: "zip",
    status: "evaluated",
    evaluation: "جيد جداً",
  },
  {
    id: "41",
    studentName: "رندا شوقي",
    studentAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100",
    taskTitle: "3. إنشاء صفحة HTML أساسية",
    taskSubtitle: "المحاذاة والتوزيع",
    submissionTime: "1 مايو، 11:30 ص",
    submissionDate: "1 مايو 2024",
    fileName: "basic-html.zip",
    fileSize: "1.1 MB",
    fileType: "zip",
    status: "evaluated",
    evaluation: "جيد",
  },
];

export function useMentorSubmissions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | SubmissionStatus>("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "student_name">("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Derived Statistics (Calculated statically from the complete set to ensure design counts are exact)
  const stats = useMemo(() => {
    const total = MOCK_SUBMISSIONS.length;
    const pending = MOCK_SUBMISSIONS.filter(s => s.status === "pending").length;
    const late = MOCK_SUBMISSIONS.filter(s => s.status === "late").length;
    const evaluated = MOCK_SUBMISSIONS.filter(s => s.status === "evaluated").length;
    const notSubmitted = MOCK_SUBMISSIONS.filter(s => s.status === "not_submitted").length;

    return {
      total,
      pending, // Should be 12
      late, // Should be 4
      evaluated, // Should be 18
      notSubmitted, // Should be 7
    };
  }, []);

  // Filter & Sort handlers
  const handleSetSearchQuery = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSetStatusFilter = (filter: "all" | SubmissionStatus) => {
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

  // Filter & Sort Logic
  const processedSubmissions = useMemo(() => {
    let result = [...MOCK_SUBMISSIONS];

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (sub) =>
          sub.studentName.toLowerCase().includes(q) ||
          sub.taskTitle.toLowerCase().includes(q) ||
          (sub.fileName && sub.fileName.toLowerCase().includes(q))
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      result = result.filter((sub) => sub.status === statusFilter);
    }

    // Sort submissions
    result.sort((a, b) => {
      if (sortBy === "student_name") {
        return a.studentName.localeCompare(b.studentName, "ar");
      }
      // Simple parse for dates
      const parseTime = (sub: SubmissionListItem) => {
        // Mock date fallback
        const dayMatch = sub.submissionDate.match(/(\d+)/);
        const day = dayMatch ? parseInt(dayMatch[1], 10) : 1;
        return day;
      };

      if (sortBy === "newest") {
        return parseTime(b) - parseTime(a);
      }
      if (sortBy === "oldest") {
        return parseTime(a) - parseTime(b);
      }
      return 0;
    });

    return result;
  }, [searchQuery, statusFilter, sortBy]);

  // Paginated data
  const totalItems = processedSubmissions.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedSubmissions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedSubmissions.slice(startIndex, startIndex + itemsPerPage);
  }, [processedSubmissions, currentPage, itemsPerPage]);

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
    submissions: paginatedSubmissions,
    totalItems,
    totalPages,
    startIndex,
    endIndex,
    stats,
  };
}
