import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = ["/dashboard", "/mentor", "/admin"];
// ─── المسارات المخصصة للمستخدمين المسجلين فقط (لا يدخلونها بعد الـ login) ──
const AUTH_ONLY_ROUTES = ["/login", "/register"];

// ─── أسماء الـ cookies اللي ممكن تحمل التوكن ─
const AUTH_COOKIE_NAMES = [
  "token",
  "access_token",
  "auth_token",
  "student_token",
  "mentor_token",
  "areisto-platform-session",
];

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

  // ─── استخراج الـ locale من الـ URL ──────
  // الـ URL يكون /ar/dashboard, /en/dashboard, etc.
  const localeMatch = pathname.match(/^\/(ar|en)(\/.*)?$/);
  const locale = localeMatch?.[1] || "ar";

  // ✅ جديد: لو الـ URL ما فيه locale → وجّه له مع إضافة locale
  if (!localeMatch) {
    const url = new URL(`/${locale}${pathname}`, request.url);
    // نسخ الـ query params الأصلية (مثل redirect=...)
    request.nextUrl.searchParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });
    return NextResponse.redirect(url);
  }

  // ─── 1) لو المسار محمي والـ user مش مسجل → وجّه لـ login ──
  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.includes(route),
  );

  if (isProtected && !hasAuth) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    // احفظ المسار الأصلي عشان نرجّع المستخدم له بعد الـ login
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ─── 2) لو المسار /login أو /register والـ user مسجل → وجّه لـ dashboard ──
  const isAuthOnly = AUTH_ONLY_ROUTES.some((route) => pathname.includes(route));

  if (isAuthOnly && hasAuth) {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
