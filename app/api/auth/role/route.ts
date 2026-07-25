import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ROLE_COOKIE_NAME } from "@/lib/auth/roleCookie";
import type { Role } from "@/types";

const AUTH_COOKIE_NAMES = [
  "token",
  "access_token",
  "auth_token",
  "student_token",
  "mentor_token",
  "admin_token",
  "areisto-platform-session",
] as const;

const VALID_ROLES: ReadonlyArray<Role> = ["student", "mentor", "admin"];
const ROLE_COOKIE_MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 أيام

function hasAuthCookie(
  cookieStore: Awaited<ReturnType<typeof cookies>>,
): boolean {
  return AUTH_COOKIE_NAMES.some((name) => cookieStore.get(name)?.value);
}

function detectRoleFromAuthCookie(
  cookieStore: Awaited<ReturnType<typeof cookies>>,
): Role | null {
  if (cookieStore.get("admin_token")?.value) return "admin";
  if (cookieStore.get("mentor_token")?.value) return "mentor";
  if (cookieStore.get("student_token")?.value) return "student";
  return null;
}

export async function POST(request: NextRequest) {
  try {
    // ─── 1) قراءة الـ body ─────────────────────────────────────
    const body = await request.json().catch(() => null);
    const { role } = (body ?? {}) as { role?: unknown };

    // ─── 2) التحقق من صحة الـ role ────────────────────────────
    if (
      !role ||
      typeof role !== "string" ||
      !VALID_ROLES.includes(role as Role)
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid role" },
        { status: 400 },
      );
    }

    // ─── 3) التحقق من وجود session cookie ───────────────────
    const cookieStore = await cookies();

    if (!hasAuthCookie(cookieStore)) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 },
      );
    }

    // ─── 4) التحقق من تطابق الـ role مع الـ auth cookie ──────
    const detectedRole = detectRoleFromAuthCookie(cookieStore);
    if (detectedRole && detectedRole !== role) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Role mismatch — cannot set role that doesn't match your session",
        },
        { status: 403 },
      );
    }

    // ─── 5) ضبط الـ role cookie (httpOnly — آمن) ────────────────
    cookieStore.set({
      name: ROLE_COOKIE_NAME,
      value: role,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ROLE_COOKIE_MAX_AGE_SECONDS,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[api/auth/role] Error setting role cookie:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(ROLE_COOKIE_NAME);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[api/auth/role] Error clearing role cookie:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
