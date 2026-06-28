"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useCreateTask } from "@/hooks/mentor/useCreateTask";
import { X, Loader2 } from "lucide-react";
import { CreateTaskPayload } from "@/types";

interface CreateTaskDialogProps {
    /** ID الفيديو المرتبط بالمهمة */
    videoId?: number;
    /** يُستدعى عند نجاح الإنشاء (لتحديث القائمة مثلاً) */
    onSuccess?: () => void;
    /** لإغلاق الـ Dialog */
    onClose: () => void;
    /** هل الـ dialog مفتوح؟ */
    open: boolean;
}

const INITIAL_VALUES: Omit<CreateTaskPayload, "video_id"> = {
    title: "",
    description: "",
    dead_line: "",
    passing_grade: 80,
};

export function CreateTaskDialog({
    videoId,
    onSuccess,
    onClose,
    open,
}: CreateTaskDialogProps) {
    const t = useTranslations("Mentor.CreateTask");
    const { loading, createTask } = useCreateTask();

    const [form, setForm] = useState(INITIAL_VALUES);
    const [error, setError] = useState<string | null>(null);

    // ─── Handlers ──────────────────────────────
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === "passing_grade" ? Number(value) : value,
        }));
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!form.title.trim()) {
            setError(t("error_title_required", { defaultValue: "عنوان المهمة مطلوب" }));
            return;
        }

        const payload: CreateTaskPayload = {
            video_id: videoId ?? 0,
            title: form.title.trim(),
            description: form.description.trim(),
            dead_line: form.dead_line,
            passing_grade: form.passing_grade,
        };

        const result = await createTask(payload);

        if (result.success) {
            setForm(INITIAL_VALUES);
            onSuccess?.();
            onClose();
        } else {
            setError(result.message || t("error_generic", { defaultValue: "حدث خطأ" }));
        }
    };

    // ─── Render ───────────────────────────────
    if (!open) return null;

    const inputClass =
        "w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-black " +
        "focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary " +
        "placeholder:text-slate-400 transition-all";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Dialog */}
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 p-6 animate-in fade-in zoom-in-95">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-black">
                        {t("title", { defaultValue: "إضافة مهمة جديدة" })}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                        <X className="size-5 text-slate-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* عنوان المهمة */}
                    <div>
                        <label className="block text-sm font-bold text-black mb-2">
                            {t("label_title", { defaultValue: "عنوان المهمة" })}
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder={t("placeholder_title", { defaultValue: "مثال: Build Authentication API" })}
                            className={inputClass}
                        />
                    </div>

                    {/* وصف المهمة */}
                    <div>
                        <label className="block text-sm font-bold text-black mb-2">
                            {t("label_description", { defaultValue: "وصف المهمة" })}
                        </label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder={t("placeholder_description", { defaultValue: "اشرح المطلوب من الطالب..." })}
                            rows={3}
                            className={inputClass + " resize-none"}
                        />
                    </div>

                    {/* تاريخ التسليم + الدرجة العظمى */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-black mb-2">
                                {t("label_deadline", { defaultValue: "موعد التسليم" })}
                            </label>
                            <input
                                type="date"
                                name="dead_line"
                                value={form.dead_line}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-black mb-2">
                                {t("label_grade", { defaultValue: "الدرجة العظمى" })}
                            </label>
                            <input
                                type="number"
                                name="passing_grade"
                                value={form.passing_grade}
                                onChange={handleChange}
                                min={0}
                                max={100}
                                className={inputClass}
                            />
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-dark/80 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading && <Loader2 className="size-5 animate-spin" />}
                            {loading
                                ? t("btn_loading", { defaultValue: "جاري الإضافة..." })
                                : t("btn_submit", { defaultValue: "إضافة المهمة" })}
                        </button>

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all"
                        >
                            {t("btn_cancel", { defaultValue: "إلغاء" })}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}