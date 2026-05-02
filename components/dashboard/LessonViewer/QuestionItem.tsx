"use client";

import React from "react";
import { MessageSquare, ThumbsUp } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface QuestionItemProps {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  time: string;
  question: string;
  repliesCount: number;
  trainerReply?: {
    name: string;
    avatar: string;
    text: string;
    time: string;
  };
}

export function QuestionItem({ user, time, question, repliesCount, trainerReply }: QuestionItemProps) {
  const t = useTranslations("Dashboard.LessonViewer.questions");

  return (
    <div className="flex flex-col gap-4 p-5 rounded-4xl bg-[#F2F7F6] border border-slate-50 hover:border-slate-100 transition-all duration-300 shadow-sm">
      {/* Question Header & Body */}
      <div className="flex gap-4">
        <div className="shrink-0">
          <div className="w-10 h-10 rounded-full bg-brand-primary/20 relative overflow-hidden">
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-brand-muted font-bold">
                {user.name.charAt(0)}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <div className="flex flex-col items-start gap-0.5">
            <span className="font-bold text-sm text-black">
              {user.name}
            </span>
            <span className="text-xs text-brand-muted">
              {time}
            </span>
          </div>

          <p className="text-black text-sm md:text-base leading-relaxed">
            {question}
          </p>

          <div className="flex items-center gap-4 mt-2">
            <button className="flex items-center gap-1.5 text-xs font-medium text-brand-muted hover:text-brand-primary transition-colors">
              <MessageSquare className="w-4 h-4" />
              {t("replies", { count: repliesCount })}
            </button>
            <button className="flex items-center gap-1.5 text-xs font-medium text-brand-muted hover:text-brand-primary transition-colors">
              <ThumbsUp className="w-4 h-4" />
              0
            </button>
          </div>
        </div>
      </div>

      {/* Trainer Reply (Inside the same box) */}
      {trainerReply && (
        <div className="mt-2 mr-8 ltr:ml-8 flex gap-3 p-5 rounded-3xl bg-white border border-brand-primary/10 border-s-4 border-s-brand-primary relative">
          <span className="absolute -top-2 rtl:right-6 ltr:left-6 px-3 py-0.5 rounded-full bg-brand-primary text-white text-[10px] font-bold uppercase tracking-wider">
            {t("trainer_reply_badge")}
          </span>

          <div className="shrink-0">
            <div className="w-8 h-8 rounded-full bg-brand-primary/20 relative overflow-hidden border border-brand-primary/30">
              {trainerReply.avatar ? (
                <Image
                  src={trainerReply.avatar}
                  alt={trainerReply.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-brand-primary font-bold text-xs">
                  {trainerReply.name.charAt(0)}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1 flex-1">
            <div className="flex flex-col items-start gap-0.5">
              <span className="font-bold text-brand-base text-sm">
                {trainerReply.name}
              </span>
              <span className="text-[10px] text-slate-400">
                {trainerReply.time}
              </span>
            </div>
            <p className="text-sm md:text-base text-black leading-relaxed">
              {trainerReply.text}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
