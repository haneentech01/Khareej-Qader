"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import type { AdminProfile, AdminPermission } from "@/types";

const STORAGE_KEY = "khareej_admin_auth";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 أيام

interface StoredAdminAuth {
  admin: AdminProfile;
  permissions: AdminPermission[];
  stored_at: number;
}

// ─── Storage helpers (pure functions) ─────────────
function readFromStorage(): StoredAdminAuth | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as StoredAdminAuth;

    if (
      !parsed ||
      typeof parsed !== "object" ||
      !parsed.admin ||
      typeof parsed.admin.name !== "string" ||
      typeof parsed.admin.email !== "string" ||
      !Array.isArray(parsed.permissions) ||
      typeof parsed.stored_at !== "number"
    ) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    const age = Date.now() - parsed.stored_at;
    if (age > SESSION_TTL_MS) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function writeToStorage(data: StoredAdminAuth | null): void {
  if (typeof window === "undefined") return;

  try {
    if (data) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  } catch {}
}

export interface UseAdminAuthResult {
  admin: AdminProfile | null;
  permissions: AdminPermission[];
  isAuthenticated: boolean;
  isHydrated: boolean;
  hasPermission: (permission: AdminPermission) => boolean;
  hasAnyPermission: (permissions: AdminPermission[]) => boolean;
  hasAllPermissions: (permissions: AdminPermission[]) => boolean;
  setAdminAuth: (admin: AdminProfile, permissions: AdminPermission[]) => void;
  clearAdminAuth: () => void;
}

// ─── Hook ──────────────────────────────────────────────────────────
export function useAdminAuth(): UseAdminAuthResult {
  // ابدأ بـ null على الـ server والـ first client render
  const [stored, setStored] = useState<StoredAdminAuth | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // ─── قراءة من localStorage بعد mount (client only) ─────────────
  useEffect(() => {
    const data = readFromStorage();
    setStored(data);
    setIsHydrated(true);

    // مزامنة عبر tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setStored(readFromStorage());
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ─── Actions ───────────────────────────────────────────────────
  const setAdminAuth = useCallback(
    (admin: AdminProfile, permissions: AdminPermission[]) => {
      const data: StoredAdminAuth = {
        admin,
        permissions,
        stored_at: Date.now(),
      };
      writeToStorage(data);
      setStored(data);
    },
    [],
  );

  const clearAdminAuth = useCallback(() => {
    writeToStorage(null);
    setStored(null);
  }, []);

  // ─── Permission helpers (memoized) ─────────────────────────────
  const permissionsArr = stored?.permissions ?? [];

  const hasPermission = useCallback(
    (permission: AdminPermission) => permissionsArr.includes(permission),
    [permissionsArr],
  );

  const hasAnyPermission = useCallback(
    (permissions: AdminPermission[]) =>
      permissions.some((p) => permissionsArr.includes(p)),
    [permissionsArr],
  );

  const hasAllPermissions = useCallback(
    (permissions: AdminPermission[]) =>
      permissions.every((p) => permissionsArr.includes(p)),
    [permissionsArr],
  );

  // ─── Result (memoized) ──────────
  return useMemo(
    () => ({
      admin: stored?.admin ?? null,
      permissions: permissionsArr,
      isAuthenticated: isHydrated && Boolean(stored),
      isHydrated,
      hasPermission,
      hasAnyPermission,
      hasAllPermissions,
      setAdminAuth,
      clearAdminAuth,
    }),
    [
      stored,
      permissionsArr,
      isHydrated,
      hasPermission,
      hasAnyPermission,
      hasAllPermissions,
      setAdminAuth,
      clearAdminAuth,
    ],
  );
}
