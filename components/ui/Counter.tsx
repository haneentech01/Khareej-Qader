"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, useInView } from "framer-motion";

/**
 * A scroll-triggered counter component that animates from 0 to a target number.
 * Automatically parses suffixes like "+" or "%".
 */
export function Counter({ targetValue }: { targetValue: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Extract the numeric part (e.g., "500" from "500+") and the suffix
  const numericPart = parseInt(targetValue.replace(/[^0-9]/g, "")) || 0;
  const suffix = targetValue.replace(/[0-9]/g, "");

  const motionValue = useMotionValue(0);

  // Spring adds a nice natural feel to the counting
  const springValue = useSpring(motionValue, {
    damping: 20,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(numericPart);
    }
  }, [isInView, motionValue, numericPart]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        // Round to nearest integer and append suffix
        ref.current.textContent = Math.floor(latest).toString() + suffix;
      }
    });
    return () => unsubscribe();
  }, [springValue, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  );
}
