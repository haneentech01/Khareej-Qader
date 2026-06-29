"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { clearRoleCookie } from "@/lib/auth/roleCookie";
import {
  LayoutDashboard,
  ClipboardList,
  BookOpenText,
  ClipboardCheck,
  Users,
  User,
  LogOut,
} from "lucide-react";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { SidebarItem } from "./Layout/SidebarItem";
import endpoints from "@/lib/api/endpoints";
import apiClient from "@/lib/api/client";


export function MentorSidebar() {
  const t = useTranslations("MentorDashboard.sidebar");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const router = useRouter();

  const sidebarLinks = [
    { title: t("home"), icon: LayoutDashboard, href: "/mentor" },
    { title: t("track"), icon: BookOpenText, href: "/mentor/track" },
    { title: t("tasks"), icon: ClipboardList, href: "/mentor/tasks" },
    { title: t("submissions"), icon: ClipboardCheck, href: "/mentor/submissions" },
    { title: t("students"), icon: Users, href: "/mentor/students" },
    { title: t("profile"), icon: User, href: "/mentor/profile" },
  ];

  /**
   * تسجيل الخروج:
   *  1. نطلب من الـ backend يسجّل خروج (يمسح الـ token cookie)
   *  2. نمسح الـ role cookie محلياً
   *  3. نوجّه المستخدم لصفحة الـ login
   *
   * لو الـ backend request فشل، نمسح الـ role cookie ونوجّه للـ login برضو
   * (عشان ما نلصقش المستخدم في الصفحة).
   */
  const handleLogout = async () => {
    try {
      await apiClient.post(endpoints.auth.mentor.logout);
    } catch (err) {
      // لو الـ request فشل (مثلاً الـ token منتهي)، نكمّل برضو
      console.warn("[logout] Backend logout failed, clearing local state anyway:", err);
    } finally {
      clearRoleCookie();
      router.push("/login?role=mentor");
    }
  };

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

        <div className="py-1">
          <button
            onClick={handleLogout}
            className={cn(
              "flex items-center gap-3 w-full px-6 py-3 rounded-e-lg",
              "transition-all duration-300 text-red-500 hover:bg-red-50 cursor-pointer",
              isCollapsed && "justify-center"
            )}
          >
            <div className="shrink-0">
              <LogOut size={20} />
            </div>
            {!isCollapsed && (
              <span className="font-semibold text-sm">
                {t("logout")}
              </span>
            )}
          </button>
        </div>
      </SidebarContent>

      <SidebarRail />
    </ShadcnSidebar>
  );
}

