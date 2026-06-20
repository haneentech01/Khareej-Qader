"use client";

import { useTranslations } from "next-intl";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { useLessonPath } from "@/providers/LessonPathProvider";


interface LessonBreadcrumbsProps {
    locale: string;
}

export function LessonBreadcrumbs({ locale }: LessonBreadcrumbsProps) {
    const t = useTranslations("Dashboard.LessonViewer");
    const { data } = useLessonPath();

    const pathName =
        data && typeof data === "object"
            ? data.path.name
            : t("breadcrumb_lesson");

    const breadcrumbItems = [
        { label: t("breadcrumb_home"), href: "/dashboard" },
        { label: t("breadcrumb_track"), href: "/dashboard/my-track" },
        { label: pathName },
    ];

    return <Breadcrumbs items={breadcrumbItems} locale={locale} />;
}