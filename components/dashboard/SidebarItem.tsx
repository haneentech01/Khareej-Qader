"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useSidebar } from "../ui/sidebar";

interface SidebarItemProps {
  title: string;
  href: string;
  icon: LucideIcon;
  isRTL: boolean;
}

export function SidebarItem({ title, href, icon: Icon, isRTL }: SidebarItemProps) {
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
            ? "bg-brand-light text-brand-dark border-s-4 border-s-brand-primary font-bold"
            : "text-brand-muted hover:bg-brand-surface hover:text-brand-dark"
        )}
      >
        <div className="shrink-0">
          <Icon className={cn("size-5", isActive ? "text-brand-dark fill-brand-primary/30" : "text-inherit")} />
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
