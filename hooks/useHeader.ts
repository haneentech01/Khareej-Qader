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
  const [activeSection, setActiveSection] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  // Synchronize state during render for page links to avoid cascading renders in useEffect
  const isPageLink = navLinks.some(
    (link) => !link.href.includes("#") && link.href === pathname,
  );
  if (isPageLink && activeSection !== pathname) {
    setActiveSection(pathname);
  }

  // Clear active state on non-home pages if not a direct page link
  const isHomePage = /^\/(ar|en)?\/?$/.test(pathname) || pathname === "/";
  if (!isHomePage && !isPageLink && activeSection !== "") {
    setActiveSection("");
  }

  // Track scroll for styling (header shrinking) globally
  useEffect(() => {
    const handleGlobalScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleGlobalScroll, { passive: true });
    handleGlobalScroll();
    return () => window.removeEventListener("scroll", handleGlobalScroll);
  }, []);

  // Track active section for scroll spy on home page only
  useEffect(() => {
    // Only run scroll spy on the home page (e.g. "/ar", "/en", "/")
    const isHomePage = /^\/(ar|en)?\/?$/.test(pathname) || pathname === "/";

    if (!isHomePage) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // If we are near the top, highlight home
      if (scrollY < 100) {
        setActiveSection("/#home");
        return;
      }

      const sections = Array.from(document.querySelectorAll("section[id]"));
      let currentActive = "";

      // For each section, check if a trigger point (30% from the top of the viewport)
      // falls inside the section vertically.
      const triggerPoint = window.innerHeight * 0.3;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= triggerPoint && rect.bottom > triggerPoint) {
          currentActive = `/#${section.id}`;
          break;
        }
      }

      if (currentActive) {
        setActiveSection((prev) =>
          prev !== currentActive ? currentActive : prev,
        );
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
    isScrolled,
  };
}
