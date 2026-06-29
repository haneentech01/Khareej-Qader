/**
 * إدارة role cookie — يخزّن نوع المستخدم المسجّل دخوله (student / mentor / admin).
 *
 * ليه محتاجين هذا؟
 * الـ middleware يقدر يقرأ هذا الـ cookie و يقرر هل المستخدم يقدر يوصل لـ
 * /mentor/* أو /dashboard/* بناءً على دوره. الـ backend token cookie عادةً
 * يكون httpOnly ومش نقدر نقرأه من الـ middleware بسهولة، فعشان كده بنخزّن
 * الـ role في cookie منفصل (مش httpOnly) عشان الـ middleware يقرأه.
 *
 * الـ cookie اسمه: khareej_user_role
 * قيمه: "student" | "mentor" | "admin"
 * مدة الصلاحية: 7 أيام (نفس مدة الـ session تقريباً)
 */

export const ROLE_COOKIE_NAME = "khareej_user_role";

/** نوع المستخدم المخزّن في الـ cookie */
export type UserRole = "student" | "mentor" | "admin";

const ROLE_COOKIE_MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 أيام

/**
 * يخزّن الـ role في cookie من الـ client side.
 * يُستدعى بعد نجاح الـ login مباشرة.
 *
 * @example
 * setRoleCookie("mentor"); // بعد نجاح login المنتور
 */
export function setRoleCookie(role: UserRole): void {
  if (typeof document === "undefined") return;

  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${ROLE_COOKIE_NAME}=${role}; path=/; max-age=${ROLE_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
}

/**
 * يقرأ الـ role من الـ cookie (client side).
 * يُستخدم في الـ components عشان نعرف دور المستخدم الحالي.
 *
 * @returns الـ role أو null لو مش مسجّل
 */
export function getRoleCookie(): UserRole | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${ROLE_COOKIE_NAME}=`));

  if (!match) return null;

  const value = match.split("=")[1] as UserRole;
  if (value === "student" || value === "mentor" || value === "admin") {
    return value;
  }
  return null;
}

/**
 * يمسح الـ role cookie — يُستدعى عند الـ logout.
 */
export function clearRoleCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${ROLE_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
}

/**
 * يقرأ قيمة cookie واحدة من NextRequest (يُستخدم في الـ middleware).
 * الـ NextRequest بتوفر API مختلف عن document.cookie.
 */
export function getRoleFromRequestCookies(cookies: {
  get: (name: string) => { value?: string } | undefined;
}): UserRole | null {
  const cookie = cookies.get(ROLE_COOKIE_NAME);
  const value = cookie?.value as UserRole | undefined;

  if (value === "student" || value === "mentor" || value === "admin") {
    return value;
  }
  return null;
}
