import React from "react";
import { Link } from "@/i18n/routing";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BreadcrumbsProps {
  items: {
    label: string;
    href?: string;
  }[];
  locale: string;
}

export function Breadcrumbs({ items, locale }: BreadcrumbsProps) {
  const isRtl = locale === "ar";
  const ChevronIcon = isRtl ? ChevronLeft : ChevronRight;

  return (
    <nav className="flex items-center gap-2 text-sm md:text-base text-brand-muted mb-6 md:mb-10">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-brand-primary transition-colors whitespace-nowrap"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-brand-primary font-medium whitespace-nowrap">
              {item.label}
            </span>
          )}
          {index < items.length - 1 && (
            <ChevronIcon className="size-4 shrink-0 opacity-50" />
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
