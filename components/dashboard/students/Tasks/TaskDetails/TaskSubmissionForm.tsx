"use client";

import React, { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Upload, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TaskSubmissionFormProps {
    taskId: string;
    onSubmit: (taskId: string, file: File) => Promise<boolean>;
    isSubmitting: boolean;
    submitError: string | null;
    onResetState: () => void;
}

export function TaskSubmissionForm({
    taskId,
    onSubmit,
    isSubmitting,
    submitError,
    onResetState,
}: TaskSubmissionFormProps) {
    const t = useTranslations("Dashboard.TaskDetailsPage");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) setSelectedFile(file);

        if (showSuccess || submitError) {
            setShowSuccess(false);
            onResetState();
        }
    }, [showSuccess, submitError, onResetState]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile || isSubmitting) return;

        setShowSuccess(false);
        const success = await onSubmit(taskId, selectedFile);

        if (success) {
            setShowSuccess(true);
            setSelectedFile(null);
        }
    };

    return (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8">
            <h3 className="text-lg font-bold text-black mb-4">
                {t("submit_solution")}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <label className="block text-sm font-bold text-black mb-2">
                        {t("upload_file")}
                    </label>
                    <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-brand-primary transition-colors cursor-pointer">
                        <input
                            type="file"
                            accept=".pdf,.zip,.doc,.docx,.png,.jpg,.jpeg"
                            onChange={handleFileChange}
                            className="hidden"
                            id="task-file-input"
                            disabled={isSubmitting}
                        />
                        <label htmlFor="task-file-input" className="cursor-pointer block">
                            <Upload className="size-10 text-brand-primary mx-auto mb-2" />
                            <p className="text-sm text-brand-muted">
                                {selectedFile ? selectedFile.name : t("file_placeholder")}
                            </p>
                        </label>
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={!selectedFile || isSubmitting}
                    className="w-full h-12 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="size-5 animate-spin" />
                            {t("submitting")}
                        </>
                    ) : (
                        <>
                            <Upload className="size-5" />
                            {t("submit_btn")}
                        </>
                    )}
                </Button>

                {showSuccess && (
                    <div className="bg-green-50 text-green-700 text-sm font-bold px-4 py-3 rounded-xl border border-green-200 flex items-center gap-2 animate-in fade-in duration-300">
                        <CheckCircle2 className="size-4 shrink-0" />
                        {t("submit_success")}
                    </div>
                )}
                {submitError && (
                    <div className="bg-red-50 text-red-700 text-sm font-bold px-4 py-3 rounded-xl border border-red-200 flex items-center gap-2 animate-in fade-in duration-300">
                        <AlertCircle className="size-4 shrink-0" />
                        {submitError}
                    </div>
                )}
            </form>
        </div>
    );
}