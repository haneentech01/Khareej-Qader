"use client";

import { useTranslations } from "next-intl";
import { ArrowLeft, Loader2, LucideIcon } from "lucide-react";
import { Link } from "@/i18n/routing";

interface Props {
    statsCards: {
        key: string;
        label: string;
        value: number;
        href: string;
        icon: LucideIcon;
        color: string;
    }[];
    loading: boolean;
}

export default function DashboardStats({ statsCards, loading }: Props) {
    const t = useTranslations("Admin.dashboard");

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {statsCards.map((card) => {
                const Icon = card.icon;

                return (
                    <Link
                        key={card.key}
                        href={card.href}
                        className="
                          bg-white border border-slate-100
                          py-6 px-10 rounded-3xl gap-3
                          flex flex-col items-center justify-between
                          shadow-[0_4px_20px_rgba(0,0,0,0.015)]
                          transition-all duration-300
                          hover:-translate-y-1 hover:shadow-md
                        "
                    >
                        <div className="flex items-end gap-3">
                            <div
                                className={`size-10 rounded-2xl flex items-center justify-center bg-${card.color}-50`}
                            >
                                <Icon className={`size-5 text-${card.color}-600`} />
                            </div>
                            <span className="text-brand-muted text-xl block mb-2" >
                                {card.label}
                            </span>
                        </div>


                        {loading ? (
                            <Loader2 className="size-8 animate-spin text-slate-300" />
                        ) : (
                            <span className="text-black font-extrabold text-2xl md:text-3xl block tracking-tight">
                                {card.value.toLocaleString()}
                            </span>
                        )}

                        <div className="flex items-center gap-2">
                            <p className="text-xs text-brand-muted">
                                {t("view_all")}
                            </p>
                            <ArrowLeft className="text-brand-primary" />
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
