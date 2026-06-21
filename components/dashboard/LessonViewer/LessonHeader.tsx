"use client";

import { useTranslations } from "next-intl";
import { PlayCircleIcon } from "lucide-react";
import { useLessonPath } from "@/providers/LessonPathProvider";
import { notFound } from "next/navigation";

interface LessonHeaderProps {
    lessonId: string;
}

export function LessonHeader({ lessonId }: LessonHeaderProps) {
    const t = useTranslations("Dashboard.LessonViewer");
    const { data } = useLessonPath();

    if (!data) return null;

    const currentVideo = data?.videos.find((v) => String(v.id) === lessonId);
    if (!currentVideo) {
        notFound();
    }

    return (
        <div className="flex flex-col items-start gap-2.5">
            <h1 className="text-3xl md:text-4xl font-bold text-black">
                {data.path.name}
            </h1>
            <p className="flex items-center gap-2">
                <PlayCircleIcon className="w-5 h-5 text-brand-primary" />
                <span className="text-brand-muted">
                    {t("subtitle", { lessonName: currentVideo.title })}
                </span>
            </p>
        </div>
    );
}