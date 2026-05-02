"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
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
          "flex items-center gap-4 px-6 py-3 rounded-e-lg transition-all duration-300",
          isActive
            ? "bg-[#D1FAE580] text-brand-primary border-s-4 border-s-brand-primary"
            : "text-brand-muted hover:bg-brand-surface hover:text-brand-primary"
        )}
      >
        <div className="shrink-0">
          <Icon className={cn("size-5", isActive ? "text-brand-primary fill-brand-primary/50" : "text-inherit")} />
        </div>

        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRTL ? 10 : -10 }}
              className={cn(
                "font-medium whitespace-nowrap overflow-hidden",
                isActive ? "font-bold" : "font-medium"
              )}
            >
              {title}
            </motion.span>
          )}
        </AnimatePresence>
      </Link>
    </div>
  );
}
