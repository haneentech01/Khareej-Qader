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

  useEffect(() => {
    const isPageLink = navLinks.some(
      (link) => !link.href.startsWith("#") && link.href === pathname,
    );
    if (isPageLink) {
      setActiveSection(pathname);
    }
  }, [pathname, navLinks]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      {
        threshold: 0.4,
        rootMargin: "-20% 0px -20% 0px",
      },
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return {
    t,
    isMenuOpen,
    activeSection,
    toggleMenu,
    closeMenu,
  };
}
