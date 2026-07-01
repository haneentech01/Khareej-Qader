"use client";

import { Check, Loader2 } from "lucide-react";

type Props = {
    isLoading?: boolean;
    disabled?: boolean;
    text: string;
};

export function SubmitButton({
    isLoading = false,
    disabled = false,
    text,
}: Props) {
    return (
        <button
            type="submit"
            disabled={disabled || isLoading}
            className={`
        bg-brand-primary cursor-pointer
        hover:bg-brand-primary/90
        active:bg-brand-primary/90
        text-white font-bold
        text-sm md:text-base px-4 py-2.5 md:px-7 md:py-3.5 rounded-xl
        flex items-center justify-start w-fit
        gap-2 transition-all shadow-md shadow-emerald-50
        disabled:opacity-50
        disabled:cursor-not-allowed
        hover:shadow-lg
        active:scale-95
      `}
        >
            {isLoading ? (
                <Loader2 className="size-4.5 animate-spin" />
            ) : (
                <Check className="size-4.5 stroke-3" />
            )}

            <span>{text}</span>
        </button>
    );
}