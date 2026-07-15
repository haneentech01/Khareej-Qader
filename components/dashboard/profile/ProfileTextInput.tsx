"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";

interface ProfileTextInputProps<T extends string = string>
    extends React.ComponentProps<typeof Input> {
    className?: string;
    icon?: React.ReactNode;
    field?: string;
    value?: string;
    onValueChange?: (field: string, value: string) => void;
}


export function ProfileTextInput({
    className,
    icon,
    field,
    value,
    onValueChange,
    onChange,
    ...props
}: ProfileTextInputProps) {

    const locale = useLocale();
    const isRtl = locale === "ar";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onValueChange && field) {
            onValueChange(field, e.target.value);
        } else if (onChange) {
            onChange(e);
        }
    };

    return (
        <div className="relative">
            <Input
                {...props}
                className={cn(
                    "h-12 rounded-xl border-brand-outline",
                    "focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none",
                    className
                )}
                value={value}
                onChange={handleChange}
            />
            {icon
                ? isRtl
                    ? <div className="absolute right-3 top-1/2 -translate-y-1/2">{icon}</div>
                    : <div className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</div>
                : null}
        </div>
    );
}