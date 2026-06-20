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

  // ─── 1) تحقق من BACKEND_URL ───────────────
  if (!BACKEND_URL) {
    console.error("[proxy] ❌ NEXT_PUBLIC_BACKEND_URL is not set");
    return NextResponse.json(
      {
        success: false,
        message: "Backend URL is not configured.",
        code: "BACKEND_URL_NOT_SET",
      },
      { status: 500 },
    );
  }

  // ─── 2) بناء headers ─────────────────────
  const headers: Record<string, string> = {
    "ngrok-skip-browser-warning": "true",
    Cookie: cookieHeader,
  };

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

  // ─── 3) تنفيذ الـ fetch ─────────────────
  let response: Response;
  try {
    response = await fetch(`${BACKEND_URL}/${endpoint}`, {
      method,
      headers,
      body,
    });
  } catch (fetchErr) {
    console.error("[proxy] ❌ fetch failed:", {
      url: `${BACKEND_URL}/${endpoint}`,
      error: fetchErr instanceof Error ? fetchErr.message : String(fetchErr),
    });
    return NextResponse.json(
      {
        success: false,
        message: "Cannot reach backend. It may be down or unreachable.",
        code: "BACKEND_UNREACHABLE",
        error: fetchErr instanceof Error ? fetchErr.message : String(fetchErr),
      },
      { status: 502 },
    );
  }

  // ─── 4) قراءة الـ response ─────────────
  const responseText = await response.text();

  // ─── 5) لو status 503 (backend down) ──
  if (response.status === 503) {
    console.error("[proxy] ❌ Backend returned 503:", {
      url: `${BACKEND_URL}/${endpoint}`,
      body: responseText.slice(0, 500),
    });
    return NextResponse.json(
      {
        success: false,
        message:
          "Backend service is unavailable (503). Please try again later.",
        code: "BACKEND_UNAVAILABLE",
      },
      { status: 503 },
    );
  }

  // ─── 6) لو الـ response مش JSON ─────────
  let data: unknown;
  try {
    data = JSON.parse(responseText);
  } catch {
    console.error("[proxy] ❌ Non-JSON response:", {
      status: response.status,
      body: responseText.slice(0, 500),
      contentType: response.headers.get("content-type"),
    });
    return NextResponse.json(
      {
        success: false,
        message: "Backend returned non-JSON response.",
        code: "INVALID_BACKEND_RESPONSE",
        rawBody: responseText.slice(0, 200),
        status: response.status,
      },
      { status: 502 },
    );
  }

  // ─── 7) بناء الـ response النهائي ──────
  const res = NextResponse.json(data, { status: response.status });

  // ─── 8) Forward Set-Cookie headers ─────
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

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> },
) {
  return proxyRequest(req, ctx.params, "GET");
}

export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> },
) {
  return proxyRequest(req, ctx.params, "POST");
}

export async function PUT(
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> },
) {
  return proxyRequest(req, ctx.params, "PUT");
}

export async function PATCH(
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> },
) {
  return proxyRequest(req, ctx.params, "PATCH");
}

export async function DELETE(
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> },
) {
  return proxyRequest(req, ctx.params, "DELETE");
}
