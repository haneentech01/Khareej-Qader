"use client";

import { useState, useCallback } from "react";
import type { AdminProfile, AdminPermission } from "@/types";

const STORAGE_KEY = "khareej_admin_auth";

interface StoredAdminAuth {
  admin: AdminProfile;
  permissions: AdminPermission[];
  stored_at: number;
}

function readFromStorage(): StoredAdminAuth | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredAdminAuth;
    if (!parsed.admin || !Array.isArray(parsed.permissions)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeToStorage(data: StoredAdminAuth | null) {
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
  hasPermission: (permission: AdminPermission) => boolean;
  hasAnyPermission: (permissions: AdminPermission[]) => boolean;
  hasAllPermissions: (permissions: AdminPermission[]) => boolean;
  setAdminAuth: (admin: AdminProfile, permissions: AdminPermission[]) => void;
  clearAdminAuth: () => void;
}

export function useAdminAuth(): UseAdminAuthResult {
  // قراءة البيانات مباشرة في الـ Initial State لتجنب استخدام useEffect بشكل خاطئ
  const [stored, setStored] = useState<StoredAdminAuth | null>(() =>
    readFromStorage(),
  );

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

  const hasPermission = useCallback(
    (permission: AdminPermission) =>
      Boolean(stored?.permissions?.includes(permission)),
    [stored],
  );

  const hasAnyPermission = useCallback(
    (permissions: AdminPermission[]) =>
      permissions.some((p) => stored?.permissions?.includes(p)),
    [stored],
  );

  const hasAllPermissions = useCallback(
    (permissions: AdminPermission[]) =>
      permissions.every((p) => stored?.permissions?.includes(p)),
    [stored],
  );

  return {
    admin: stored?.admin ?? null,
    permissions: stored?.permissions ?? [],
    isAuthenticated: Boolean(stored),
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    setAdminAuth,
    clearAdminAuth,
  };
}
