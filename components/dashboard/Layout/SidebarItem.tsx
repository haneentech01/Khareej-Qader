"use client";

import Link from "next/link";
import { usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";



interface SidebarItemProps {
  title: string;
  href: string;
  icon: LucideIcon;
  isRTL?: boolean;
}

export function SidebarItem({ title, href, icon: Icon }: SidebarItemProps) {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const isActive = pathname === href;
  return (
    <div className="relative group py-1">
      <Link
        href={href}
        className={cn(
          "flex items-center gap-4 px-6 py-2 md:py-3 rounded-e-lg transition-all duration-300",
          isActive
            ? "bg-brand-light text-brand-primary border-s-4 border-s-brand-primary font-bold"
            : "text-brand-muted hover:bg-brand-surface hover:text-brand-primary"
        )}
      >
        <div className="shrink-0">
          <Icon className={cn("size-5", isActive ? "text-brand-primary fill-brand-primary/30" : "text-inherit")} />
        </div>

        {!isCollapsed && (
          <span
            className={cn(
              "font-medium whitespace-nowrap overflow-hidden",
              isActive ? "font-bold" : "font-medium"
            )}
          >
            {title}
          </span>
        )}
      </Link>
    </div>
  );
}
