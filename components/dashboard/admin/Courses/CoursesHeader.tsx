"use client";

import { Plus, BookOpen } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

interface Props {
    onCreate: () => void;
}

export function CoursesHeader({ onCreate }: Props) {
    const t = useTranslations("Admin.courses");

    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="flex items-center gap-2 text-2xl font-extrabold">
                    <BookOpen className="size-7 text-brand-primary" />
                    {t("title")}
                </h1>

                <p className="text-sm text-brand-muted mt-1">
                    {t("subtitle")}
                </p>
            </div>

            <Button
                onClick={onCreate}
                className="bg-brand-primary text-white"
            >
                <Plus className="size-4" />
                {t("create_button")}
            </Button>
        </div>
    );
}