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

  // Synchronization of active section based on current pathname
  useEffect(() => {
    // Only run scroll spy on the home page (e.g. "/", "/ar", "/en")
    const isHomePage =
      pathname === "/" ||
      pathname === "" ||
      pathname === "/ar" ||
      pathname === "/en";

    // 1. If it's a direct page link (like /news or /register), set it as active
    const matchingLink = navLinks.find(
      (link) =>
        !link.href.includes("#") &&
        (link.href === pathname || link.href === `/${pathname}`),
    );

    if (matchingLink) {
      setTimeout(() => setActiveSection(matchingLink.href), 0);
      return;
    }

    // 2. If we are on a subpage NOT in the main nav (e.g. /login), clear active state
    if (!isHomePage) {
      setTimeout(() => setActiveSection(""), 0);
      return;
    }

    // 3. Scroll spy logic for home page
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // If we are near the top, highlight home
      if (scrollY < 100) {
        setActiveSection("/#home");
        return;
      }

      const sections = Array.from(document.querySelectorAll("section[id]"));
      let currentActive = "";
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
    handleScroll(); // Initial check on mount/pathname change

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, navLinks]);

  // Track scroll for styling (header shrinking) globally
  useEffect(() => {
    const handleGlobalScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleGlobalScroll, { passive: true });
    handleGlobalScroll();
    return () => window.removeEventListener("scroll", handleGlobalScroll);
  }, []);

  return {
    t,
    isMenuOpen,
    activeSection,
    toggleMenu,
    closeMenu,
    isScrolled,
  };
}
