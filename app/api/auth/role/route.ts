import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ROLE_COOKIE_NAME } from "@/lib/auth/roleCookie";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { role } = body;

    if (!role || !["student", "mentor", "admin"].includes(role)) {
      return NextResponse.json({ success: false, message: "Invalid role" }, { status: 400 });
    }

    const cookieStore = await cookies();
    cookieStore.set({
      name: ROLE_COOKIE_NAME,
      value: role,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[api/auth/role] Error setting role cookie:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
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
      { status: 500 }
    );
  }
}
