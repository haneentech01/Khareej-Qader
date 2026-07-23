"use client";

import { motion } from "framer-motion";
import { Briefcase, CheckCircle2, GraduationCap } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { Role } from "@/types";
import { cn } from "@/lib/utils";

interface RoleTabsProps {
    currentRole: Role;
    highlightedRole: Role | null;
}

export function RoleTabs({
    currentRole,
    highlightedRole,
}: RoleTabsProps) {
    const t = useTranslations("Auth");
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleRoleChange = (role: Role) => {
        if (role === currentRole) return;

        const params = new URLSearchParams(
            searchParams.toString()
        );

        params.set("role", role);

        router.replace(`/login?${params.toString()}`);
    };

    const tabs = [
        {
            role: "student" as Role,
            label: t("role_student"),
            desc: t("role_student_desc"),
            icon: GraduationCap,
        },
        {
            role: "mentor" as Role,
            label: t("role_mentor"),
            desc: t("role_mentor_desc"),
            icon: Briefcase,
        },
    ];

    return (
        <div className="grid grid-cols-2 gap-3 mb-8">
            {tabs.map((tab) => {
                const Icon = tab.icon;

                const isActive =
                    currentRole === tab.role;

                const isHighlighted =
                    highlightedRole === tab.role;

                return (
                    <motion.button
                        key={tab.role}
                        type="button"
                        onClick={() => handleRoleChange(tab.role)}
                        initial={isHighlighted
                            ? { scale: 0.95 }
                            : false
                        }
                        animate={isHighlighted
                            ? { scale: 1 }
                            : undefined
                        }
                        transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                        className={cn(
                            "relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200",

                            isActive
                                ? "border-brand-primary bg-brand-primary/5 text-brand-primary"
                                : "border-gray-200 text-gray-500 hover:border-brand-primary/40 hover:bg-gray-50",

                            isHighlighted &&
                            "ring-2 ring-brand-primary/20 ring-offset-2 shadow-lg shadow-brand-primary/10"
                        )}
                    >
                        <Icon
                            className={cn(
                                "size-6",
                                isActive
                                    ? "text-brand-primary"
                                    : "text-gray-400"
                            )}
                        />

                        <span
                            className={cn(
                                "text-sm font-bold",
                                isActive
                                    ? "text-brand-primary"
                                    : "text-gray-700"
                            )}
                        >
                            {tab.label}
                        </span>

                        <span className="text-[10px] text-center text-gray-400 leading-tight">
                            {tab.desc}
                        </span>

                        {isHighlighted && (
                            <motion.div
                                initial={{ scale: 0, rotate: -90 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                                className="absolute -top-2 -inset-e-2
                                size-6 rounded-full bg-green-500 text-white
                                flex items-center justify-center shadow-md"
                            >
                                <CheckCircle2 className="size-4" />
                            </motion.div>
                        )}
                    </motion.button>
                );
            })}
        </div>
    );
}