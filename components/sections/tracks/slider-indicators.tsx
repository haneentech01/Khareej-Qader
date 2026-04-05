"use client";

import React from "react";

interface SliderIndicatorsProps {
  total: number;
  currentIndex: number;
  maxIndexValue: number;
  onJumpToIndex: (index: number) => void;
  ariaLabelTemplate: string;
}

/**
 * SliderIndicators: A pure presentation component for the pagination dots.
 * Logic for which dots to show is handled by the parent, keeping this 
 * component strictly focused on UI.
 */
export const SliderIndicators = ({ 
  total, 
  currentIndex, 
  maxIndexValue,
  onJumpToIndex,
  ariaLabelTemplate
}: SliderIndicatorsProps) => {
  return (
    <div className="flex justify-center gap-2 mt-12">
      {[...Array(total)].map((_, i) => {
        // Only show dots for possible slide positions
        if (i > maxIndexValue) return null;
        return (
          <button
            key={i}
            onClick={() => onJumpToIndex(i)}
            className={`size-3 rounded-full transition-all duration-300 
              ${i === currentIndex ? "bg-brand-primary w-8" : "bg-slate-200 w-3"}`}
            aria-label={ariaLabelTemplate.replace("[index]", (i + 1).toString())}
          />
        );
      })}
    </div>
  );
};
