"use client";

import { useEvaluationEditor } from "@/hooks/useEvaluationEditor";
import { RichTextEditor } from "./Editor/RichTextEditor";
import { RatingStars } from "./RatingStars";
import { SubmitButton } from "./SubmitButton";
import { useState } from "react";
import { useTranslations } from "next-intl";

export function EvaluationForm() {
    const [rating, setRating] = useState<number>(4);

    const editor = useEvaluationEditor();
    const t = useTranslations("MentorSubmissions.evaluation_card");
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Evaluation Submitted:", {
            rating,
            html: editor?.getHTML(),
            text: editor?.getText(),
        });
    };

    return (
        <form onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-6 border border-sidebar-border shadow-xs flex flex-col gap-6 w-full text-right rtl:text-right ltr:text-left">

            {/* Title  + Rating Stars */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-3">
                <h4 className="font-bold text-black text-lg md:text-xl">
                    {t("title")}
                </h4>
                <RatingStars
                    rating={rating}
                    setRating={setRating}
                    t={t}
                />
            </div>

            <RichTextEditor editor={editor} />

            <SubmitButton text={t("accept_btn")} isLoading={false} />
        </form>
    );
}