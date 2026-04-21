"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Layers,
  ClipboardList,
  Users,
  Award,
  Settings,
  LogOut,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const t = useTranslations("Dashboard.sidebar");

  const sidebarLinks = [
    {
      title: t("home"),
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      title: t("track"),
      icon: Layers,
      href: "/dashboard/my-track",
    },
    {
      title: t("tasks"),
      icon: ClipboardList,
      href: "/dashboard/tasks",
    },
    {
      title: t("mentor"),
      icon: Users,
      href: "/dashboard/mentor",
    },
    {
      title: t("certificates"),
      icon: Award,
      href: "/dashboard/certificates",
    },
    {
      title: t("settings"),
      icon: Settings,
      href: "/dashboard/settings",
    },
  ];

  return (
    <aside className="fixed inset-y-0 right-0 z-50 w-64 bg-white border-l border-gray-100 flex flex-col transition-all duration-300">
      {/* Logo Section */}
      <div className="p-6 flex justify-center items-center">
        <Link href="/dashboard">
          <Image
            src="/images/logo.png"
            alt="Areisto Academy Logo"
            width={120}
            height={40}
            className="h-auto w-auto"
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-4 space-y-2 mt-8">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive
                  ? "bg-brand-surface text-brand-base font-semibold"
                  : "text-gray-500 hover:bg-gray-50 hover:text-brand-base"
              )}
            >
              <Icon
                className={cn(
                  "size-5 transition-colors",
                  isActive ? "text-brand-base" : "text-gray-400 group-hover:text-brand-base"
                )}
              />
              <span className="text-sm font-medium">{link.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Link */}
      <div className="p-4 border-t border-gray-50">
        <button
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 transition-all duration-200 group"
          onClick={() => console.log("Logout triggered")}
        >
          <LogOut className="size-5 group-hover:translate-x-1 transition-transform" />
          <span className="text-sm font-medium">{t("logout")}</span>
        </button>
      </div>
    </aside>
  );
}
