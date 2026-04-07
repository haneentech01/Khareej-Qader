import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

interface NavLink {
  readonly key: string;
  readonly href: string;
}

export function useHeader(navLinks: readonly NavLink[]) {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("/");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  // Synchronize state during render for page links to avoid cascading renders in useEffect
  const isPageLink = navLinks.some(
    (link) => !link.href.startsWith("#") && link.href === pathname,
  );
  if (isPageLink && activeSection !== pathname) {
    setActiveSection(pathname);
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // If we are near the top, highlight home
      if (scrollY < 100) {
        setActiveSection("/");
        return;
      }

      const sections = Array.from(document.querySelectorAll("section[id]"));
      let currentActive = "";
      
      // For each section, check if a trigger point (e.g., 300px down from the top of the viewport)
      // falls inside the section vertically.
      const triggerPoint = window.innerHeight * 0.3; // 30% from the top
      
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= triggerPoint && rect.bottom > triggerPoint) {
           currentActive = `#${section.id}`;
           break;
        }
      }
      
      if (currentActive) {
        setActiveSection((prev) => prev !== currentActive ? currentActive : prev);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run it once on mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return {
    t,
    isMenuOpen,
    activeSection,
    toggleMenu,
    closeMenu,
  };
}
