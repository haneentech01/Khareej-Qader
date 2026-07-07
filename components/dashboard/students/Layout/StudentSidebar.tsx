"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { LayoutDashboard, ClipboardList, BookOpenText, User } from "lucide-react";
import { Sidebar as ShadcnSidebar, SidebarContent, SidebarHeader, SidebarRail, useSidebar } from "@/components/ui/sidebar";
import { SidebarItem } from "../../Layout/SidebarItem";
import LogoutButton from "../../Layout/LogoutButton";


export function StudentSidebar() {
  const t = useTranslations("MentorDashboard.sidebar");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const sidebarLinks = [
    { title: t("home"), icon: LayoutDashboard, href: "/dashboard" },
    { title: t("track"), icon: BookOpenText, href: "/dashboard/my-track" },
    { title: t("tasks"), icon: ClipboardList, href: "/dashboard/tasks" },
    { title: t("profile"), icon: User, href: "/dashboard/profile" },
  ];

  return (
    <ShadcnSidebar
      side={isRTL ? "right" : "left"}
      collapsible="icon"
      className="border-slate-100 bg-white"
    >
      {/* ── Logo ── */}
      <SidebarHeader className="py-7 px-6">
        <Link href="/dashboard">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={170}
            height={100}
            priority
            sizes="130px"
            className={cn(
              "object-contain transition-all duration-300",
              isCollapsed ? "w-8 h-8" : "w-[130px] h-auto"
            )}
          />
        </Link>
      </SidebarHeader>

      {/* ── Navigation + Logout ── */}
      <SidebarContent className="space-y-1">
        {sidebarLinks.map((link) => (
          <SidebarItem key={link.href} {...link} isRTL={isRTL} />
        ))}

        <div className="py-1">
          <LogoutButton
            role="student"
            inCollapsibleSidebar
            translationNamespace="Dashboard.sidebar"
          />
        </div>
      </SidebarContent>

      <SidebarRail />
    </ShadcnSidebar>
  );
}
