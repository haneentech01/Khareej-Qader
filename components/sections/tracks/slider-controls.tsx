"use client";

import { ChevronRight, ChevronLeft } from "lucide-react";

interface SliderControlsProps {
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
  isRTL: boolean;
  prevLabel: string;
  nextLabel: string;
}

/**
 * SliderControls: A pure UI component responsible only for rendering 
 * and styling the navigation buttons. Handles logical mirroring 
 * automatically based on the given locale direction.
 */
export const SliderControls = ({
  onPrev,
  onNext,
  canPrev,
  canNext,
  isRTL,
  prevLabel,
  nextLabel
}: SliderControlsProps) => {
  return (
    <>
      {/* Navigation Buttons: Logical positioning based on locale */}
      <div className={`absolute 
        ${isRTL ? "-right-3 md:-right-5 xl:-right-8" : "-left-2 md:-left-10"} 
        top-1/2 -translate-y-1/2 z-30 transition-all`}>
        <button
          onClick={onPrev}
          disabled={!canPrev}
          className={`size-9 md:size-10 xl:size-14 bg-white shadow-xl rounded-full 
          flex items-center justify-center transition-all border 
          border-slate-100 group/btn 
          ${!canPrev ? "opacity-20 cursor-not-allowed" : "text-slate-400 hover:text-brand-primary active:scale-95"}`}
          aria-label={prevLabel}
        >
          {isRTL ? <ChevronRight className="size-5 md:size-8" /> : <ChevronLeft className="size-5 md:size-8" />}
        </button>
      </div>

      {/* Physical Left in RTL, Physical Right in LTR */}
      <div className={`absolute 
        ${isRTL ? "-left-3 md:-left-5 xl:-left-8" : "-right-2 lg:-right-10"} 
        top-1/2 -translate-y-1/2 z-30 transition-all`}>
        <button
          onClick={onNext}
          disabled={!canNext}
          className={`size-9 md:size-10 xl:size-14 bg-white shadow-xl rounded-full 
          flex items-center justify-center transition-all border 
          border-slate-100 group/btn 
          ${!canNext ? "opacity-20 cursor-not-allowed" : "text-slate-400 hover:text-brand-primary active:scale-95"}`}
          aria-label={nextLabel}
        >
          {isRTL ? <ChevronLeft className="size-5 md:size-8" /> : <ChevronRight className="size-5 md:size-8" />}
        </button>
      </div>
    </>
  );
};
