"use client";

import { useState, useEffect } from "react";
import { MentorLessonStatus } from "@/types";

export interface LessonDetail {
  id: string;
  number: number;
  title: string;
  duration: string;
  status: MentorLessonStatus;
  averageProgress: number;
  dateAdded: string;
  description: string;
  videoUrl: string;
  objectives: string[];
  thumbnail?: string;
}

export const MOCK_LESSON_DETAILS: LessonDetail[] = [
  {
    id: "1",
    number: 1,
    title: "أساسيات HTML5",
    duration: "12:15",
    status: "published",
    averageProgress: 95,
    dateAdded: "2026-04-20",
    description: "في هذا الدرس سنتعلم أساسيات لغة HTML5 وكيفية استخدام العناصر والوسوم الأساسية لإنشاء صفحات ويب بسيطة.",
    videoUrl: "https://www.youtube.com/watch?v=1example",
    objectives: [
      "فهم أساسيات HTML5 وتاريخ تطورها",
      "التعرف على كيفية كتابة وسم البداية والنهاية",
      "إنشاء هيكل صفحة بسيط"
    ]
  },
  {
    id: "2",
    number: 2,
    title: "هيكل صفحة HTML",
    duration: "18:30",
    status: "published",
    averageProgress: 90,
    dateAdded: "2026-04-22",
    description: "في هذا الدرس سنتعرف على الهيكل الأساسي لأي صفحة HTML والعناصر الرئيسية مثل body, header, nav, main, head.",
    videoUrl: "youtube.com/watch?v=7example",
    objectives: [
      "فهم الهيكل الأساسي لأي صفحة HTML",
      "التعرف على العناصر الرئيسية في الصفحة"
    ]
  },
  {
    id: "3",
    number: 3,
    title: "التنسيق باستخدام CSS",
    duration: "13:45",
    status: "published",
    averageProgress: 85,
    dateAdded: "2026-05-10",
    description: "تعلم كيفية تحسين المظهر البصري لصفحات الويب باستخدام لغة CSS وكيفية كتابة المحددات الأساسية.",
    videoUrl: "https://www.youtube.com/watch?v=3example",
    objectives: [
      "فهم نموذج الصندوق Box Model في CSS",
      "تطبيق المحددات الأساسية لتغيير الألوان والخلفيات"
    ]
  },
  {
    id: "4",
    number: 4,
    title: "أساسيات التصميم المتجاوب",
    duration: "22:10",
    status: "published",
    averageProgress: 72,
    dateAdded: "2026-05-08",
    description: "تعرف على كيفية جعل موقع الويب الخاص بك متوافقاً مع الهواتف الذكية والأجهزة اللوحية المختلفة باستخدام الاستعلامات البرمجية Media Queries.",
    videoUrl: "https://www.youtube.com/watch?v=4example",
    objectives: [
      "استخدام Media Queries للتجاوب مع مختلف الشاشات",
      "فهم المبادئ الأساسية للتصميم المتنقل أولاً Mobile-First Design"
    ]
  },
  {
    id: "5",
    number: 5,
    title: "مقدمة في JavaScript",
    duration: "20:30",
    status: "published",
    averageProgress: 60,
    dateAdded: "2026-05-11",
    description: "مقدمة تعريفية للغة البرمجة الأكثر استخداماً في الويب JavaScript، وشرح للمتغيرات وأنواع البيانات والعمليات الأساسية.",
    videoUrl: "https://www.youtube.com/watch?v=5example",
    objectives: [
      "التعرف على دور جافا سكريبت في جعل الصفحات تفاعلية",
      "كتابة متغيرات والقيام بعمليات حسابية بسيطة"
    ]
  },
  {
    id: "6",
    number: 6,
    title: "التعامل مع DOM",
    duration: "17:40",
    status: "draft",
    averageProgress: 50,
    dateAdded: "2026-05-03",
    description: "تعلم كيفية التحكم في عناصر صفحة HTML ديناميكياً باستخدام JavaScript وتعديل النصوص والأشكال بمرونة.",
    videoUrl: "https://www.youtube.com/watch?v=6example",
    objectives: [
      "فهم شجرة الـ Document Object Model",
      "تعديل عناصر HTML والنصوص ديناميكياً باستخدام JS"
    ]
  },
  {
    id: "7",
    number: 7,
    title: "الدوال في JavaScript",
    duration: "16:00",
    status: "hidden",
    averageProgress: 0,
    dateAdded: "2026-05-01",
    description: "شرح وافٍ للدوال Functions في JavaScript وكيفية إعادة استخدام الأكواد لتوفير الوقت والجهد وتجنب التكرار.",
    videoUrl: "https://www.youtube.com/watch?v=7example",
    objectives: [
      "فهم مفهوم الدوال Function ومخرجاتها",
      "إنشاء دوال مخصصة تمرر معاملات وتنفذ أكواد معينة"
    ]
  },
  {
    id: "8",
    number: 8,
    title: "التخزين المحلي",
    duration: "19:20",
    status: "hidden",
    averageProgress: 40,
    dateAdded: "2026-05-22",
    description: "كيفية تخزين وحفظ بيانات المستخدم محلياً في المتصفح باستخدام LocalStorage واسترجاعها بسهولة عند إعادة تشغيل الصفحة.",
    videoUrl: "https://www.youtube.com/watch?v=8example",
    objectives: [
      "التعرف على الفرق بين LocalStorage و SessionStorage",
      "كتابة وقراءة وحذف البيانات من التخزين المحلي"
    ]
  }
];

export function useMentorLessonForm(lessonId: string) {
  const [lessonsList, setLessonsList] = useState<LessonDetail[]>(MOCK_LESSON_DETAILS);
  const [currentLesson, setCurrentLesson] = useState<LessonDetail | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [duration, setDuration] = useState("");
  const [status, setStatus] = useState<MentorLessonStatus>("published");
  const [objectives, setObjectives] = useState<string[]>([]);
  const [newObjective, setNewObjective] = useState("");
  const [thumbnailName, setThumbnailName] = useState<string | null>(null);
  
  // Tabs State
  const [activeTab, setActiveTab] = useState<"about" | "tasks" | "attachments" | "questions">("about");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Load lesson details
  useEffect(() => {
    const lesson = lessonsList.find(l => l.id === lessonId) || lessonsList[0];
    if (lesson) {
      setCurrentLesson(lesson);
      setTitle(lesson.title);
      setDescription(lesson.description);
      setVideoUrl(lesson.videoUrl);
      setDuration(lesson.duration);
      setStatus(lesson.status);
      setObjectives([...lesson.objectives]);
      setThumbnailName(lesson.thumbnail || null);
    }
  }, [lessonId, lessonsList]);

  // Objective Management
  const handleAddObjective = () => {
    if (newObjective.trim()) {
      setObjectives([...objectives, newObjective.trim()]);
      setNewObjective("");
    }
  };

  const handleRemoveObjective = (index: number) => {
    setObjectives(objectives.filter((_, i) => i !== index));
  };

  const handleUpdateObjective = (index: number, value: string) => {
    const updated = [...objectives];
    updated[index] = value;
    setObjectives(updated);
  };

  // Thumbnail drag and drop helper
  const handleThumbnailUpload = (name: string) => {
    setThumbnailName(name);
  };

  // Submit Handler
  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!title.trim() || !description.trim() || !videoUrl.trim() || !duration.trim()) {
      showToast("يرجى ملء جميع الحقول المطلوبة", "error");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API update
    setTimeout(() => {
      setLessonsList(prev => prev.map(l => {
        if (l.id === lessonId) {
          return {
            ...l,
            title,
            description,
            videoUrl,
            duration,
            status,
            objectives,
            thumbnail: thumbnailName || undefined
          };
        }
        return l;
      }));
      setIsSubmitting(false);
      showToast("تم حفظ التعديلات بنجاح", "success");
    }, 800);
  };

  const handleDelete = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setLessonsList(prev => prev.filter(l => l.id !== lessonId));
      setIsSubmitting(false);
      showToast("تم حذف الدرس بنجاح", "success");
    }, 800);
  };

  const showToast = (text: string, type: "success" | "error") => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const maxDescLen = 500;
  const descCharCount = description.length;

  return {
    lessonsList,
    currentLesson,
    title,
    setTitle,
    description,
    setDescription,
    videoUrl,
    setVideoUrl,
    duration,
    setDuration,
    status,
    setStatus,
    objectives,
    newObjective,
    setNewObjective,
    thumbnailName,
    activeTab,
    setActiveTab,
    isSubmitting,
    toastMessage,
    maxDescLen,
    descCharCount,
    handleAddObjective,
    handleRemoveObjective,
    handleUpdateObjective,
    handleThumbnailUpload,
    handleSave,
    handleDelete
  };
}
