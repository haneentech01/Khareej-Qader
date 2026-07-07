"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ClipboardList,
  BookOpenText,
  ClipboardCheck,
  Users,
  User,
} from "lucide-react";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { SidebarItem } from "../../Layout/SidebarItem";
import LogoutButton from "../../Layout/LogoutButton";


export function MentorSidebar() {
  const t = useTranslations("MentorDashboard.sidebar");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const sidebarLinks = [
    { title: t("home"), icon: LayoutDashboard, href: "/mentor" },
    { title: t("track"), icon: BookOpenText, href: "/mentor/track" },
    { title: t("tasks"), icon: ClipboardList, href: "/mentor/tasks" },
    { title: t("submissions"), icon: ClipboardCheck, href: "/mentor/submissions" },
    { title: t("students"), icon: Users, href: "/mentor/students" },
    { title: t("profile"), icon: User, href: "/mentor/profile" },
  ];

  return (
    <ShadcnSidebar
      side={isRTL ? "right" : "left"}
      collapsible="icon"
      className="border-slate-100 bg-white"
    >
      {/* Logo */}
      <SidebarHeader className="p-6">
        <Link href="/mentor">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={170}
            height={100}
            className={cn(
              "object-contain transition-all duration-300",
              isCollapsed ? "w-8 h-8" : "w-[130px] h-auto"
            )}
          />
        </Link>
      </SidebarHeader>

      {/* Navigation + Logout */}
      <SidebarContent className="space-y-1">
        {sidebarLinks.map((link) => (
          <SidebarItem key={link.href} {...link} isRTL={isRTL} />
        ))}

        {/* زر تسجيل الخروج الموحّد — نفس الـ component المستخدم في student sidebar */}
        <div className="py-1">
          <LogoutButton
            role="mentor"
            inCollapsibleSidebar
            translationNamespace="MentorDashboard.sidebar"
          />
        </div>
      </SidebarContent>

      <SidebarRail />
    </ShadcnSidebar>
  );
}
