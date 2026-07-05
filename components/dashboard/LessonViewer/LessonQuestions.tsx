"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Send, MessagesSquareIcon } from "lucide-react";
import { QuestionItem } from "./QuestionItem";
import { Button } from "@/components/ui/button";

export function LessonQuestions() {
  const t = useTranslations("Dashboard.LessonViewer.questions");
  const [questionText, setQuestionText] = useState("");

  const mockQuestions = [
    {
      id: "1",
      user: { name: "عمر خالد", avatar: "" },
      time: "منذ ساعتين",
      question: "كيف يمكنني ربط ملف CSS خارجي في صفحة HTML؟ هل يجب أن يكون في الـ Head دائماً؟",
      repliesCount: 3,
      trainerReply: {
        name: "أحمد يوسف",
        avatar: "",
        text: "نعم عمر، من الأفضل دائماً وضع ملفات الـ CSS داخل الـ Head لضمان تحميل التنسيقات قبل عرض محتوى الصفحة، مما يتجنب ظهور الصفحة بدون تنسيق (FOUC).",
        time: "منذ ساعة",
      }
    },
    {
      id: "2",
      user: { name: "سارة محمود", avatar: "" },
      time: "منذ 5 ساعات",
      question: "هل هناك فرق بين استخدام <br /> و <p> لعمل مسافة بين الفقرات؟",
      repliesCount: 1,
    }
  ];

  return (
    <div className="flex flex-col gap-6 ">
      {/* Title & Add Question & Add Comment Button */}
      <div className="flex flex-col gap-4 shrink-0">
        <div className="relative">
          {/* Have a question? Title */}
          <h1 className="font-bold text-lg md:text-xl mb-5 flex items-center gap-3">
            <span>
              <MessagesSquareIcon className="size-7 text-brand-primary" /></span>
            {t("title")}
          </h1>

          {/* Add Question Textarea */}
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder={t("add_placeholder")}
            className="w-full p-4 pr-12 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-brand-primary/20 text-slate-700 resize-none h-24 transition-all duration-300"
          />

          {/* Send Question Button */}
          <button
            className="absolute bottom-4 
            rtl:left-4 ltr:right-4 
            bg-brand-primary text-white p-2 rounded-xl 
            shadow-lg shadow-brand-primary/20 hover:scale-105 
            active:scale-95 transition-all"
            disabled={!questionText.trim()}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Add Comment Button */}
        <Button className="bg-brand-primary py-5 px-8
         rounded-[10px] hover:bg-brand-primary/90 w-fit">
          {t("add_comment_button")}
        </Button>
      </div>

      {/* Questions List */}
      <div className="flex flex-col gap-6 overflow-y-auto custom-scrollbar 
      pb-4 max-h-[450px]">

        {mockQuestions.length > 0 ? (
          mockQuestions.map((q) => (
            <QuestionItem key={q.id} {...q} />
          ))
        ) : (
          <div className="text-center py-12 text-slate-400">
            {t("no_questions")}
          </div>
        )}
      </div>
    </div>
  );
}
