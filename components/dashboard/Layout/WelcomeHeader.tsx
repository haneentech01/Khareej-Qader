import { useTranslations } from "next-intl";
import type { LucideIcon } from "lucide-react";
import { Code2 } from "lucide-react";

export interface TrackInfo {
    label?: string;
    name?: string | string[];
    icon?: LucideIcon;
}

interface WelcomeHeaderProps {
    userName?: string;
    subtitleMessage?: string;
    variant?: "dashboard" | "standalone";
    trackInfo?: TrackInfo;
}

function TrackInfoBox({ info }: { info: TrackInfo }) {
    const Icon = info.icon ?? Code2;
    if (!info.name && !info.label) {
        return null;
    }

    return (
        <div
            className="flex items-center gap-3 bg-white border border-sidebar-border p-3.5 rounded-2xl shrink-0 w-full sm:w-auto justify-end sm:justify-start"
            role="status"
            aria-label={info.label}
        >
            <div className="space-y-1 text-right rtl:text-right ltr:text-left">
                {info.label && (
                    <span className="text-brand-primary text-xs block leading-none">
                        {info.label}
                    </span>
                )}
                {info.name && (
                    <span className="text-black font-bold text-sm md:text-base block">
                        {info.name}
                    </span>
                )}
            </div>

            <div className="size-12 rounded-2xl bg-brand-light-green flex items-center justify-center shrink-0">
                <Icon className="size-6 text-brand-primary" />
            </div>
        </div>
    );
}

export function WelcomeHeader({
    userName,
    subtitleMessage,
    variant = "dashboard",
    trackInfo,
}: WelcomeHeaderProps) {
    const t = useTranslations("Dashboard.WelcomeHeader");
    const isStandalone = variant === "standalone";

    if (isStandalone) {
        return null;
    }

    if (!userName && !trackInfo) {
        return null;
    }

    return (
        <div
            className={
                trackInfo
                    ? "mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
                    : "mb-10"
            }
        >
            {/* ─── welcome + subtitle ─── */}
            {userName && (
                <div className="space-y-2">
                    <div className="flex items-center">
                        <h1 className="text-3xl lg:text-4xl font-bold text-black">
                            {t("welcome", { name: userName })}
                        </h1>
                    </div>
                    <p className="text-brand-muted lg:text-lg">
                        {subtitleMessage || t("subtitle")}
                    </p>
                </div>
            )}

            {/* ─── بوكس "المسار التعليمي" ─── */}
            {trackInfo && <TrackInfoBox info={trackInfo} />}
        </div>
    );
}

export default WelcomeHeader;


