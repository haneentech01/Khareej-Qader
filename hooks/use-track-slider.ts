"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface SliderMetrics {
  cardsToShow: number;
  cardWidth: number;
  gap: number;
  maxIndexValue: number;
}

/**
 * useTrackSlider: A custom hook that encapsulates the complex math 
 * and state management for a responsive carousel. Handles LTR and RTL 
 * motion coordinate systems automatically.
 */
export function useTrackSlider(totalTracks: number, isRTL: boolean) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [metrics, setMetrics] = useState<SliderMetrics>({
    cardsToShow: 1,
    cardWidth: 0,
    gap: 16,
    maxIndexValue: 0
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const updateMetrics = useCallback(() => {
    if (!containerRef.current) return;

    const width = window.innerWidth;
    let visibleItems = 1;
    let currentGap = 16;

    // Breakpoints logic (Tailwind equivalents)
    if (width >= 1280) { // xl
      visibleItems = 3;
      currentGap = 32;
    } else if (width >= 768) { // md, lg
      visibleItems = 2;
      currentGap = 32;
    } else { // sm, sx
      visibleItems = 1;
      currentGap = 16;
    }

    const containerWidth = containerRef.current.offsetWidth;
    const calculatedCardWidth = (containerWidth - (visibleItems - 1) * currentGap) / visibleItems;
    const calculatedMaxIndex = Math.max(0, totalTracks - visibleItems);

    setMetrics({
      cardsToShow: visibleItems,
      cardWidth: calculatedCardWidth,
      gap: currentGap,
      maxIndexValue: calculatedMaxIndex
    });
  }, [totalTracks]);

  // Synchronize metrics on mount and resize
  useEffect(() => {
    updateMetrics();
    window.addEventListener("resize", updateMetrics);
    return () => window.removeEventListener("resize", updateMetrics);
  }, [updateMetrics]);

  // Ensure index bounds are respected during layout changes
  useEffect(() => {
    if (currentIndex > metrics.maxIndexValue) {
      setCurrentIndex(metrics.maxIndexValue);
    }
  }, [metrics.maxIndexValue, currentIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < metrics.maxIndexValue ? prev + 1 : prev));
  }, [metrics.maxIndexValue]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const jumpToIndex = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const handleDragEnd = useCallback((_: any, info: any) => {
    const threshold = 50;
    // Invert swipe logic for RTL to keep direction intuitive
    const dragOffset = isRTL ? -info.offset.x : info.offset.x;
    
    if (dragOffset < -threshold && currentIndex < metrics.maxIndexValue) {
      handleNext();
    } else if (dragOffset > threshold && currentIndex > 0) {
      handlePrev();
    }
  }, [isRTL, currentIndex, metrics.maxIndexValue, handleNext, handlePrev]);

  // Calculate the actual transform-x value (Logic: RTL is positive, LTR is negative)
  const getTranslateX = useCallback(() => {
    const offset = currentIndex * (metrics.cardWidth + metrics.gap);
    return isRTL ? offset : -offset;
  }, [currentIndex, metrics.cardWidth, metrics.gap, isRTL]);

  return {
    currentIndex,
    metrics,
    containerRef,
    handleNext,
    handlePrev,
    handleDragEnd,
    jumpToIndex,
    getTranslateX
  };
}
