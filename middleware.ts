import { NextRequest, NextResponse } from "next/server";
import {
  getRoleFromRequestCookies,
  ROLE_COOKIE_NAME,
} from "@/lib/auth/roleCookie";
import { Role } from "./types";

const PROTECTED_ROUTES = ["/dashboard", "/mentor", "/admin"];
const AUTH_ONLY_ROUTES = ["/login", "/register", "/register-mentor"];

const AUTH_COOKIE_NAMES = [
  "token",
  "access_token",
  "auth_token",
  "student_token",
  "mentor_token",
  "areisto-platform-session",
];

/**
 * يحدد الـ role المطلوب للوصول لمسار معين.
 * - /dashboard/*      → "student"
 * - /mentor/*         → "mentor"
 * - /admin/*          → "admin"
 * - أي مسار تاني      → null (مش محمي بـ role)
 *
 * نرجّع أول match فقط عشان نتجنب التداخل (مثلاً /mentor/dashboard).
 */
function getRequiredRoleForPath(pathname: string): Role | null {
  // نستخدم startsWith عشان نطابق كل المسارات الفرعية
  // ترتيب الفحص مهم: نبدأ بـ /mentor قبل /dashboard لو في تداخل
  // (في هذا المشروع ما فيش تداخل فعلي، بس نحافظ على الترتيب للأمان)

  // نفصل الـ locale من المسار: /ar/mentor → /mentor
  const withoutLocale = pathname.replace(/^\/(ar|en)/, "");

  if (withoutLocale.startsWith("/mentor")) return "mentor";
  if (withoutLocale.startsWith("/dashboard")) return "student";
  if (withoutLocale.startsWith("/admin")) return "admin";
  return null;
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // تخطي الـ static files والـ api
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // ─── فحص الـ auth cookie ────────────────
  const hasAuth = AUTH_COOKIE_NAMES.some(
    (name) => request.cookies.get(name)?.value,
  );

  // ─── فحص الـ role cookie ────────────────
  // هذا الـ cookie يخزّن نوع المستخدم (student / mentor / admin)
  // لو مش موجود → المستخدم مش مسجّل دخول (أو سجّل قبل ما نضيف هذه الميزة)
  const userRole = getRoleFromRequestCookies(request.cookies);

  // ─── استخراج الـ locale من الـ URL ──────
  const localeMatch = pathname.match(/^\/(ar|en)(\/.*)?$/);
  const locale = localeMatch?.[1] || "ar";

  // ✅ لو الـ URL ما فيه locale → وجّه له مع إضافة locale
  if (!localeMatch) {
    const url = new URL(`/${locale}${pathname}`, request.url);
    request.nextUrl.searchParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });
    return NextResponse.redirect(url);
  }

  // ─── 1) لو المسار محمي والـ user مش مسجل → وجّه لـ login ──
  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.includes(route) && !pathname.includes("/admin/login")
  );

  if (isProtected && !hasAuth) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    // احفظ المسار الأصلي عشان نرجّع المستخدم له بعد الـ login
    loginUrl.searchParams.set("redirect", pathname);
    // لو المسار محمي بـ role معين، نضيف role= للـ login
    const requiredRole = getRequiredRoleForPath(pathname);
    if (requiredRole) {
      loginUrl.searchParams.set("role", requiredRole);
    }
    return NextResponse.redirect(loginUrl);
  }

  // ─── 2) فحص الـ role: لو المستخدم مسجّل لكن بدور غلط ──
  // مثلاً: طالب يحاول يوصل /mentor → وجّهه للـ dashboard بتاعه
  // مثلاً: منتور يحاول يوصل /dashboard → وجّهه للـ mentor dashboard بتاعه
  if (isProtected && hasAuth && userRole) {
    const requiredRole = getRequiredRoleForPath(pathname);

    if (requiredRole && userRole !== requiredRole) {
      // وجّه المستخدم للـ dashboard المناسب لدوره
      const correctDashboard =
        userRole === "mentor"
          ? `/${locale}/mentor`
          : userRole === "admin"
            ? `/${locale}/admin`
            : `/${locale}/dashboard`;

      console.warn(
        `[middleware] ⚠️ Role mismatch: user is "${userRole}" but path "${pathname}" requires "${requiredRole}". Redirecting to ${correctDashboard}`,
      );

      return NextResponse.redirect(new URL(correctDashboard, request.url));
    }
  }

  // ─── 3) لو المسار /login أو /register والـ user مسجل → وجّه لـ dashboard ──
  const isAuthOnly = AUTH_ONLY_ROUTES.some((route) => pathname.includes(route));

  if (isAuthOnly && hasAuth && userRole) {
    // وجّه للـ dashboard المناسب حسب الـ role (مش دائماً /dashboard)
    const correctDashboard =
      userRole === "mentor"
        ? `/${locale}/mentor`
        : userRole === "admin"
          ? `/${locale}/admin`
          : `/${locale}/dashboard`;
    return NextResponse.redirect(new URL(correctDashboard, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};

// نصدّر اسم الـ cookie عشان الـ modules التانية تستخدمه (لو محتاجة)
export { ROLE_COOKIE_NAME };
