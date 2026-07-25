"use client";

import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
    message?: string;
    defaultMessage?: string;
    onRetry?: () => void;
    retryLabel?: string;
    minHeight?: string;
    className?: string;
}

export const ErrorState = React.memo(function ErrorState({
    message,
    defaultMessage,
    onRetry,
    retryLabel,
    minHeight = "min-h-[40vh]",
    className,
}: ErrorStateProps) {
    const tCommon = useTranslations("Admin.common");

    const displayMessage =
        message || defaultMessage || tCommon("error_message");
    const retry = retryLabel ?? tCommon("retry");

    return (
        <div
            className={cn("max-w-7xl mx-auto py-16", className)}
            role="alert"
            aria-live="assertive"
        >
            <div
                className={cn(
                    "flex flex-col items-center justify-center gap-4",
                    minHeight,
                )}
            >
                <div className="size-16 rounded-3xl bg-red-50 flex items-center justify-center shrink-0">
                    <AlertCircle className="size-8 text-red-500" />
                </div>
                <p className="text-red-500 font-semibold text-center max-w-md">
                    {displayMessage}
                </p>
                {onRetry && (
                    <Button
                        onClick={onRetry}
                        variant="outline"
                        className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 gap-2"
                    >
                        <RefreshCw className="size-4" />
                        <span>{retry}</span>
                    </Button>
                )}
            </div>
        </div>
    );
});

ErrorState.displayName = "ErrorState";

export default ErrorState;