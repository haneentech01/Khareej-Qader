"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const programSection = document.getElementById("program");
      if (programSection) {
        // Show button if the top of the program section is at or above the middle of viewport
        const rect = programSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } else {
        // Fallback threshold
        if (window.scrollY > 400) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 inset-s-6 md:bottom-10 md:inset-s-10 z-50 
        flex h-12 w-12 md:h-14 md:w-14 items-center justify-center 
        rounded-full bg-brand-primary text-white shadow-xl 
        hover:bg-brand-primary/90 transition-all duration-300 
        ${isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-6 w-6 md:h-7 md:w-7" />
    </button>
  );
}
