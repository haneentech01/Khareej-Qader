"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Star, Check, Bold, Italic, Link2, List } from "lucide-react";

export function EvaluationForm() {
  const t = useTranslations("MentorSubmissions.evaluation_card");

  const [rating, setRating] = useState(4);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const defaultFeedback =
    "عمل ممتاز، تم تنفيذ المتطلبات الأساسية بشكل جيد جداً!\n\nبعض الملاحظات لتحسين العمل:\n- حاول إضافة تأثير عند المرور على عناصر القائمة.\n- انتبه للتنسيق في قسم الـ footer.";

  const [feedbackText, setFeedbackText] = useState(defaultFeedback);

  // Dynamic Rating Labels
  const getRatingLabel = (stars: number) => {
    switch (stars) {
      case 5:
        return "ممتاز";
      case 4:
        return "جيد جداً";
      case 3:
        return "جيد";
      case 2:
        return "مقبول";
      case 1:
        return "ضعيف";
      default:
        return "";
    }
  };

  const handleStarClick = (idx: number) => {
    setRating(idx);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Evaluation Submitted:", { rating, feedbackText });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-[20px] p-6 md:p-8 border border-sidebar-border shadow-xs flex flex-col gap-6 w-full text-right rtl:text-right ltr:text-left"
    >
      {/* Title + Star Rating Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-50 pb-4">
        <h4 className="font-extrabold text-black text-lg">
          {t("title")}
        </h4>

        {/* Star Rating Selector */}
        <div className="flex items-center gap-3 direction-ltr flex-row-reverse sm:flex-row">
          {/* Label Badge */}
          <span className="bg-[#E8FDF2] text-[#22b48d] text-xs font-extrabold px-3 py-1.5 rounded-xl border border-[#A7F3D0]/30 shadow-2xs shrink-0">
            {getRatingLabel(hoverRating !== null ? hoverRating : rating)}
          </span>

          {/* Stars Grid */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((starIdx) => {
              const isActive = starIdx <= (hoverRating !== null ? hoverRating : rating);
              return (
                <button
                  type="button"
                  key={starIdx}
                  onClick={() => handleStarClick(starIdx)}
                  onMouseEnter={() => setHoverRating(starIdx)}
                  onMouseLeave={() => setHoverRating(null)}
                  className="cursor-pointer transition-transform hover:scale-115 active:scale-95 shrink-0"
                >
                  <Star
                    className={`size-6 transition-colors ${isActive
                      ? "text-[#22b48d] fill-[#22b48d]"
                      : "text-slate-300 hover:text-[#22b48d]"
                      }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Styled Rich Text Input Container */}
      <div className="flex flex-col border border-slate-200 rounded-2xl overflow-hidden focus-within:border-[#22b48d] focus-within:ring-2 focus-within:ring-[#22b48d]/10 transition-all">
        {/* Editor Toolbar Header */}
        <div className="bg-slate-50/70 border-b border-slate-200 px-4 py-2.5 flex items-center gap-3">
          <button
            type="button"
            className="p-1.5 hover:bg-slate-100 rounded-lg text-brand-muted hover:text-black transition-colors"
          >
            <Bold className="size-4" />
          </button>
          <button
            type="button"
            className="p-1.5 hover:bg-slate-100 rounded-lg text-brand-muted hover:text-black transition-colors"
          >
            <Italic className="size-4" />
          </button>
          <button
            type="button"
            className="p-1.5 hover:bg-slate-100 rounded-lg text-brand-muted hover:text-black transition-colors"
          >
            <Link2 className="size-4" />
          </button>
          <div className="w-px h-4 bg-slate-300 mx-1"></div>
          <button
            type="button"
            className="p-1.5 hover:bg-slate-100 rounded-lg text-brand-muted hover:text-black transition-colors"
          >
            <List className="size-4" />
          </button>
        </div>

        {/* Text Area Body */}
        <textarea
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          maxLength={1000}
          rows={6}
          placeholder={t("editor_placeholder")}
          className="w-full p-4 text-slate-800 font-medium text-sm md:text-base leading-relaxed bg-white border-0 outline-hidden resize-none focus:ring-0 focus:border-0"
        />

        {/* Characters Count */}
        <div className="bg-white px-4 py-2 border-t border-slate-50 flex justify-end text-brand-muted/70 text-xs font-bold select-none">
          {feedbackText.length} / 1000
        </div>
      </div>

      {/* Accept Button Container (Aligned to left in RTL) */}
      <div className="flex justify-start rtl:justify-start ltr:justify-end">
        <button
          type="submit"
          className="bg-[#22b48d] hover:bg-[#1f9f7d] active:bg-[#1a8b6c] text-white font-extrabold text-sm px-6 py-3 rounded-xl flex items-center gap-2 transition-all cursor-pointer hover:shadow-lg active:scale-95 shadow-md shadow-emerald-50"
        >
          <Check className="size-4.5 stroke-3" />
          {t("accept_btn")}
        </button>
      </div>
    </form>
  );
}
