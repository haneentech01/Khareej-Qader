"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { LayoutDashboard, GraduationCap, Users, BookOpen, Presentation } from "lucide-react";
import { Sidebar as ShadcnSidebar, SidebarContent, SidebarHeader, SidebarRail, SidebarGroup, useSidebar } from "@/components/ui/sidebar";
import { SidebarItem } from "../../Layout/SidebarItem";
import LogoutButton from "../../Layout/LogoutButton";
import { useAdminAuth } from "@/hooks/admin/useAdminAuth";
import type { AdminPermission } from "@/types";

interface NavItem {
  title: string;
  icon: typeof LayoutDashboard;
  href: string;
  permission?: AdminPermission;
}

export function AdminSidebar() {
  const t = useTranslations("Admin.sidebar");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";


  const { hasPermission, isAuthenticated } = useAdminAuth();

  const navLinks: NavItem[] = [
    { title: t("dashboard"), icon: LayoutDashboard, href: "/admin" },
    {
      title: t("students"),
      icon: GraduationCap,
      href: "/admin/students",
      permission: "show-students",
    },
    {
      title: t("mentors"),
      icon: Users,
      href: "/admin/mentors",
      permission: "show-mentors",
    },
    {
      title: t("courses"),
      icon: BookOpen,
      href: "/admin/courses",
      permission: "show-courses",
    },
    {
      title: isRTL ? "إدارة الصفحة الرئيسية" : "Landing Page CMS",
      icon: Presentation,
      href: "/admin/landing",
    },
  ];

  const visibleLinks = !isAuthenticated
    ? navLinks
    : navLinks.filter(
      (link) => !link.permission || hasPermission(link.permission),
    );

  return (
    <ShadcnSidebar
      side={isRTL ? "right" : "left"}
      collapsible="icon"
      className="border-slate-100 bg-white"
    >
      {/* Logo */}
      <SidebarHeader className="p-6">
        <Link href="/admin" aria-label="admin home">
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={170}
              height={100}
              className={cn(
                "object-contain transition-all duration-300",
                isCollapsed ? "w-8 h-8" : "w-32.5 h-auto",
              )}
            />
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="space-y-2">
        <SidebarGroup>
          <nav aria-label="admin navigation">
            {visibleLinks.map((link) => (
              <SidebarItem
                key={link.href}
                title={link.title}
                icon={link.icon}
                href={link.href}
                isRTL={isRTL}
              />
            ))}
          </nav>
        </SidebarGroup>

        {/* Logout */}
        <div>
          <LogoutButton
            role="admin"
            redirectPath="/admin/login"
            inCollapsibleSidebar
            translationNamespace="Admin.sidebar"
          />
        </div>
      </SidebarContent>

      <SidebarRail />
    </ShadcnSidebar>
  );
}

export default AdminSidebar;