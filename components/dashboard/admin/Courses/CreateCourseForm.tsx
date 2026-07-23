"use client";

import { useTranslations } from "next-intl";
import { Loader2, Plus, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateCourseForm } from "@/hooks/admin/useCreateCourseForm";

interface CreateCourseFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export function CreateCourseForm({ onSuccess, onCancel }: CreateCourseFormProps) {
    const t = useTranslations("Admin.courses");

    const {
        form,
        error,
        loading,
        handleChange,
        handleSubmit
    } = useCreateCourseForm({ onSuccess });

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div className="space-y-2">
                <label htmlFor="course-name" className="text-sm font-bold block text-slate-800">
                    {t("create.name")} <span className="text-red-500">*</span>
                </label>
                <Input
                    id="course-name"
                    name="name"
                    placeholder="e.g. CSS Basics"
                    value={form.name}
                    onChange={handleChange}
                    disabled={loading}
                    className="h-11 focus:outline-none focus:ring-0 focus-visible:ring-0
                     focus-visible:ring-offset-0 focus:border-slate-200 active:ring-0 
                     active:outline-none"
                    required
                />
            </div>

            {/* Description Field */}
            <div className="space-y-2">
                <label htmlFor="course-description" className="text-sm font-bold block text-slate-800">
                    {t("create.description")} <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="course-description"
                    name="description"
                    rows={4}
                    className="h-20 w-full rounded-xl border border-slate-200 p-3 text-sm focus:outline-none focus:ring-0 focus-visible:ring-0
                     focus-visible:ring-offset-0 focus:border-slate-200 active:ring-0 
                     active:outline-none"
                    placeholder="Learn the basics of CSS..."
                    value={form.description}
                    onChange={handleChange}
                    disabled={loading}
                    required
                />
            </div>

            {/* Price Field */}
            <div className="space-y-2">
                <label htmlFor="course-price" className="text-sm font-bold block text-slate-800">
                    {t("create.price")}
                </label>
                <Input
                    id="course-price"
                    name="price"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={form.price}
                    onChange={handleChange}
                    className="h-11 focus:outline-none focus:ring-0 focus-visible:ring-0
                     focus-visible:ring-offset-0 focus:border-slate-200 active:ring-0 
                     active:outline-none"
                    disabled={loading}
                />
            </div>

            {/* YouTube URL Field */}
            <div className="space-y-2">
                <label htmlFor="course-youtube" className="text-sm font-bold block text-slate-800">
                    {t("create.youtube_playlist_url")}
                </label>
                <Input
                    id="course-youtube"
                    name="youtube_playlist_url"
                    type="url"
                    placeholder="https://youtube.com/playlist?list=..."
                    value={form.youtube_playlist_url}
                    onChange={handleChange}
                    disabled={loading}
                    className="h-11 focus:outline-none focus:ring-0 focus-visible:ring-0
                     focus-visible:ring-offset-0 focus:border-slate-200 active:ring-0 
                     active:outline-none"
                />
            </div>

            {/* Error Message */}
            {error && (
                <div className="rounded-xl bg-red-50 p-3 flex items-center gap-2 text-sm text-red-700 font-medium border border-red-100">
                    <AlertCircle className="size-4 shrink-0" />
                    <p>{error}</p>
                </div>
            )}

            {/* Actions / Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={loading}
                    className="min-w-[100px]"
                >
                    <X className="size-4 mr-2 rtl:ml-2 rtl:mr-0" />
                    {t("delete.cancel")}
                </Button>

                <Button
                    type="submit"
                    disabled={loading}
                    className="bg-brand-primary hover:bg-brand-primary/90 text-white min-w-[120px]"
                >
                    {loading ? (
                        <Loader2 className="size-4 animate-spin mr-2 rtl:ml-2 rtl:mr-0" />
                    ) : (
                        <Plus className="size-4 mr-2 rtl:ml-2 rtl:mr-0" />
                    )}
                    {loading ? t("create.submitting") : t("create.submit")}
                </Button>
            </div>
        </form>
    );
}