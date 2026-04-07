"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useCarousel } from "./carousel";
import { cn } from "@/lib/utils";

type CarouselDotsProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * CarouselDots
 * Custom dot indicators for the Shadcn Carousel (Embla Carousel).
 */
export function CarouselDots({ className, ...props }: CarouselDotsProps) {
  const { api } = useCarousel();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!api) return;
      api.scrollTo(index);
    },
    [api]
  );

  const onInit = useCallback((api: NonNullable<ReturnType<typeof useCarousel>["api"]>) => {
    setScrollSnaps(api.scrollSnapList());
  }, []);

  const onSelect = useCallback((api: NonNullable<ReturnType<typeof useCarousel>["api"]>) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;

    // Defer initial synchronization to the next tick to avoid synchronous setState warning
    // as Embla API values are an external system state available only after mount.
    Promise.resolve().then(() => {
      onInit(api);
      onSelect(api);
    });

    api.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);

    return () => {
      api.off("reInit", onInit).off("reInit", onSelect).off("select", onSelect);
    };
  }, [api, onInit, onSelect]);

  if (scrollSnaps.length <= 1) return null;

  return (
    <div
      className={cn("flex justify-center gap-2 mt-10", className)}
      {...props}
    >
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          onClick={() => onDotButtonClick(index)}
          type="button"
          aria-label={`Go to slide ${index + 1}`}
          className={cn(
            "h-3 rounded-full transition-all duration-300",
            index === selectedIndex
              ? "bg-brand-primary w-8"
              : "bg-slate-200 w-3"
          )}
        />
      ))}
    </div>
  );
}
