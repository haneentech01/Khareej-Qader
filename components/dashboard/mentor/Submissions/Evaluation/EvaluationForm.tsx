
"use client";

import { RatingStars } from "./RatingStars";
import { SubmitButton } from "./SubmitButton";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useReviewSubmission } from "@/hooks/mentor/submissions/useReviewSubmission";

export function EvaluationForm() {
    const [rating, setRating] = useState<number>(4);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const [reviewNotes, setReviewNotes] = useState("");
    const t = useTranslations("MentorSubmissions.evaluation_card");
    const tCommon = useTranslations("MentorSubmissions");

    const { reviewSubmission, loading, error } = useReviewSubmission();

    const getSubmissionId = (): string | null => {
        if (typeof window === "undefined") return null;
        const parts = window.location.pathname.split("/").filter(Boolean);
        const submissionsIdx = parts.findIndex((p) => p === "submissions");
        if (submissionsIdx === -1) return null;
        const id = parts[submissionsIdx + 1];
        return id ?? null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMessage(null);

        const submissionId = getSubmissionId();
        if (!submissionId) {
            // لم نستطع تحديد التسليم — لا يمكننا الإرسال
            console.error(
                "[EvaluationForm] cannot determine submissionId from URL"
            );
            return;
        }

        // تحويل النجوم (1..5) إلى درجة (0..100)
        const grade = rating * 20;
        if (!reviewNotes.trim()) {
            return;
        }

        const result = await reviewSubmission(submissionId, {
            grade,
            review_notes: reviewNotes,
        });

        if (result.success) {
            try {
                setSuccessMessage(tCommon("review.success"));
            } catch {
                setSuccessMessage("تم حفظ التقييم بنجاح");
            }
        }
    };

    const isSubmitDisabled = !reviewNotes.trim();

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-6 border border-sidebar-border shadow-xs flex flex-col gap-6 w-full text-right rtl:text-right ltr:text-left"
        >
            {/* Title + Rating Stars */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-3">
                <h4 className="font-bold text-black text-lg md:text-xl">
                    {t("title")}
                </h4>
                <RatingStars
                    rating={rating}
                    setRating={setRating}
                    t={t}
                />
            </div>

            <textarea
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                placeholder={t("placeholder") ?? "اكتب تقييمك هنا..."}
                className="w-full min-h-[150px] p-4 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary resize-y"
            />

            {/* رسالة النجاح */}
            {successMessage && (
                <div
                    role="status"
                    className="bg-brand-light text-brand-base text-sm font-bold px-4 py-3 rounded-xl border border-[#A7F3D0]/60"
                >
                    {successMessage}
                </div>
            )}

            {/* رسالة الخطأ */}
            {error && (
                <div
                    role="alert"
                    className="bg-red-50 text-red-700 text-sm font-bold px-4 py-3 rounded-xl border border-red-200"
                >
                    {error}
                </div>
            )}

            <SubmitButton
                text={t("accept_btn")}
                isLoading={loading}
                disabled={isSubmitDisabled}
            />
        </form>
    );
}
