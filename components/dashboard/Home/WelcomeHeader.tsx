import React from "react";
import { useTranslations } from "next-intl";

interface HomeHeaderProps {
    userName?: string;
    subtitleMessage?: string;
    variant?: "dashboard" | "standalone";
}

export function WelcomeHeader({
    userName,
    subtitleMessage,
    variant = "dashboard",
}: HomeHeaderProps) {
    const t = useTranslations("Dashboard.WelcomeHeader");
    const isStandalone = variant === "standalone";

    return (
        <div className={isStandalone ? "" : "mb-10"}>
            {!isStandalone && userName && (
                <>
                    <div className="flex items-center mb-2">
                        {/* title */}
                        <h1 className="text-3xl lg:text-4xl font-bold text-black">
                            {t("welcome", { name: userName })}
                        </h1>
                    </div>

                    {/* subtitle */}
                    <p className="text-brand-muted lg:text-lg mb-8">
                        {subtitleMessage || t("subtitle")}
                    </p>
                </>
            )
            }
        </div>
    );
}

