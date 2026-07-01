"use client";

import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

type Props = {
    rating: number;
    setRating: (value: number) => void;
    t: (key: string) => string;
};

const RATING_META = (t: (key: string) => string) => [
    { value: 1, label: t("rating.POOR") },
    { value: 2, label: t("rating.FAIR") },
    { value: 3, label: t("rating.GOOD") },
    { value: 4, label: t("rating.VERY_GOOD") },
    { value: 5, label: t("rating.EXCELLENT") },
] as const;

const getRatingLabel = (rating: number, t: (key: string) => string) =>
    RATING_META(t).find((r) => r.value === rating)?.label ?? "";

const getRatingColor = (rating: number) => {
    if (rating <= 2) return "text-light-red bg-red-bg";
    if (rating === 3) return "text-brand-orange bg-brand-light-orange";
    return "text-brand-primary bg-brand-light";
};

export function RatingStars({
    rating,
    setRating,
    t
}: Props) {
    return (
        <div className="flex items-center gap-3">
            <Rating
                style={{ maxWidth: 140 }}
                value={rating}
                onChange={setRating}
            />

            <span className={`text-sm font-bold px-5 py-1.5 rounded-lg ${getRatingColor(rating)}`}>
                {getRatingLabel(rating, t)} ({rating}/5)
            </span>
        </div>
    );
}