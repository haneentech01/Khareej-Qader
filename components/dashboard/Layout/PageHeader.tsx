import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    icon?: ReactNode;
    className?: string;
}

export function PageHeader({ title, subtitle, icon, className }: PageHeaderProps) {
    return (
        <div className={cn("flex flex-col gap-3.5", className)}>
            <div className={cn("flex items-start gap-3", icon && "items-center")}>
                {icon && <div className="shrink-0">
                    {icon}
                </div>
                }
                <h1 className="text-3xl md:text-4xl font-bold text-black">
                    {title}
                </h1>
            </div>

            {subtitle && (
                <p className="text-brand-muted text-lg">
                    {subtitle}
                </p>
            )}
        </div>
    );
}