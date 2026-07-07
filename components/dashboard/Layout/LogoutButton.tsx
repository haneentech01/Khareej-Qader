"use client";

import { LogOut, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";
import { useLogout } from "@/hooks/auth/useLogout";
import type { Role } from "@/types";

interface LogoutButtonProps {
    role: Role;
    redirectPath?: string;
    className?: string;
    inCollapsibleSidebar?: boolean;
    translationNamespace?: string;
}

export function LogoutButton({
    role,
    redirectPath,
    className,
    inCollapsibleSidebar = false,
    translationNamespace = "Dashboard.sidebar",
}: LogoutButtonProps) {
    const t = useTranslations(translationNamespace);
    const { state } = useSidebar();
    const isCollapsed = inCollapsibleSidebar && state === "collapsed";

    const { logout, loading } = useLogout({ role, redirectPath });

    return (
        <button
            type="button"
            onClick={logout}
            disabled={loading}
            aria-label={t("logout")}
            className={cn(
                // ─── base styles ───
                "flex items-center gap-3 w-full px-6 py-3 rounded-e-lg",
                "transition-all duration-300 text-red-500 hover:bg-red-50",
                "disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer",
                // ─── responsive: icon-only لما الـ sidebar يكون collapsed ───
                isCollapsed && "justify-center px-0",
                className,
            )}
        >
            <div className="shrink-0">
                {loading ? (
                    <Loader2 size={20} className="animate-spin" />
                ) : (
                    <LogOut size={20} />
                )}
            </div>

            {!isCollapsed && (
                <span className="font-semibold text-sm">
                    {loading
                        ? t("logging_out")
                        : t("logout")}
                </span>
            )}
        </button>
    );
}

export default LogoutButton;
