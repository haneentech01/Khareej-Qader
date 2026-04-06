"use client";

import { useAnimation, Variants } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface UseScrollAnimationOptions {
  once?: boolean;
  amount?: "some" | "all" | number;
  delay?: number;
}

export function useScrollAnimation({ 
  once = false, 
  amount = 0.2, 
  delay = 0 
}: UseScrollAnimationOptions = {}) {
  const ref = useRef<HTMLElement | HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!once) { // Optional: reverse animation if scrolling back up
      controls.start("hidden");
    }
  }, [isInView, controls, once]);

  const variants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 0.6,
        delay,
      },
    },
  };

  return { ref, controls, variants };
}
