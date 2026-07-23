"use client";

import { ShieldCheck, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarBadge } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAdminAuth } from "@/hooks/admin/useAdminAuth";

/**
 * AdminTopNav — شريط علوي للوحة الأدمن.
 *
 * يعرض اسم الأدمن ورقم صلاحياته من useAdminAuth (localStorage).
 */
export function AdminTopNav() {
  const t = useTranslations("Admin.topNav");
  const { admin, permissions } = useAdminAuth();

  const displayName = admin?.name ?? t("profile");
  const displayEmail = admin?.email ?? "";
  const permissionsCount = permissions.length;

  return (
    <header
      className="sticky top-0 z-40 bg-white backdrop-blur-md
      border-b border-gray-100
      px-4 md:px-8 h-20 flex justify-between items-center gap-4"
    >
      {/* Trigger for mobile sidebar */}
      <div className="flex items-center gap-3 lg:hidden">
        <SidebarTrigger className="text-brand-muted hover:text-brand-primary transition-colors" />
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <Search
          className="absolute top-1/2 -translate-y-1/2 end-3 text-brand-muted size-4"
        />
        <Input
          placeholder={t("notifications")}
          className="pe-10 ps-4 bg-[#F4F7F5] border border-[#F1F5F9]
            focus-visible:ring-1 focus:ring-0 focus-visible:ring-brand-base
            rounded-lg h-10 text-brand-muted"
        />
      </div>

      {/* Profile & Permissions Badge */}
      <div className="flex items-center gap-7">
        <div className="flex items-center gap-3">
          <div className="text-end hidden md:block">
            <p className="text-sm font-semibold text-black leading-tight">
              {t("welcome", { name: displayName })}
            </p>
            <p className="text-xs text-brand-muted">
              {displayEmail} · {permissionsCount} {t("profile")}
            </p>
          </div>
          <Avatar className="size-10 border border-brand-surface bg-brand-primary/10">
            <AvatarFallback className="bg-brand-primary/10 text-brand-primary font-bold">
              <ShieldCheck className="size-5" />
            </AvatarFallback>
            <AvatarBadge className="bg-green-600 dark:bg-green-800" />
          </Avatar>
        </div>
      </div>
    </header>
  );
}
