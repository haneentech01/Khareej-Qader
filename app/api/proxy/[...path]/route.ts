import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

async function proxyRequest(
  request: NextRequest,
  params: Promise<{ path: string[] }>,
  method: string,
) {
  const { path } = await params;
  const endpoint = path.join("/");
  const cookieHeader = request.headers.get("cookie") || "";
  const contentType = request.headers.get("content-type") || "";

  // Build headers
  const headers: Record<string, string> = {
    "ngrok-skip-browser-warning": "true",
    Cookie: cookieHeader,
  };

  // Build body
  let body: BodyInit | undefined;

  if (method !== "GET" && method !== "DELETE") {
    if (contentType.includes("multipart/form-data")) {
      body = await request.formData();
    } else {
      headers["Content-Type"] = "application/json";
      try {
        body = JSON.stringify(await request.json());
      } catch {
        body = "{}";
      }
    }
  }

  const response = await fetch(`${BACKEND_URL}/${endpoint}`, {
    method,
    headers,
    body,
  });

  const data = await response.json();
  const res = NextResponse.json(data, { status: response.status });

  // Forward Set-Cookie headers from backend
  for (const setCookie of response.headers.getSetCookie()) {
    const match = setCookie.match(/^([^=]+)=([^;]*)/);
    if (match) {
      res.cookies.set(match[1], match[2], {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
    }
  }

  return res;
}

export const GET = (
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> },
) => proxyRequest(req, ctx.params, "GET");

export const POST = (
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> },
) => proxyRequest(req, ctx.params, "POST");

export const PUT = (
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> },
) => proxyRequest(req, ctx.params, "PUT");

export const PATCH = (
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> },
) => proxyRequest(req, ctx.params, "PATCH");

export const DELETE = (
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> },
) => proxyRequest(req, ctx.params, "DELETE");
