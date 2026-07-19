"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Star, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ReviewFormProps {
    grade: string;
    /** القيمة الحالية للملاحظات */
    reviewNotes: string;
    /** هل التقييم جارٍ الإرسال؟ */
    isSubmitting: boolean;
    /** خطأ من الـ API (إن وُجد) */
    error: string | null;
    /** هل يجب عرض رسالة النجاح؟ */
    showSuccess: boolean;
    /** رسالة النجاح من الـ backend */
    successMessage: string | null;

    // ─── Handlers ────────────────────────────────────────────────────────────
    onGradeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onNotesChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
}

/**
 * ReviewForm — Presentational Component.
 *
 * مسؤولية واحدة (SRP): عرض نموذج إدخال الدرجة والملاحظات + رسائل الحالة.
 * لا يعرف عن الـ API أو كيفية إرسال البيانات.
 *
 * @example
 * <ReviewForm
 *   grade={formData.grade}
 *   reviewNotes={formData.reviewNotes}
 *   isSubmitting={isReviewing}
 *   error={reviewError}
 *   showSuccess={showSuccess}
 *   successMessage={successMessage}
 *   onGradeChange={handleGradeChange}
 *   onNotesChange={handleNotesChange}
 *   onSubmit={handleSubmit}
 * />
 */
export function ReviewForm({
    grade,
    reviewNotes,
    isSubmitting,
    error,
    showSuccess,
    successMessage,
    onGradeChange,
    onNotesChange,
    onSubmit,
}: ReviewFormProps) {
    const t = useTranslations("MentorSubmissions");

    return (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8">
            <h3 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
                <Star className="size-5 text-brand-primary" />
                {t("review_form_title", { defaultValue: "تقييم التسليم" })}
            </h3>

            <form onSubmit={onSubmit} className="space-y-4">
                {/* Grade Input */}
                <div>
                    <label className="block text-sm font-bold text-black mb-2">
                        {t("grade", { defaultValue: "الدرجة (من 100)" })}
                    </label>
                    <Input
                        type="number"
                        min="0"
                        max="100"
                        value={grade}
                        onChange={onGradeChange}
                        disabled={isSubmitting}
                        placeholder="0"
                        className="h-12 rounded-xl border-slate-200 focus:outline-none focus:ring-0 focus:border-slate-200"
                        required
                    />
                </div>

                {/* Review Notes Textarea */}
                <div>
                    <label className="block text-sm font-bold text-black mb-2">
                        {t("review_notes", { defaultValue: "ملاحظات المنتور" })}
                    </label>
                    <textarea
                        value={reviewNotes}
                        onChange={onNotesChange}
                        disabled={isSubmitting}
                        rows={4}
                        placeholder={t("notes_placeholder", { defaultValue: "اكتب ملاحظاتك هنا..." })}
                        className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-0 focus:border-slate-200 resize-none text-sm"
                    />
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={!grade || isSubmitting}
                    className="w-full h-12 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="size-5 animate-spin" />
                            {t("submitting", { defaultValue: "جاري التقييم..." })}
                        </>
                    ) : (
                        <>
                            <CheckCircle2 className="size-5" />
                            {t("submit_review", { defaultValue: "تأكيد التقييم" })}
                        </>
                    )}
                </Button>

                {/* Success Message */}
                {showSuccess && (
                    <div
                        role="status"
                        className="bg-green-50 text-green-700 text-sm font-bold px-4 py-3 rounded-xl border border-green-200 flex items-center gap-2 animate-in fade-in duration-300"
                    >
                        <CheckCircle2 className="size-4 shrink-0" />
                        {successMessage || t("review_success", { defaultValue: "تم تقييم التسليم بنجاح" })}
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div
                        role="alert"
                        className="bg-red-50 text-red-700 text-sm font-bold px-4 py-3 rounded-xl border border-red-200 flex items-center gap-2 animate-in fade-in duration-300"
                    >
                        <AlertCircle className="size-4 shrink-0" />
                        {error}
                    </div>
                )}
            </form>
        </div>
    );
}
