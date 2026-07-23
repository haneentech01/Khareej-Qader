"use client";

import { useTranslations } from "next-intl";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { CreateCourseForm } from "./CreateCourseForm";

interface CreateCourseDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CreateCourseDialog({ isOpen, onClose }: CreateCourseDialogProps) {
    const t = useTranslations("Admin.courses");

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-lg bg-white dark:bg-slate-900 shadow-2xl p-6 sm:rounded-2xl z-50 border-0">
                <DialogHeader className="mb-4">
                    <DialogTitle className="text-xl font-bold">
                        {t("create.title")}
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                        {t("create.description_helper")}
                    </DialogDescription>
                </DialogHeader>

                <CreateCourseForm
                    onSuccess={onClose}
                    onCancel={onClose}
                />
            </DialogContent>
        </Dialog>
    );
}