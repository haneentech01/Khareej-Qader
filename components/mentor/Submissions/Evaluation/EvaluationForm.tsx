// "use client";

// import { useEvaluationEditor } from "@/hooks/useEvaluationEditor";
// import { RichTextEditor } from "./Editor/RichTextEditor";
// import { RatingStars } from "./RatingStars";
// import { SubmitButton } from "./SubmitButton";
// import { useState } from "react";
// import { useTranslations } from "next-intl";

// export function EvaluationForm() {
//     const [rating, setRating] = useState<number>(4);

//     const editor = useEvaluationEditor();
//     const t = useTranslations("MentorSubmissions.evaluation_card");
//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         console.log("Evaluation Submitted:", {
//             rating,
//             html: editor?.getHTML(),
//             text: editor?.getText(),
//         });
//     };

//     return (
//         <form onSubmit={handleSubmit}
//             className="bg-white rounded-3xl p-6 border border-sidebar-border shadow-xs flex flex-col gap-6 w-full text-right rtl:text-right ltr:text-left">

//             {/* Title  + Rating Stars */}
//             <div className="flex flex-col md:flex-row justify-between items-center gap-3">
//                 <h4 className="font-bold text-black text-lg md:text-xl">
//                     {t("title")}
//                 </h4>
//                 <RatingStars
//                     rating={rating}
//                     setRating={setRating}
//                     t={t}
//                 />
//             </div>

//             <RichTextEditor editor={editor} />

//             <SubmitButton text={t("accept_btn")} isLoading={false} />
//         </form>
//     );
// }


"use client";

import { useEvaluationEditor } from "@/hooks/useEvaluationEditor";
import { RichTextEditor } from "./Editor/RichTextEditor";
import { RatingStars } from "./RatingStars";
import { SubmitButton } from "./SubmitButton";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useReviewSubmission } from "@/hooks/mentor/useReviewSubmission";

/**
 * نموذج تقييم تسليم طالب.
 *
 * المسار:
 *   /mentor/submissions/[submissionId]  →  EvaluationForm
 *
 * الـ flow:
 *  1) المنتور يختار درجة (1..5 نجوم) + يكتب ملاحظات نصية في الـ RichTextEditor.
 *  2) عند الضغط على "قبول المهمة" نحوّل الـ rating إلى grade من 100:
 *       grade = rating * 20   (1★=20, 2★=40, 3★=60, 4★=80, 5★=100)
 *     ونرسل PATCH /tasks/submissions/{id}/review بـ { grade, review_notes }.
 *  3) نعرض رسالة نجاح/خطأ بجانب الزر، ونعطّل الزر أثناء الإرسال.
 *
 * قراءة الـ submissionId:
 *  - الصفحة الحالية app/[locale]/mentor/submissions/[submissionId]/page.tsx
 *    هي server component، لذا لا تمرّر الـ param تلقائياً لـ EvaluationForm.
 *  - الحل الأبسط: نقرأ الـ id من `window.location.pathname` لأن الـ component
 *    هو client component أصلاً، وهذا يتجنّب الحاجة لتعديل الـ page.tsx
 *    وتمرير الـ prop عبر شجرة المكوّنات.
 *  - البديل الأنظف (لو حابة تعمليه لاحقاً): مرّر submissionId كـ prop من
 *    الـ page.tsx إلى EvaluationForm.
 *
 * ملاحظة حول review_notes:
 *  - الـ backend يتوقع نصاً عادياً (string) في review_notes.
 *  - نرسل editor.getText() (نص خام بدون HTML) لتطابق الـ contract.
 *  - لو احتجت HTML لاحقاً، غيّري السطر إلى editor?.getHTML().
 */
export function EvaluationForm() {
    const [rating, setRating] = useState<number>(4);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const editor = useEvaluationEditor();
    const t = useTranslations("MentorSubmissions.evaluation_card");
    const tCommon = useTranslations("MentorSubmissions");

    const { reviewSubmission, loading, error } = useReviewSubmission();

    /**
     * يستخرج معرّف التسليم من URL الحالي.
     * الـ pattern المتوقع: /{locale}/mentor/submissions/{submissionId}
     * نأخذ آخر جزء من المسار ونعتبره الـ id.
     *
     * نُعيد null لو لم نستطع استخراج id (مثلاً أثناء SSR أو إذا كان المسار مختلفاً).
     */
    const getSubmissionId = (): string | null => {
        if (typeof window === "undefined") return null;
        const parts = window.location.pathname.split("/").filter(Boolean);
        // parts = [locale, "mentor", "submissions", submissionId]
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
                "[EvaluationForm] ❌ cannot determine submissionId from URL"
            );
            return;
        }

        // تحويل النجوم (1..5) إلى درجة (0..100)
        const grade = rating * 20;
        const reviewNotes = editor?.getText()?.trim() ?? "";

        if (!reviewNotes) {
            // نمنع الإرسال بدون ملاحظات — الـ backend غالباً يتطلبها
            return;
        }

        const result = await reviewSubmission(submissionId, {
            grade,
            review_notes: reviewNotes,
        });

        if (result.success) {
            // نحاول قراءة رسالة النجاح من ملف الترجمة، وإن لم تكن موجودة
            // نستخدم رسالة افتراضية عربية (تفادي الاعتماد على وجود المفتاح).
            try {
                setSuccessMessage(tCommon("review.success"));
            } catch {
                setSuccessMessage("تم حفظ التقييم بنجاح");
            }
        }
    };

    const isSubmitDisabled = !editor?.getText()?.trim();

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

            <RichTextEditor editor={editor} />

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
