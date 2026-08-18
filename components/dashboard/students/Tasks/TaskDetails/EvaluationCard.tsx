"use client";

import { Star, Clock, Trophy } from "lucide-react";
import { useTranslations } from "next-intl";
import { StudentTaskSubmission } from "@/types";

interface EvaluationCardProps {
  status: "pending" | "completed";
  submission?: StudentTaskSubmission | null;
}

export function EvaluationCard({ status, submission }: EvaluationCardProps) {
  const t = useTranslations("Dashboard.TaskDetailsPage");
  const isCompleted = status === "completed";

  // Use review_notes from submission, or split it if it has newlines. Fallback to generic text.
  let points: string[] = [];
  if (submission?.review_notes) {
    points = submission.review_notes.split('\n').filter(p => p.trim() !== '');
  } else {
    try {
      points = t.raw("evaluation_points") as string[];
    } catch {
      points = [
        "عمل ممتاز في تنفيذ المتطلبات الأساسية للصفحة.",
        "تنظيم الكود جيد جداً وسهل القراءة."
      ];
    }
  }

  // Calculate stars from grade (out of 100)
  const grade = submission?.grade ?? 0;
  let starsCount = 0;
  if (grade >= 90) starsCount = 5;
  else if (grade >= 75) starsCount = 4;
  else if (grade >= 60) starsCount = 3;
  else if (grade >= 40) starsCount = 2;
  else if (grade > 0) starsCount = 1;

  return (
    <div className="bg-white rounded-2xl p-6 border border-sidebar-border shadow-sm flex flex-col gap-6 w-full">
      {/* Card Title */}
      <div className="flex items-center gap-2">
        {isCompleted ? (
          <Star className="size-5 text-brand-base" />
        ) : (
          <Star className="size-5 text-brand-orange" />
        )}
        <h4 className="font-bold text-black text-lg">
          {isCompleted ? t("evaluation_completed_title") : t("evaluation_title")}
        </h4>
      </div>

      {isCompleted ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Comments List & Trophy Banner */}
          <div className="md:border-l-2 border-gray-100 md:col-span-2 space-y-6 flex flex-col justify-between md:h-full">
            {/* Bullet Points */}
            <div className="space-y-3.5">
              {points.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="size-2 rounded-full bg-brand-base shrink-0 mt-2"></span>
                  <p className="text-brand-muted text-sm md:text-base font-bold leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>

            {/* Trophy Banner */}
            <div className="w-full md:w-150 bg-brand-light rounded-xl p-3 flex items-center justify-center gap-3">
              <div className="size-10 shadow-xs flex items-center justify-center shrink-0">
                <Trophy className="size-5 text-brand-primary" />
              </div>
              <p className="text-brand-primary font-bold text-sm md:text-base">
                {t("evaluation_trophy_text")}
              </p>
            </div>
          </div>

          {/* Rating Section (Left in RTL, Right in LTR) */}
          <div className="flex flex-col items-center justify-start gap-2.5 md:h-full">
            <span className="text-black text-lg md:text-xl font-bold uppercase tracking-wider mb-2 block">
              {t("evaluation_overall")}
            </span>
            {/* Stars */}
            <div className="flex items-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((num) => (
                <Star
                  key={num}
                  className={`size-6 ${num <= starsCount ? 'text-brand-base fill-brand-base' : 'text-gray-300 fill-transparent'}`}
                />
              ))}
            </div>
            {/* Badge */}
            <span className="bg-brand-light text-brand-primary font-bold px-5 md:px-12 py-2 rounded-lg text-sm md:text-base shadow-xs">
              {grade > 0 ? `${grade} / 100` : t("evaluation_rating_text")}
            </span>
          </div>
        </div>
      ) : (
        /* Pending Banner */
        <div className="bg-[#FEFCE8] border border-[#FEF08A] rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center gap-3">
          <div className="size-12 rounded-full bg-[#FEF3C7] flex items-center justify-center">
            <Clock className="size-6 text-brand-orange" />
          </div>
          <div className="space-y-1.5">
            <h5 className="font-bold text-brand-orange text-base md:text-lg">
              {t("evaluation_pending")}
            </h5>
            <p className="text-brand-muted/80 text-sm font-medium max-w-md">
              {t("evaluation_pending_desc")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
