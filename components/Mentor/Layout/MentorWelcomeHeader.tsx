"use client";

import { useTranslations } from "next-intl";
import { Code2 } from "lucide-react";
import { useMentorProfile } from "@/hooks/mentor/useMentorProfile";

/**
 * ترويسة الترحيب في صفحة /mentor.
 *
 * تعرض اسم المنتور الحقيقي المجلوب من /mentor/auth/me.
 *
 * حالات العرض:
 *  - loading: نعرض "..." مؤقتاً
 *  - success: نعرض اسم المنتور الحقيقي
 *  - error (401): الـ interceptor هيرجّع المستخدم لـ /login تلقائياً،
 *    فهنا مش هنوصل لهذه الحالة عملياً، بس نعرض "..." عشان ما يظهرش فراغ
 *
 * فصلنا هذا الجزء في client component لأن الـ page الأب server component
 * ولا يمكنه استدعاء useMentorProfile (client hook) مباشرة.
 */
export function MentorWelcomeHeader() {
    const t = useTranslations("MentorDashboard");
    const { mentor, loading } = useMentorProfile();

    // fallback: لو الـ request لسه شغّال نعرض "..."
    // لو فشل (401)، الـ interceptor هيرجّع المستخدم لـ /login تلقائياً
    // لو رجع null (نادر)، نعرض "..." عشان ما يظهرش فراغ
    const displayName = mentor?.name || (loading ? "..." : "...");

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 p-6">
            <div className="space-y-1.5 text-right rtl:text-right ltr:text-left">
                <h1 className="text-2xl md:text-3xl font-bold text-black">
                    {t("header.welcome", { name: displayName })}
                </h1>
                <p className="text-brand-muted text-sm md:text-base">
                    {t("header.subtitle")}
                </p>
            </div>

            {/* Educational Track Info Box */}
            <div className="flex items-center gap-3 bg-white border border-sidebar-border p-3.5 rounded-2xl shrink-0 w-full sm:w-auto justify-end sm:justify-start">
                <div className="space-y-1 text-right rtl:text-right ltr:text-left">
                    <span className="text-brand-primary text-xs block leading-none">
                        {t("header.track_label")}
                    </span>
                    <span className="text-black font-bold text-sm md:text-base block">
                        {t("header.track_name")}
                    </span>
                </div>
                <div className="size-12 rounded-2xl bg-brand-light-green flex items-center justify-center shrink-0">
                    <Code2 className="size-6 text-brand-primary" />
                </div>
            </div>
        </div>
    );
}

